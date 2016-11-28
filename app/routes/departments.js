import Ember from 'ember';

export default Ember.Route.extend({



  actions:{
    editMode(){
      if( this.get('editMode')){
          this.set('editMode',false);
      }else{
          this.set('editMode',true);
      }
    }
  },

editMode:false,

beforeModel: function(transition,queryParams){
  console.log("Before Model");
  console.log(this.params);
  console.log(queryParams);
},

  model() {

    console.log("Inside Model");
    console.log(this.params);
    console.log(this.queryParams);
    var collegeId = this.get('college');

  //  var store = this.store;
    var departments;
    if (collegeId){
        departments =  this.store.findRecord('college',collegeId).then(function(college){
            return college.departments;
        });
    }
    else{
      departments = this.store.findAll('department');
    }

    var multiModel = Ember.Object.create(
      {

        departments : this.store.findAll('department'),
        colleges :this.store.findAll('college')
      });

      return multiModel;
    }

  // },
  // actions:{
  //   updateValue: function(value) {
  //      this.set('collegeSelect.value', value);
  //      console.log("Update Value "+ value);
  //    },
  //   addDepartment(name){
  //       let college = this.get('collegeSelect.value') // , value);
  //       console.log(name);
  //       console.log(collegeId);
  //
  //
  //   }


});
