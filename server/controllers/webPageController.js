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

const forwardCached = (req, res, result, next) => {
  console.log('cached');
  res.locals.webpage = result.pages[req.body.site];
  return next();
};

const getNewPage = async (url, siteName) => {
  console.log('new fetch');
  let response = await fetch(url);
  response = await response.text();
  switch (siteName) {
    case 'repository':
      return parseGithub(response);
    case 'npm':
      return parseNPM(response);
    case 'bugs':
      return parseBugs(response);
    default:
      return;
  }
};

webPageController.get = async (req, res, next) => {
  const { name, site, url } = req.body;
  Pages.find({ project: name }, async (err, results) => {
    if (err) return next(err);
    const result = results[0];
    if (result.pages && result.pages[site]) {
      return forwardCached(req, res, result, next);
    }
    if (!result.pages || !result.pages[site]) {
      res.locals.webpage = await getNewPage(url, site);
      if (!result.pages) {
        result.pages = {};
      }

      Pages.findOneAndUpdate(
        { project: name },
        {
          pages: { ...result.pages, [site]: res.locals.webpage },
        },
        { new: true },
        (err, doc) => {
          if (err) return next(err);
          return next();
        }
      );
    }
  });
};

module.exports = webPageController;
