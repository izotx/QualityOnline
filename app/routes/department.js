import Ember from 'ember';

export default Ember.Route.extend({


  model(params) {

    // var faculty = department.faculty;
    var designCourse = new Array();
    var teachingCourse = new Array();
    var reviews = new Array();
    var department;
    var name;


     var department = this.store.findRecord('department',params.department_id)
    //  .then(function(d){
     //
    //    console.log(d);
    //    console.log(d.faculty);
     //
    //    d.faculty.forEach(function(faculty){
    //       faculty.foreach(function(f){
    //             if(f.reviews){
    //               f.reviews.forEach(function(r){
    //                   console.log(r.type);
    //                   console.log("AAAAA");
    //               })
    //             }
    //       })
    //    });
    //  })

    // var reviews = this.store.query('review');
     var reviewsList = this.store.query('review',{"faculty.department":department})
     .then(function(reviews){
       console.log(reviews);
      reviews.forEach(function(review){
          console.log(review.type);
          console.log(review.faculty);
          console.log(review.faculty.department);
      })
    })


    // var getReviews = function() {
    //   var promise =   new Ember.RSVP.Promise(function(resolve, reject){
    //         reviewsList.then(function(reviews){
    //          reviews.forEach(function(review){
    //
    //              var r = review.getProperties('courseName','internalDate','externalDate','funDate')
    //              if(r.internalDate){
    //                  internalCount++;
    //              }
    //              if(r.externalDate){
    //                  externalCount++;
    //              }
    //              if(r.funDate){
    //                  funCount++;
    //              }
    //          })
    //          resolve(reviews);
    //        });
    //     });
    //     return promise;
    // }






    var reviews = this.store.query('review',{'faculty.department':department});
    var teaching = this.store.query('training',{'faculty.department':department, filter:{type:'ATC Teaching Course (TQOC)'}});
    var design = this.store.query('training',{'faculty.department':department, filter:{type:'ATC Design Course (DQOC)'}});
    var improving = this.store.query('training',{'faculty.department':department, filter:{type:'Improving Your Online Course (IYOC)'}});
    var faculty = this.store.query('faculty',{'department':department});



    return   {"department":department,"faculty":faculty,"reviews":reviews,"improving":improving, "design":design,"teaching":teaching};
  }
});
