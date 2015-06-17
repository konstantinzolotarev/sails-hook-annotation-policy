'use strict';

module.exports = function(sails) {

  var requiredHooks = [
    'controllers',
    'http',
    'policies'
  ];

  return function(cb) {
    // Set up listener to bind shadow routes when the time is right.
    //
    // Always wait until after router has bound static routes.
    // If policies hook is enabled, also wait until policies are bound.
    // If orm hook is enabled, also wait until models are known.
    // If controllers hook is enabled, also wait until controllers are known.
    var eventsToWaitFor = [];
    // eventsToWaitFor.push('router:after');
    try {
      /**
       * Check hooks availability
       */
      _.forEach(requiredHooks, function(hook) {
        if (!sails.hooks[hook]) {
          throw new Error('Cannot use `annotation-policy` hook without the `' + hook + '` hook.');
        }
        eventsToWaitFor.push('hook:' + hook + ':loaded');
      });
    } catch (err) {
      if (err) {
        return cb(err);
      }
    }

    sails.after(eventsToWaitFor, require('./afterHooksLoaded')(sails, cb));
  };
};
