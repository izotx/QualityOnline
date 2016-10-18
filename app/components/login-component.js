import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  firebase: Ember.inject.service(),
  actions:{
      login(provider){
        let email = this.get('email');
        let password =  this.get('password');

      //  console.log(session);
      //  console.log(firebase);
       // firebase.authWithPassword({
        //   email    : "bobtony@firebase.com",
        //   password : "correcthorsebatterystaple"
        // }, function(error, authData) {
        //   if (error) {
        //     console.log("Login Failed!", error);
        //   } else {
        //     console.log("Authenticated successfully with payload:", authData);
        //   }
        // });
        //

        // let session =  this.get('session');
        // if (session.isAuthenticated){
        //     console.log("Logged In");
        // }
        // else{
        //     console.log("Logged out");
        //
        // }


        this.get('session').open('firebase', {
                provider: provider,
                email: email || '',
                password: password || '',
              }).then(()=>{
                  // let session =  this.get('session');
                  // if (session.isAuthenticated){
                  //     console.log("Logged In");
                  // }
                  // else{
                  //     console.log("Logged out");
                  //
                  // }

                  console.log("Logged IN woot woot woot woot woot");
              }, (error) => {
                console.log(error);
              });



        // session.authenticate('authenticator:firebase', {
        //        'email': email,
        //        'password': password
        //    }).then(function() {
        //
        //         this.transitionTo('protected');
        //
        //    }.bind(this));
      }
  }
});
