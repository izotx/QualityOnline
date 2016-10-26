import DS from 'ember-data';

export default DS.Model.extend({
  faculty: DS.belongsTo('faculty'),
  courseName:DS.attr('string'),
  internalDate:DS.attr("date"),
  externalDate:DS.attr("date"),
  funDate:DS.attr("date"),
  recertificationDate:DS.attr("date")
});
