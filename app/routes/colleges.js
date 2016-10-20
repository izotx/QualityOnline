import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('college');
  },
  actions:{
    addCollege(name){

      var newCollege = this.store.createRecord('college', {
        name: name
      })

      newCollege.save();
    }
  }
});
