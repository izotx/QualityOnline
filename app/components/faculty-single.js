import Ember from 'ember';

export default Ember.Component.extend({

  constants : Ember.inject.service('constants'),

  init(){
    this._super(...arguments)
    var constants = this.get('constants')
    //console.log(constants);
    var reviewTypes =  constants.reviewTypes
    var trainingTypes = constants.courseTypes

    this.set('reviewTypes',reviewTypes)
    this.set('trainingTypes',trainingTypes)
  },

  actions: {

   addTraining: function(date){
     var training = Ember.$("#trainingSelect").val()
     console.log(training);
     console.log(date);
     let record = this.store.createRecord('training',
     {
        type:training,
        date:Date(date)
     });

     this.facultyModel.get('training').pushObject(record);
     this.facultyModel.save()
     record.save();




   },
   removeTraining: function(id){

   },
   addReview: function(){

   },
   removeReview: function(id){

   },
  }
  //,

  // reviews:function(){
  //   var constants = this.get('constants')
  //   var reviews =  constants.reviewTypes
  //
  //   return reviews
  // }

});
