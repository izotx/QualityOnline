import Ember from 'ember';

export default Ember.Route.extend({

  actions:{
    importData(){
     var store = this.store
      $.getJSON('http://qualityonline.uwf.edu/data.php', function(departments) {


        var addedColleges = new Array()
        var addedDeparments = new Array()

        //get unique colleges
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        // usage example:
        var collegeNames = departments.map(function(d){
            return d.college.post_title;
        })

        var uniqueCollege = collegeNames.filter( onlyUnique );

        uniqueCollege.forEach(function(collegeName){
          store.query('college', {orderBy: 'name', equalTo: collegeName }).then(function(colleges) {

              if(colleges.get('length') === 0)
              {
                      //create a new college
                    let record = store.createRecord('college',
                    {
                      name : collegeName
                    });

                    record.save();
              }
              else{
                console.log("Exists");

              }
          });

        })

        var uniqueDepartments = departments.map(function(d){return d.name}).filter(onlyUnique)
        // console.log(uniqueDepartments);

          departments.forEach(function(department){
            console.log(department);

              store.query('department', {orderBy: 'name', equalTo: department.name }).then(function(depts){
                  if(depts.length >0 )
                  {
                    console.log(name + " Dept Exists");
                    return
                  }
                  let record = store.createRecord('department',
                  {
                    name :department.name
                  });
                  var collegeName = department.college.post_title;
                  console.log(collegeName);
                  store.query('college', {orderBy: 'name', equalTo: collegeName }).then(function(college){
                    console.log("College is: ");
                    console.log(college.get('name']));

                    record.set('college',college);
                    college.get('departments').pushObject(record);
                    record.save();
                    college.save()
                  })
              })
          })
      });
    }
  }
});
