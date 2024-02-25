const path = require('path');

module.exports = {
  entry: './source.js', // Update with the path to your front-end JS
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
  },
  mode: 'production'
};