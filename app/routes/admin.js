import Ember from 'ember';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Ember.Route.extend(FindQuery,{
  helper: Ember.inject.service('quality-data'),
  actions:{
    sanitizeTraining(){

      this.store.query('training',{}).then(function(training){
          var tr = training.toArray()
          //  courseTypes:[{name:'ATC Teaching Course (TQOC)'}, {name:'ATC Design Course (DQOC)'},{name:'Improving Your Online Course (IYOC)'}]
          tr.forEach(function(t){
              //get training type
              let type = t.get('type')
              if(type === 'Designing a Quality Online Course'){
                t.set('type','ATC Design Course (DQOC)')
              }
              if(type === 'Teaching a Quality Online Course'){
                t.set('type','ATC Teaching Course (TQOC)')
              }
              if(type === 'Improving Your Online Course (IYOC)'){
                t.set('type','mproving Your Online Course (IYOC)')
              }
              t.save()
          })
      })


    },

    clearTraining(){
      console.log("It's really deleting the revies and training now");
      var store = this.store
      store.query('faculty',{}).then(function(facs){
          var ff = facs.toArray()
          // console.log(facs.toArray());
          ff.forEach(function(f){
              f.set('training',[])
              f.set('reviews',[])
              f.save()
          })
      })

      // let record = store.createRecord('department',
      // {
      //   name :"Testing One"
      // });
      // record.save().then(function(r){
      //     console.log("Saved");
      //     console.log(r);
      // })
      // importOneF(store)
    },
    findOne(){
          let store = this.store
          findOneModel(store, 'faculty','wid', String(658)).then(function(facultyMember){
            var fac = facultyMember
            if(fac){
              console.log("Faculty Exists ")
              console.log(facultyMember);
            }
            else{
              console.log("It doesn't");
            }
          })
          // store, model, param, value
          // var store = this.store
          // store.query('department', {orderBy: 'name', equalTo: "Testing One"}).then(function(depts){
          //     // var dept = depts.get('content')[0]
          //     return depts.get('firstObject')
          //   }).then(function (dept){
          //         //Add it to college
          //         store.query('college', {orderBy: 'name', equalTo: "CAS"}).then(function(c){
          //             return c.get('firstObject')}).then(function(college){
          //               console.log(college);
          //               console.log(dept.get('name'));
          //
          //               dept.set('college',college);
          //               college.get('departments').pushObject(dept);
          //               dept.save();
          //               college.save()
          //
          //
          //             })
          //   })
    },


    importData(){
     var store = this.store
     var helper = this.get('helper')
     var self = this
     var jsonURL = "http://localhost:81/JSON/"
     var prodURL = "http://qualityonline.uwf.edu/data.php"
      $.getJSON(prodURL, function(departments) {


        // var collegePromise = importColleges(store,departments)
        //
        //
        // collegePromise.then(function(a){
        //     var departmentsPromise = importDepartments(store, departments).then(function(b){
        //         // console.log("BBB");
        //         // var instructorsPromises = importFaculty(store,departments)
        //         // Ember.RSVP.all(instructorsPromises).then(function(values){
        //         //     console.log("Instructors imported");
        //         //    importQData(store,departments)
        //         // })
        //     })
        // })

        // var instructorsPromises = importFaculty(store,departments)
        // Ember.RSVP.all(instructorsPromises).then(function(values){
        //     console.log("Instructors imported");
        //    importQData(store,departments)
        // })


        importQData(store,departments)


      }
    )
    }
  }
 }
);


function  importDepartments(store, departments){
  return new Ember.RSVP.Promise(function(resolve, reject){
      departments.forEach(function(department){
          var name = department.name
          getSingleElement(store, 'department','name',name).then(function(el){
            if (el){
              console.log(name + " deparment exists.");
            }
            else{
              // console.log(collegeName + "Doesn't exist. Let's create it.");
              let dept = store.createRecord('department',
              {
                  name : name
              });

              console.log("department ");
              console.log(department);
              var collegeName = department.college.post_title;

              store.query('college', {orderBy: 'name', equalTo: collegeName}).then(
                function(c){

                  return c.get('firstObject')}
                ).then(function(college){
                    if(college){
                      dept.set('college',college);
                      college.get('departments').pushObject(dept);
                      dept.save();
                      college.save()

                    }
                    else{


                    }

                  })
            }
          })
      })
      resolve(false)
    });
}


function importDepartment(store, departmentName,collegeName){
  store.query('department', {orderBy: 'name', equalTo: departmentName}).then(function(depts){

      return depts.get('firstObject')
    }).then(function (dept){
          //Add it to college
          store.query('college', {orderBy: 'name', equalTo: collegeName}).then(
            function(c){
              return c.get('firstObject')}
            ).then(function(college){
                dept.set('college',college);
                college.get('departments').pushObject(dept);
                dept.save();
                college.save()

              })
    })
}


function fixFaculty(store){
  store.findAll('faculty').then(function(fac){


  })
}

function importQData(store, departments){

  departments.forEach(function(department){
    var p = new Ember.RSVP.Promise(function(resolve, reject){
    store.query('department', {orderBy: 'name', equalTo: department.name}).then(function(depts){
        return depts.get('firstObject')
      }).then(function (deptModel){
        var reviews = department.reviews
        if(reviews){
            importReviews(store,reviews)
        }
        var training = department.training
        if(training){
            importTraining(store,training.all)
        }
      }
    )
  }
)
}
)
}

