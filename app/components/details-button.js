import Ember from 'ember';

export default Ember.Component.extend({
   tagName: 'button',
  click() {
    //  if (confirm(this.get('text'))) {
    //    // trigger action on parent component
    //  }

    console.log("Click");
      this.sendAction('action',id);
   },

  actions:{
    // showDetails(id){
    //     console.log("inside components actions");
    //     this.sendAction('action',id);
    // },
//     click: function() {
// //      this.sendAction();
//       this.sendAction('action',id);
//     }

  }
});
