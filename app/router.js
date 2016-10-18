import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('colleges');
  this.route('departments');
  this.route('faculty',{path:'/faculty'});
  //this.route('faculty');
  this.route('login');
});

export default Router;
