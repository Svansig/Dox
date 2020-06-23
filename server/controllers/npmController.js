const fetch = require('node-fetch');

const npmController = {};

npmController.search = async (req, res, next) => {
  const baseURL = 'https://api.npms.io/v2/search';
  console.log(req.query);
  if (!req.query.search) {
    return next({ code: 400, message: 'A valid query is required to search.' });
  }
  const query = req.query.search;
  const searchString = query.replace(' ', '+');
  const searchURL = `${baseURL}?q=${searchString}`;
  try {
    const response = await fetch(searchURL);
    const data = await response.json();
    res.locals.data = data;
    next();
  } catch (err) {
    return next({ code: 400, message: err });
  }
};

npmController.details = async (req, res, next) => {
  const baseURL = 'https://api.npms.io/v2/package/';
  console.log(req.params.package);
  if (!req.params.package) {
    return next({ code: 400, message: 'A valid query is required to search.' });
  }
  const packageName = req.params.package;
  const packageURL = `${baseURL}${packageName}`;
  try {
    const response = await fetch(packageURL);
    const data = await response.json();
    res.locals.data = data;
    next();
  } catch (err) {
    return next({ code: 400, message: err });
  }
};

module.exports = npmController;
