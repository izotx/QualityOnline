import Ember from 'ember';

export default Ember.Route.extend({
  helper: Ember.inject.service('quality-data'),
  const: Ember.inject.service('constants'),

  model(params) {

    // var faculty = department.faculty;
    var designCourse = new Array();
    var teachingCourse = new Array();
    var reviews = new Array();
    var name;
    var helper = this.get('helper');
    var store = this.store
    var department = this.store.findRecord('department',params.department_id);
    var constants = this.get('const').courseTypes
    var faculty = this.store.query('faculty',{'department':department});

    return new Ember.RSVP.Promise(function(resolve) {
      department.then(function(d){
        var facultyQuery = helper.getFacultyFromDepartment(d,store).then(function(fac){
              return helper.getDataFromFaculty(fac)
        }).then(function(data){
            return Ember.RSVP.all([data.training, data.reviews]).then(function(values){
                var training = values[0]
                var reviews = values[1]
                var teaching = []
                var design = []
                var improving = []

                training.forEach(function(v){
                var type = v.getProperties(['type']).type
                console.log(type);
                if (type == constants[0].name){
                    teaching.push(v)
                }

                else if (type == constants[1].name){
                    design.push(v)
                }
                else if (type == constants[2].name){
                    improving.push(v)
                }
                })
                console.log("Returning Departments and other crap");
                console.log({"department":department,"faculty":faculty,"reviews":reviews,"improving":improving, "design":design,"teaching":teaching});
                resolve({"department":department,"faculty":faculty,"reviews":reviews,"improving":improving, "design":design,"teaching":teaching});
              })
            })
        });
      }
    )
  }
});
