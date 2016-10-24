import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('colleges');
  this.route('department',{ path: 'department/:department_id' });
  this.route('departments');
  // this.route('departments',{path:'/departments/:college'});
  this.route('faculty',{path:'/faculty'},function(){
    this.route('faculty');
  });
  this.route('login');

  this.route('faculty-list');
  this.route('departmentscontroller',{path:'/departmentscontroller/:college'});
});

export default Router;
