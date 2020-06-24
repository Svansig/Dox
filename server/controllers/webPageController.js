const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Pages = require('../models/package');

const webPageController = {};

const parseGithub = (html) => {
  const $ = cheerio.load(html);
  return $('article.markdown-body').html();
};

const parseNPM = (html) => {
  const $ = cheerio.load(html);
  return $('article>.markdown').html();
};

const parseBugs = (html) => {
  const $ = cheerio.load(html);
  return $('div.js-active-navigation-container').html();
};

webPageController.get = async (req, res, next) => {
  console.log(req.body);
  Pages.find({ project: req.body.name }, async (err, results) => {
    if (err) return next(err);
    // console.log(results);
    const result = results[0];
    // console.log(results.length);
    if (result.pages && result.pages[req.body.site]) {
      res.locals.webpage = result.pages[req.body.site];
      return next();
    }
    if (!result.pages || !result.pages[req.body.site]) {
      // console.log('inside if', result.length);
      let response = await fetch(req.body.url);
      response = await response.text();
      if (req.body.site === 'repository') {
        res.locals.webpage = parseGithub(response);
      } else if (req.body.site === 'npm') {
        res.locals.webpage = parseNPM(response);
      } else if (req.body.site === 'bugs') {
        res.locals.webpage = parseBugs(response);
      }
      if (!result.pages) {
        result.pages = {};
      }
      result.pages[req.body.site] = res.locals.webpage;
      Pages.findOneAndUpdate(
        { project: req.body.name },
        {
          pages: { ...result[0].pages, [req.body.site]: res.locals.webpage },
        },
        { new: true },
        (err, doc) => {
          if (err) return next(err);
          // console.log(doc);
          return next();
        }
      );
    }
  });
};

module.exports = webPageController;