function importReviews(store, reviews){
  reviews.forEach(function(r){

    //find an instructor
    let id = r.instructorID
    findOneModel(store, 'faculty','wid', String(id)).then(function(facultyMember){

      if (facultyMember){
        console.log("Found Review");
        console.log(r.instructorName);

        if(r.instructorName){
          facultyMember.set('firstname', r.instructorName)
          console.log("Setting First Name to : " + r.instructorName);
        }
        if(r.instructorLastName){
          facultyMember.set('lastname', r.instructorLastName)
        }
        if(r.instructorEmail){
          facultyMember.set('email', r.instructorEmail)
        }

        var iDate = toDate(r.internalDate);
        var eDate = toDate(r.externalDate);
        var fDate = toDate(r.fundamentalsDate);
        var rDate = toDate(r.recertificationDate);

        let record =store.createRecord('review',
        {
        courseName:r.courseName,
        internalDate:iDate,
        externalDate:eDate,
        funDate:fDate,
        recertificationDate:rDate
      });
      facultyMember.get('reviews').pushObject(record);
      facultyMember.save();
      record.save();
      console.log("Saving Faculty Reviews End___");
      }
      else{
            console.log("Not Found" + id );
      }
    })
  })

}

function importTraining(store,training){
  training.forEach(function(r){

    let id = r.instructor.ID
    findOneModel(store, 'faculty','wid', String(id)).then(function(facultyMember){
      if (facultyMember){
         console.log("Found Training");
        if(r.instructorName){
          facultyMember.set('firstname', r.instructorName)
          console.log("Setting First Name to : " + r.instructorName);
        }
        if(r.instructorLastName){
          facultyMember.set('lastname', r.instructorLastName)
        }
        if(r.instructorEmail){
          facultyMember.set('email', r.instructorEmail)
        }


        var completed = toDate(r.completed)

        let record =store.createRecord('training',
        {
          faculty:id,
          type: r.courseName,
          date:completed
      });

      facultyMember.get('training').pushObject(record)
      facultyMember.save().then(function(){
          console.log("Training SAVED ");
      });;
      record.save();
      }
      else{
          console.log("Not Found" + id );
      }
    })
  })
}


//
// function importOneF(store){
//
//   store.query('department', {orderBy: 'name', equalTo: "Computer Science"}).then(function(depts){
//     return  depts.get('firstObject')})
//     .then(function (dept){
//
//     let record = store.createRecord('faculty', { wid : "a", department:dept });
//     dept.get('faculty').pushObject(record);
//     record.save().then(function(r){
//       console.log("Record Saved");
//       return true
//     }).then(function(){
//       dept.save().then(function(d){
//           console.log("Department sav Save");
//       })
//     })
//   })
//
//
// }


function  importColleges(store, departments){
        return new Ember.RSVP.Promise(function(resolve, reject){
          // console.log("Departments " + departments);

          var collegeNames = departments.map(function(d){
              return d.college.post_title;
          })

          var uniqueCollege = collegeNames.filter( onlyUnique );
          uniqueCollege.forEach(function(collegeName){
            getSingleElement(store, 'college','name',collegeName).then(function(el){
              if (el){
                console.log(collegeName + " college exists.");
                console.log(el);
                resolve(el);
              }
              else{
                console.log(collegeName + "Doesn't exist. Let's create it.");
                let record = store.createRecord('college',
                {
                    name : collegeName
                });
                record.save()
                resolve(record);
                console.log("College Saved " + collegeName);
              }
            })
          })
        });
    }


function findOneModel(store, model, param, value){
  return  store.query(model, {orderBy: param, equalTo: value}).then(function(values){
      return values.get('firstObject')

      // if(values.get('content').length > 0){
      //     return values.get('content')[0]._data
      // }
      // return undefined
  })

}

function getSingleElement(store, model, param, value){
  return  store.query(model, {orderBy: param, equalTo: value}).then(function(values){
      if(values.get('content').length == 0){
          return false
      }
      return values.get('content')[0]._data
  })
}

//get unique colleges
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}



function importFaculty(store, departments){

    var promises = []
    departments.forEach(function(department){
      var p = new Ember.RSVP.Promise(function(resolve, reject){
      store.query('department', {orderBy: 'name', equalTo: department.name}).then(function(depts){
          return depts.get('firstObject')
        }).then(function (dept){
            //dept is a model
            var instructors = department.instructors
            instructors.forEach(function(instructor){
              //find faculty by email
              var id = instructor.ID

              if (!dept){
                console.log("department doesn't exist " + department.name);
              }
              else

              findOneModel(store, 'faculty','wid', String(id)).then(function(facultyMember){
                var fac = facultyMember
                if(fac){
                  console.log("Faculty Exists " + instructor.post_title)
                  console.log(facultyMember);
                }
                else{
                      fac = importOneFaculty(store, dept,id)
                }
              })
            }); //End of find one
        })
      });
      promises.push(p)
    });
    return promises
  }


//Imports one faculty into department
function importOneFaculty(store,dept,id){
  let record = store.createRecord('faculty', { wid : id,department:dept });
  dept.get('faculty').pushObject(record);
  dept.save()
  record.save()
  console.log("Department sav Save");
  console.log("Record Save");
  return true
}


function toDate(dateString) {
  if(!dateString){
      return undefined;
  }
  return new Date(dateString);
}
