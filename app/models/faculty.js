import DS from 'ember-data';

export default DS.Model.extend({
  fistname: DS.attr('string'),
  lastname: DS.attr('string'),
  email: DS.attr('string'),
  department: DS.belongsTo('department'),
  reviews: DS.hasMany('review'),
  training: DS.hasMany('training')
});
