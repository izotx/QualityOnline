import DS from 'ember-data';

export default DS.Model.extend({
   name: DS.attr('string'),
   faculty:DS.hasMany('faculty'),
   college: DS.belongsTo('college')

});
