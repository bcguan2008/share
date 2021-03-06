'use strict';

var zlib = require('zlib');

module.exports = {
  gzip: function gzip(input, options) {
    var promise = new Promise(function (resolve, reject) {
      zlib.gzip(input, options, function (error, result) {
        if (!error) resolve(result); else reject(Error(error));
      });
    });
    return promise;
  },
  ungzip: function ungzip(input, options) {
    var promise = new Promise(function (resolve, reject) {
      zlib.gunzip(input, options, function (error, result) {
        if (!error) resolve(result); else reject(Error(error));
      });
    });
    return promise;
  }
};