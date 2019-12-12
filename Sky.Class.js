'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports.default = require('./dist/Sky.Class.min.js');
} else {
  module.exports.default = require('./dist/Sky.Class.js');
}
