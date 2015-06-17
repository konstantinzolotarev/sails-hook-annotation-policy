'use strict';

module.exports = function(req, res, next) {
  console.log(123);
  return next();
};
