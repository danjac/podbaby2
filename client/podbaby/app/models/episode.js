import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr('string'),
  link: DS.attr('string'),
  description: DS.attr('string'),
  author: DS.attr('string'),
  subtitle: DS.attr('string'),
  summary: DS.attr('string'),
  creativeCommons: DS.attr('string'),
  published: DS.attr('date'),
  explicit: DS.attr('boolean'),
  duration: DS.attr('string'),

  enclosureUrl: DS.attr('string'),
  enclosureType: DS.attr('string'),
  enclosureLength: DS.attr('number'),

  channel: DS.belongsTo('channel'),

});
