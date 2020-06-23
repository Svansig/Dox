const express = require('express');
const app = express();

const npmController = require('./controllers/npmController');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// gathers search data
app.get('/api', npmController.search, (req, res) => {
  res.status(200).json(res.locals.data);
});
// gathers specific package data
app.get('/api/:package', npmController.details, (req, res) => {
  res.status(200).json(res.locals.data);
});

// serves front end app
app.get('/', (req, res) => {
  res.status(200).json('hello');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
