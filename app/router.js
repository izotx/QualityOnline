import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('colleges');
  this.route('departments',{path:'/departments/:college'});
  this.route('faculty',{path:'/faculty'});
  this.route('login');
  this.route('department');
  this.route('faculty-list');
  this.route('departmentscontroller',{path:'/departmentscontroller/:college'});
});

export default Router;
