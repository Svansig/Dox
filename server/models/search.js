const mongoose = require('mongoose');

const searchSchema = mongoose.Schema({
  query: String,
  responses: [
    {
      name: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model('search', searchSchema);
