'use strict';

var util = require('../util/liftUtil');
var _ = require('lodash');

var expect = require('chai').expect;
var Sails = require('sails').Sails;

describe('Annotation-policy startup :: ', function() {
    var app;

    before(function(done) {
        Sails().lift(util.appConfig(), function(err, sails) {
            app = sails;
            return done(err);
        });
    });

    after(function(done) {
        app.lower(function (err) {
            return done();
        });
    });

    describe('check existing hooks :: ', function() {

      it('annotation-policy hook should exist', function() {
        expect(app.hooks['annotation-policy']).to.exist
          .and.to.be.instanceof(Object);
      })
    });
});
