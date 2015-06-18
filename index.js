'use strict';

module.exports = function(sails) {

  return {
    configure: function() {
      if (!sails.hooks.controllers) {
        sails.log.error('sails-hook-annotation-policy could not work without controllers !');
        return;
      }
      sails.after('hook:controllers:loaded', require('./lib/afterHooksLoaded')(sails));
    }
  };
};
