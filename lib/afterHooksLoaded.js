'use strict';

var annotations = require('conga-annotations');
var path = require('path');
var glob = require('glob');
var async = require('async');
var _ = require('lodash');

module.exports = function(sails, cb) {

  return function() {

    var controllersFolder = sails.config.paths.controllers;
    var pattern = controllersFolder + '/**/*Controller.js';

    /**
     * Iterator for controllers
     *
     * @param  {string}   filePath controller file path
     * @param  {Function} done callback
     */
    var iterator = function(filePath, done) {

      // create the registry
      var registry = new annotations.Registry();

      // add annotations to the registry
      registry.registerAnnotation(path.join(__dirname, '../annotation/policy'));

      // create the annotation reader
      var reader = new annotations.Reader(registry);

      // parse the annotations from a file
      reader.parse(filePath);

      // get the annotations
      var methodAnnotations = reader.getMethodAnnotations();
      var propertyAnnotations = reader.getPropertyAnnotations();

      // loop through and handle the annotations
      methodAnnotations.forEach(function(annotation) {
        console.log(annotation, sails.controllers);
        // // @MyConstructorAnnotation
        // if (annotation.annotation === 'MyConstructorAnnotation') {

        //   // do something with the annotation data
        //   console.log(annotation.target); // -> "MySample"
        //   console.log(annotation.value); // -> "some value"
        //   console.log(annotation.sample); // -> "here is an attribute value"
        // }

      });
      done();
    };

    // Get all controller files
    glob(pattern, function(err, files) {
      if (err) {
        return cb(err);
      }

      // Iterate files for searching annotations
      async.mapLimit(files, 20, iterator, function(err, res) {
        if (err) {
          return cb(err);
        }
        return cb();
      });
    });
  };
};
