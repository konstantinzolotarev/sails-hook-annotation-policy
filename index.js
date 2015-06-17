'use strict';

module.exports = function(sails) {

    return {
        defaults: {

        },

        initialize: require('../lib/initialize')(sails)
    };
};
