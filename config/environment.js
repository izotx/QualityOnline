/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'quality-online',
    environment: environment,
    contentSecurityPolicy: { 'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com" },
    rootURL: '/',
    firebase:  {
        apiKey: "AIzaSyB8TQjczxRYH3kqVTWenqYT1onUhMIpfl4",
        authDomain: "qualityonline-fb396.firebaseapp.com",
        databaseURL: "https://qualityonline-fb396.firebaseio.com",
        storageBucket: "qualityonline-fb396.appspot.com",
        messagingSenderId: "631911141512"
      },
      torii: {
          sessionServiceName: 'session'
        },
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
