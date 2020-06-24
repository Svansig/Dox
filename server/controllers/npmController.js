const fetch = require('node-fetch');
const Search = require('../models/search');
const Pages = require('../models/package');

const npmController = {};

npmController.search = async (req, res, next) => {
  const baseURL = 'https://api.npms.io/v2/search';
  // console.log(req.query);
  if (!req.query.search) {
    return next({ code: 400, message: 'A valid query is required to search.' });
  }
  const query = req.query.search;
  Search.find({ query }, async (err, results) => {
    if (err) return next(err);
    if (!results.length) {
      const searchString = query.replace(' ', '+');
      const searchURL = `${baseURL}?q=${searchString}`;
      try {
        const response = await fetch(searchURL);
        const data = await response.json();
        // console.log(data);
        const savedQuery = {
          query,
          responses: data.results.map((package) => ({
            name: package.package.name,
            description: package.package.description,
          })),
        };

        Search.create(savedQuery, (err, query) => {
          if (err) return next(err);
          res.locals.data = query;
          return next();
        });
      } catch (err) {
        return next({ code: 400, message: err });
      }
    } else {
      console.log('cached');
      res.locals.data = results[0];
      return next();
    }
  });
};

npmController.details = async (req, res, next) => {
  const baseURL = 'https://api.npms.io/v2/package/';
  // console.log(req.params.package);
  if (!req.params.package) {
    return next({ code: 400, message: 'A valid query is required to search.' });
  }
  const packageName = req.params.package;
  Pages.find({ project: req.params.package }, async (err, results) => {
    if (err) return next(err);
    // console.log('pages found:', results.length);
    if (!results.length) {
      const packageURL = `${baseURL}${packageName}`;
      try {
        const response = await fetch(packageURL);
        const data = await response.json();
        console.log(data);
        const { bugs, homepage, npm, repository } = data.collected.metadata.links;
        Pages.create(
          {
            project: data.collected.metadata.name,
            description: data.collected.metadata.description,
            links: { bugs, homepage, npm, repository },
            pages: {},
          },
          (err, result) => {
            if (err) return next(err);

            res.locals.data = result;
            next();
          }
        );
      } catch (err) {
        return next({ code: 400, message: err });
      }
    } else {
      res.locals.data = results[0];
      next();
    }
  });
};

module.exports = npmController;
