const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const connectionURL = 'mongodb+srv://dox:readthedox@cluster0-9dhjy.mongodb.net';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to mongoDB'));

const npmController = require('./controllers/npmController');
const webPageController = require('./controllers/webPageController');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// gets webpage
app.post('/api/page', webPageController.get, (req, res) => {
  res.status(200).set('Content-Type', 'text/html').send(Buffer.from(res.locals.webpage));
});

// gathers search data
app.get('/api', npmController.search, (req, res) => {
  res.status(200).json(res.locals.data);
});
// gathers specific package data
app.get('/api/:package', npmController.details, (req, res) => {
  res.status(200).json(res.locals.data);
});

// serves front end app
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));
app.get(/.*/, (req, res) => res.redirect('/'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
