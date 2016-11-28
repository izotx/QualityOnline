import Ember from 'ember';
import config from '../config/environment';
// import firebase from 'firebase/app';
//// http://emberjs.jsbin.com/kexamedo/3/edit?html,css,js,output

export default Ember.Component.extend({
  firebase: Ember.inject.service(),
  constants : Ember.inject.service('constants'),
    session: Ember.inject.service('session'),
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

    updateProfilePhoto(faculty){
          var fapp = undefined;
          try{
            fapp  = firebase.app()//.App.name
          }
          catch(e){
            fapp = firebase.initializeApp(config.firebase);
          }

          let image = document.getElementById( 'profile_image' );
          let storeName = name.replace( / /g, '' );
          let storageRef = fapp.storage().ref();
          let file = image.files[0];
          let metadata = {
              'contentType' : file.type
          };

          let uploadTask = storageRef.child( `faculty_images/${file.name}` ).put( file, metadata );

          uploadTask.on( 'state_changed', null, function( error ){
              console.error( 'Upload Failed:', error );
          }, function(){
              console.log( 'Uploaded', uploadTask.snapshot.totalBytes, 'bytes.' );
              console.log( uploadTask.snapshot.metadata );
              let uploadUrl = uploadTask.snapshot.metadata.downloadURLs[0];
              console.log( 'File available at ', uploadUrl );
              faculty.set('profile_image',uploadUrl)
              faculty.save()
          } );

          // Tell the route to hide the client form.
          //this.send( 'hideAddClientForm' );
      },

   addTraining: function(date){
     var training = Ember.$("#trainingSelect").val()
     let record = this.store.createRecord('training',
     {
        type:training,
        date:toDate(date)
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

     var iDate = toDate(internalDate);
     var eDate = toDate(externalDate);
     var fDate = toDate(funDate);
     var rDate = toDate(recertificationDate);




     let record = this.store.createRecord('review',
     {
     courseName:courseName,
     internalDate:iDate,
     externalDate:eDate,
     funDate:fDate,
     recertificationDate:rDate
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
function toDate(dateString) {
  if(!dateString){
      return undefined;
  }
  return new Date(dateString);

//  var from = dateString.split("/");
//  return new Date(from[2], from[1] - 1, from[0]);
}
