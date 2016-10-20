import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['college'],
  college: null,

  // beforeModel: function(transition,queryParams){
  // console.log("Before Model");
  //   console.log(this.params);
  //   console.log(queryParams);
  // },

    filteredDepartments: Ember.computed('college', 'model', function() {
        let collegeId = this.get('college');
        var departments;
        console.log(collegeId);
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

            departments : departments,
            colleges :this.store.findAll('college')
          });

          return multiModel;

    }).property('college','model'),

    // model() {
    //
    //   console.log("Inside Model 1");
    //   // return this.store.findAll('department');
    //   // var multimodel = Ember.Object.create(
    //   //   {
    //   //     let departments = this.store.findAll('department');
    //   //     let colleges = this.store.findAll('college');
    //   //   });
    //   //   return mulitModel;
    //
    //   // .then(function(college){
    //   //
    //   // })
    //
    //   console.log(this.params);
    //   console.log(this.queryParams);
    //   var collegeId = this.get('college');
    //
    //   var store = this.store
    //   var departments;
    //   if (collegeId){
    //       departments =  this.store.findRecord('college',collegeId).then(function(college){
    //           return college.departments
    //       })
    //   }
    //   else{
    //     departments = this.store.findAll('department')
    //
    //   }
    //
    //
    //   // var depts = this.store.query('department',{
    //   //   filter:{college:}
    //   // })
    //
    //   var multiModel = Ember.Object.create(
    //     {
    //
    //       departments : this.store.findAll('department'),
    //       colleges :this.store.findAll('college')
    //     });
    //
    //     return multiModel;
    //   }


});
