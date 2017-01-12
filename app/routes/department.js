import Ember from 'ember';

export default Ember.Route.extend({


  model(params) {

    // var faculty = department.faculty;
    var designCourse = new Array();
    var teachingCourse = new Array();
    var reviews = new Array();
    var name;

    var department = this.store.findRecord('department',params.department_id)
    console.log(params);
    console.log(department);

    var reviewsList =  department.get('reviews')
    var training =  department.get('training')

    // .then(function(values)
    // {
    //
    //       //filter values here
    // });




    // var reviews = this.store.query('review',{'faculty.department':department});
    var teaching = this.store.query('training',{'faculty.department':department, filter:{type:'ATC Teaching Course (TQOC)'}});
    var design = this.store.query('training',{'faculty.department':department, filter:{type:'ATC Design Course (DQOC)'}});
    var improving = this.store.query('training',{'faculty.department':department, filter:{type:'Improving Your Online Course (IYOC)'}});
    var faculty = this.store.query('faculty',{'department':department});



    return   {"department":department,"faculty":faculty,"reviews":reviewsList,"improving":improving, "design":design,"teaching":teaching};
  }
});
