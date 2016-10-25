import Ember from 'ember';
import Table from 'ember-light-table';

const { isEmpty, computed } = Ember;

  export default Ember.Component.extend({
    // page: 1,
    // limit: 20,
    // dir: 'asc',
    // sort: null,
    // model: null,
    // isLoading: false,
    // canLoadMore: true,
    //
    //
    // columns: computed(function() {
    //   return [
    //     {
    //       label: 'Avatar',
    //       valuePath: 'avatar',
    //       cellComponent: 'user-avatar',
    //       width: '60px',
    //       sortable: false
    //     },
    //     {
    //     label: 'First Name',
    //     valuePath: 'firstname',
    //     width: '150px'
    //   }, {
    //     label: 'Last Name',
    //     valuePath: 'lastname',
    //     width: '150px'
    //   }, {
    //     label: 'Email',
    //     valuePath: 'email'
    //   },
    //   {
    //     label: 'Department',
    //     valuePath: 'department.name'
    //   },
    //    {
    //     label: 'Details',
    //     valuePath: 'id',
    //     cellComponent: 'details-button',
    //       width: '60px'
    //
    //   }, {
    //     label: 'Remove',
    //     valuePath: 'id',
    //     cellComponent: 'delete-button',
    //     width: '60px'
    //   }];
    // }),
    //
    //
    // table: computed('model', function() {
    //   return new Table(this.get('columns'), this.get('model'), { enableSync: true });
    // }),


    //
    // fetchRecords() {
    //   this.set('isLoading', true);
    //   this.store.query('faculty', this.getProperties(['firstName', 'lastName', 'email','department'])).then(records => {
    //     var records = records.toArray()
    //     //console.log(records)
    //     //     obj["details"] = "<a href='Test'></a>"
    //     // })
    //     // this.get('model').clear();
    //     var model = this.get('model');
    //
    //     records.forEach(function(record){
    //         record["details"] = "<button> </button>"
    //     });
    //
    //
    //     this.set('model', records)
    //
    //     // this.get('model').pushObjects(records);
    //     this.set('isLoading', false);
    //     this.set('canLoadMore', !isEmpty(records));
    //   });
    // },
    //

    departments:computed(function(){
      return this.store.findAll('department');
    }),

    actions: {

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
         console.log("Inside Component");
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
