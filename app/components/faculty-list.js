import Ember from 'ember';
import Table from 'ember-light-table';

const { isEmpty, computed } = Ember;

  export default Ember.Component.extend({

    session: Ember.inject.service('session'),
    departments:computed(function(){
      return this.store.findAll('department');
    }),



    editMode:false,
    actions: {
      editMode(){
        if( this.get('editMode')){
            this.set('editMode',false)
        }else{
            this.set('editMode',true)
        }
      },

      someAction: function(){
       this.sendAction("someAction"); // Exposes the action
     },
      deleteFaculty(faculty){
        //get
         console.log(faculty);
         faculty.deleteRecord()
         faculty.save()
      },
     showDetailsFaculty(faculty){
        // this.sendAction('showDetails',faculty)
         this.sendAction('action',faculty);         //get
        //  console.log("Inside Component");
       },
      addFaculty(salutation,first,last,email){

        if ( !salutation){
          salutation = ""
        }

        var departmentId = Ember.$("#departmentSelect").val()
        var department = this.store.peekRecord('department',departmentId)

        // this.store.findRecord('department', departmentId).then(function(department){
          let faculty = this.store.createRecord('faculty',{
            firstname: first,
            lastname: last,
            email: email,
            reviews: [],
            training: []
          })
          department.get('faculty').pushObject(faculty);
          department.save();
          faculty.save();
        // });

      // },
      // selectAll() {
      //   this.get('table').rows.setEach('selected', true);
      // },
      //
      // deselectAll() {
      //   this.get('table.selectedRows').setEach('selected', false);
      // },
      //
      // deleteAll() {
      //   this.get('table').removeRows(this.get('table.selectedRows'));
      // },
      //
      // onScrolledToBottom() {
      //   if(this.get('canLoadMore')) {
      //     this.incrementProperty('page');
      //     this.fetchRecords();
      //   }
      // },
      //
      // onColumnClick(column) {
      //   if (column.sorted) {
      //     this.setProperties({
      //       dir: column.ascending ? 'asc' : 'desc',
      //       sort: column.get('valuePath'),
      //       page: 1
      //     });
      //     this.get('model').clear();
      //     this.fetchRecords();
      //   }
      }
    }
  });
