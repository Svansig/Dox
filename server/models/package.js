const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  project: String,
  description: String,
  links: {
    npm: String,
    homepage: String,
    bugs: String,
    repository: String,
  },
  pages: {
    npm: String,
    repository: String,
  },
});

module.exports = mongoose.model('project', projectSchema);
