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
     let record = this.store.createRecord('training',
     {
        type:training,
        date:date
     });

     this.facultyModel.get('training').pushObject(record);
     this.facultyModel.save()
     record.save();




   },
   deleteTraining: function(training){
      training.deleteRecord();
      training.save();

      //  this.facultyModel.get('training').remove(training);
       //
      //  this.facultyModel.save()

   },
   addReview: function(courseName, internalDate,externalDate,funDate,recertificationDate){
     let record = this.store.createRecord('review',
     {
     courseName:courseName,
     internalDate:internalDate,
     externalDate:externalDate,
     funDate:funDate,
     recertificationDate:recertificationDate
   });
   this.facultyModel.get('reviews').pushObject(record);
   this.facultyModel.save();
   record.save();

   },
   deleteReview: function(record){
      record.deleteRecord();
      record.save();
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
