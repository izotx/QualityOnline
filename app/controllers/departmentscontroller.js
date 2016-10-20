import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['college'],
  college: null,

  // beforeModel: function(transition,queryParams){
  // console.log("Before Model");
  //   console.log(this.params);
  //   console.log(queryParams);
  // },
  actions:{
    editMode(){
      if( this.get('editMode')){
          this.set('editMode',false)
      }else{
          this.set('editMode',true)
      }
    },

  //     updateValue: function(value) {
  //        console.log("Update Value "+ value);
  //        this.set('collegeId', value);
  // //       console.log("Update Value "+ value);
  //      },
     departmentChanged:function(value){
       var selectId = "select"+value
       var _collegeId = Ember.$("#"+selectId).val()
       var departmentName = Ember.$("#"+value).val()
       console.log(_collegeId);
       var store = this.store
       let department = store.peekRecord('department',value)
       let college =    store.peekRecord('college', _collegeId)
       console.log(college.name);
       department.set('college',college)
       department.set('name', departmentName)

      department.save().then(function(){
      college.save()
      console.log("Deparment Saveed!"+department);

      },function(error){console.log(erorr);
          console.log("Error saving data");

          }
            )
          },
    //       )
    //    });
    //  },
     deleteDepartment:function(value){
       console.log("Department to Delete  "+value);
       var store = this.store
       store.findRecord('department',value).then(function(department){
         console.log(department);
         department.deleteRecord()
         department.save()
       })
     },


    addDepartment(name){

        var collegeId = Ember.$("#collegeSelect").val()

        let college = this.store.peekRecord('college', collegeId);

        if (college){
            let department = this.store.createRecord('department',{
                name:name
            })
            department.set('college',college)
            // college.get('departments').pushObject(department);
            department.save();
            // college.save()
        }
        else{
          console.log("College Doesn't Exist");
        }
    }
  }
    //,
    // filteredDepartments: Ember.computed('college', 'model', function() {
    //     let collegeId = this.get('college');
    //     var departments;
    //     console.log(" filtered"+ collegeId);
    //     if (collegeId){
    //       console.log("1");
    //         departments =  this.store.findRecord('college',collegeId).then(function(college){
    //             return college.departments
    //         });
    //       console.log("2");
    //     var multiModel = Ember.Object.create(
    //       {
    //         college:this.store.findRecord('college',collegeId),
    //         departments : departments,
    //         colleges :this.store.findAll('college')
    //       });
    //       console.log("3");
    //       return multiModel;
    //         console.log(" muukit"+ collegeId);
    //     }
    //     else{
    //       departments = this.store.findAll('department')
    //       var multiModel = Ember.Object.create(
    //         {
    //           departments : departments,
    //           colleges :this.store.findAll('college')
    //         });
    //
    //         return multiModel;
    //     }
    // }).property('college','model'),
});
