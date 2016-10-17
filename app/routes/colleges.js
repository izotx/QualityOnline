import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return ['CAS', 'COPS', 'Albert Hofmann'];
  }
});
