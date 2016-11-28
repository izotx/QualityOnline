import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
   college: {
     refreshModel: true
   }
 },
  model(params) {

    console.log(params.college);
    console.log(this.queryParams.college);

    var collegeId = params.college;
    var store = this.store;

    var college =  this.store.findRecord('college',collegeId);
    var departments = this.store.findAll('department');


    var multiModel = Ember.Object.create(
      {
        college: college,
        departments : departments,
        colleges :this.store.findAll('college')
      });

      return multiModel;
    }
});
