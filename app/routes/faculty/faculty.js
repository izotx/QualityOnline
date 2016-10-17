import Ember from 'ember';

export default Ember.Route.extend({
  model(){
      return {name:"Janusz", lastname:"Chudzynski", department:"Test"};
  }
});
