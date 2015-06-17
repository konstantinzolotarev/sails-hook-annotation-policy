'use strict';

module.exports = function(sails, cb) {

  return function() {

    var controllersFolder = sails.config.paths.controllers;
    var pattern = controllersFolder + '/**/*Controller.js';

    console.log(controllersFolder);
    cb();
  };
};
