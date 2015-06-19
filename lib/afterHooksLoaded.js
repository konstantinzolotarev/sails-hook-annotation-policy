'use strict';

var annotations = require('conga-annotations');
var path = require('path');
var glob = require('glob');
var async = require('async');
var _ = require('lodash');

module.exports = function(sails) {

  /**
   * Get name of the controller by file path
   * @param  {string} filePath path to controller file
   * @return {string}          controller Name
   */
  var getControllerName = function(filePath) {
    return (filePath.split('/').pop().replace('.js', ''));
  };

  /**
   * Add policy configure
   * @param {string} controller
   * @param {string} action
   * @param {string|Array} policy
   */
  var addPolicy = function(controller, action, policy) {
    if (!sails.config.policies[controller]) {
      sails.config.policies[controller] = {};
    }
    if (sails.config.policies[controller][action]) {
      // We already have something binded into configs.
      // Lets add new policy
      if (_.isString(sails.config.policies[controller][action])) {
        var existingPolicy = sails.config.policies[controller][action];
        sails.config.policies[controller][action] = [existingPolicy];
      }
      // If policy is string just adding it to array
      if (_.isString(policy)) {
        sails.config.policies[controller][action].push(policy);
      }
      // If it's array merging both arrays
      if (_.isArray(policy)) {
        sails.config.policies[controller][action].concat(policy);
      }
    } else {
      sails.config.policies[controller][action] = policy;
    }
  };

  return function() {
    var controllersFolder = sails.config.paths.controllers;
    var pattern = controllersFolder + '/**/*Controller.js';

    /**
     * Iterator for controllers
     *
     * @param  {string}   filePath controller file path
     */
    var iterator = function(filePath) {

      // create the registry
      var registry = new annotations.Registry();

      // add annotations to the registry
      registry.registerAnnotation(path.join(__dirname, '../annotation/policy'));

      // create the annotation reader
      var reader = new annotations.Reader(registry);

      // parse the annotations from a file
      reader.parse(filePath);
      //Get controller name
      var controllerName = getControllerName(filePath);

      // get the annotations
      var methodAnnotations = reader.getMethodAnnotations();
      var propertyAnnotations = reader.getPropertyAnnotations();

      // loop through and handle the annotations
      methodAnnotations.forEach(function(annotation) {
        addPolicy(controllerName, annotation.target, annotation.value);
      });
    };

    // Get all controller files
    var files = glob.sync(pattern);
    // Iterate files for searching annotations
    files.forEach(iterator);
  };
};
