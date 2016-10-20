import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
   college: {
     refreshModel: true
   }
 },
  model(params) {

    // return this.store.findAll('department');
    // var multimodel = Ember.Object.create(
    //   {
    //     let departments = this.store.findAll('department');
    //     let colleges = this.store.findAll('college');
    //   });
    //   return mulitModel;

    // .then(function(college){
    //
    // })

//    console.log(this.params);
    console.log(this.queryParams.college);
    var collegeId = this.get('college');

    var store = this.store
    var departments;
    if (collegeId){
        departments =  this.store.findRecord('college',collegeId).then(function(college){
            return college.departments
        })
    }
    else{
      departments = this.store.findAll('department')

    }


    // var depts = this.store.query('department',{
    //   filter:{college:}
    // })

    var multiModel = Ember.Object.create(
      {

        departments : this.store.findAll('department'),
        colleges :this.store.findAll('college')
      });

      return multiModel;
    }
});
