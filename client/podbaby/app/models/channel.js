import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  link: DS.attr('string'),
  rssFeed: DS.attr('string'),
  explicit: DS.attr('boolean'),
  copyright: DS.attr('string'),
  creativeCommons: DS.attr('string'),
  thumbnail: DS.attr(),
  categories: DS.hasMany('category'),
});
