'use strict';

module.exports = {

  appConfig: function() {

    var config = {
      port: 1337,
      log: {
        level: 'info'
      },
      hooks: {
        // Inject the annotation-policy hook in this repo into this Sails app
        "annotation-policy": require('../..'),
        grunt: false,
        i18n: false
      }
      //loadHooks: ['moduleloader', 'userconfig', 'http', 'session', 'sockets']
    };
    return config;

  }
};
