import Ember from 'ember';
const { isEmpty, computed } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  colleges:computed(function(){
    return this.store.findAll('college');
  }),

});
