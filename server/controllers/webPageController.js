const fetch = require('node-fetch');
const cheerio = require('cheerio');
const webPageController = {};

webPageController.get = async (req, res, next) => {
  console.log(req.body);
  let response = await fetch(req.body.url);
  response = await response.text();
  //   await console.log(await response.text());
  const $ = cheerio.load(response);
  console.log(typeof response);
  res.locals.webpage = $('article.markdown-body').html();
  next();
};

module.exports = webPageController;
