import DS from 'ember-data';

export default DS.Model.extend({
  profile_image:DS.attr('string'),
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  salutation: DS.attr('string'),
  email: DS.attr('string'),
  department: DS.belongsTo('department'),
  reviews: DS.hasMany('review'),
  training: DS.hasMany('training'),
  wid:DS.attr('string')
});
