import Ember from 'ember';

export default Ember.Route.extend({
  actions:{
    showDetails(id){
        console.log("inside routes actions");
    },
  },
  model(){
    return this.store.findAll('faculty')
  }
});
