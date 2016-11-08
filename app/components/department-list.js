import Ember from 'ember';

export default Ember.Component.extend({

  // init(){
  //   this._super(...arguments)
  //   console.log("init");
  //   this.set('editMode',false)
  // },

  actions:{
    editMode(){
      if( this.get('editMode')){
          this.set('editMode',false);
      }else{
          this.set('editMode',true);
      }
    },
     departmentChanged:function(value){
       var selectId = "select"+value;
       var collegeId = Ember.$("#"+selectId).val();
       var departmentName = Ember.$("#"+value).val();
       var store = this.store;
       store.findRecord('department',value).then(function(department){
              store.findRecord('college', collegeId).then(function(college){
              department.set('college',college);
              department.name = departmentName;
              college.save();
              department.save();
            }
          );
       });
     },
     deleteDepartment:function(value){
       console.log("Department to Delete  "+value);
       var store = this.store;
       store.findRecord('department',value).then(function(department){
         console.log(department);
         department.deleteRecord();
         department.save();
       });
     },


    addDepartment(name){

        var collegeId = Ember.$("#collegeSelect").val();

        let college = this.store.peekRecord('college', collegeId);

        if (college){
            let department = this.store.createRecord('department',{
                name:name
            });
            college.get('departments').pushObject(department);
            department.save();
        }
        else{
          console.log("College Doesn't Exist");
        }
    }
  }
});
