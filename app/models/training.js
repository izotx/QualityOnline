import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  faculty: DS.belongsTo('faculty'),
  date:DS.attr("date")
});
