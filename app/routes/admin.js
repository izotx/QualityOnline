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

                    console.log("Added");
                    record.save();
              }
              else{
                console.log("Exists");

              }
          });

        })

        departments.forEach(function(department){
              var collegeName = department.college.post_title;

              ///{ filter:

          })
      });
    }
  }
});
