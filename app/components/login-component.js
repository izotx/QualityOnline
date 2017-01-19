import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  firebase: Ember.inject.service(),
  message:"",
  actions:{
      logout(){
        let session = this.get('session')
        session.close();
        console.log(session);
      },

      login(provider){
        let email = this.get('email');
        let password =  this.get('password');
      ///  let message =  this.get('message');

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

      //  console.log(this.get('session'));


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

                  this.set('message',"Logged In");// erro
                  console.log("Logged IN woot woot woot woot woot");
              }, (error) => {
                console.log(error);
                  this.set('message', error);// error

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
