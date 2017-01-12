import Ember from 'ember';

export default Ember.Service.extend({

  getTrainingStats(trainings){
    var dqoc = 0;
    var qotc = 0;
    var iyoc = 0;


    return new Ember.RSVP.Promise(function(resolve, reject){
           trainings.then(function(values){
               values.forEach(function(training){
                 var t = training.getProperties('type');
                //  console.log("Type of training is: ");
                //  console.log(t.type);

                 if(t.type){
                   var count = training[t.type] + 1 ;
                   training[t.type] = count;

                   if(t.type == 'ATC Teaching Course (TQOC)'){
                     qotc = qotc + 1;
                   }
                   else if(t.type == 'ATC Design Course (DQOC)' ){
                     dqoc = dqoc + 1;
                   }
                   else if(t.type == 'Improving Your Online Course (IYOC)'){
                     iyoc = iyoc + 1
                   }
                 }
               }
             );
            //  console.log({"dqoc":dqoc,"qotc":qotc,"iyoc":iyoc});
             resolve({"dqoc":dqoc,"qotc":qotc,"iyoc":iyoc})
           })
    });
  },


  getReviewsStats(reviews){
    var funCount = 0;
    var internalCount = 0;
    var externalCount = 0;

    return new Ember.RSVP.Promise(function(resolve, reject){
    reviews.then(function(reviews){
        reviews.forEach(function(review){
          var r = review.getProperties('courseName','internalDate','externalDate','funDate','faculty')
          // console.log("Inside Review Stats");
          // console.log(r);

          if(r.internalDate){
              internalCount++;
          }
          if(r.externalDate){
              externalCount++;
          }
          if(r.funDate){
              funCount++;
          }
        })
          // console.log({"fun":funCount, "internal":internalCount, "externalCount":externalCount});
          resolve ({"fun":funCount, "internal":internalCount, "externalCount":externalCount})
    });

    });
  },

  /**Helper method returns promise, and accepts promises of faculty objects*/
  getDataFromFaculty(fac){
    return  Ember.RSVP.Promise.all(fac).then(values=>{
          var facs = []
          // console.log("Data From Faculty");
          // console.log(values);

          values.forEach(function(v){
            if(Array.isArray(v)){
              v.forEach(function(f){
                facs.push(f)
              })
            }
            else{
              facs.push(v)
            }
          })

          var data = this.getFacultyData(facs)
          var trainingPromise = this.getTrainingStats(data.training)
          var reviewPromise = this.getReviewsStats(data.reviews)

          return Ember.RSVP.Promise.all([trainingPromise,reviewPromise]).then(values=>{
                // console.log("Training Stats");
                // console.log(values[0]);
                var trainingStats = values[0]
                // console.log("Reviews Stats");
                // console.log(values[1]);
                var reviewStats = values[1]
                var dqoc = trainingStats.dqoc
                var qotc = trainingStats.qotc
                var iyoc = trainingStats.iyoc
                var funCount = reviewStats.fun
                var internalCount = reviewStats.internal
                var externalCount = reviewStats.externalCount

                return {"dqoc":dqoc, "qotc":qotc, "iyoc":iyoc, "funCount":funCount, "internalCount":internalCount, "externalCount":externalCount}
          })
      })

  },


  getFacultyData(facultyArray){
    var training =[]
    var reviews =[]


    facultyArray.forEach(function(facultyMember){
      // var rr = facultyMember.get("reviews").reviews
      // console.log(rr);


      var reviewsPromise = facultyMember.get("reviews").then(function(v){return v})
      if (reviewsPromise){
        reviews.push(reviewsPromise)
      }

      var t = facultyMember.get('training').then(function(v){return v})

      if (t){
        training.push(t)
      }
    })

    var reviewsPromises = Ember.RSVP.Promise.all(reviews).then(values=>{
          var ireviews = []
          values.forEach(function(v){
                v.forEach(function(f){
                  ireviews.push(f)
              })
          })
          return ireviews
        }
    );

    var trainingPromises = Ember.RSVP.Promise.all(training).then(values=>{
          var array = []
          values.forEach(function(v){
                v.forEach(function(f){
                  array.push(f)
              })
          })
          return array
        }
    );



    return {"training":trainingPromises, "reviews":reviewsPromises}
  },

  getFacultyFromCollege(id,store){
    // console.log("College Id "+id)
    var collegesQuery = store.query('department',{orderBy:'college', equalTo:id})
    var facQuery = undefined
    return collegesQuery.then(function(departments){

      var promises = []
       departments.forEach(function(department){
        // console.log("Department: ");
        // console.log(department.getProperties(['name','faculty']));

        var p = new Promise((resolve,reject)=>{
          department.get('faculty').then(function(faculty){
              var facultyArray = []
              // console.log(faculty);
              faculty.forEach(function (f){
                  facultyArray.push(f)
                  // console.log(f.getProperties(['firstname']));
              })
              resolve(facultyArray)
          })
        });
        promises.push(p)
      });

      return promises
    })

  },

  getFacultyFromDepartment(department,store){
    // var depts = store.find('department',{orderBy:'_id', equalTo:id}})
    // var _department = store.find('department',id)
     console.log("DEPARTMENT");
    //  console.log(_department);
    // console.log(id);
     console.log(department.getProperties(['name']));
    //
    // _department = store.query('department',{orderBy:'id', equalTo:id})
    // console.log(_department);

    return  new Promise((resolve,reject)=>{
      department.get('faculty').then(function(faculty){
          var facultyArray = []
          // console.log(faculty);
          faculty.forEach(function (f){
              facultyArray.push(f)
              // console.log(f.getProperties(['firstname']));
          })
          resolve(facultyArray)
      })
    });
  }


});
