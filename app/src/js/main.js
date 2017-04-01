// make the main element fill the available space and offset correctly
// load shims
require('./shims/Function.prototype.bind.js');
require('request-frame')('native');
require('classlist-polyfill');

require('./layout.js');

window.$ = window.jQuery = require('jquery');