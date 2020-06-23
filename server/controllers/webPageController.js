const fetch = require('node-fetch');
const cheerio = require('cheerio');
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
  let response = await fetch(req.body.url);
  response = await response.text();
  if (req.body.site === 'github' || req.body.site === 'repository') {
    res.locals.webpage = parseGithub(response);
  } else if (req.body.site === 'npm') {
    res.locals.webpage = parseNPM(response);
  } else if (req.body.site === 'bugs') {
    // console.log(response);
    res.locals.webpage = parseBugs(response);
  }
  next();
};

module.exports = webPageController;
