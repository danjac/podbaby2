import Ember from 'ember';

const {
  service
} = Ember.inject;

export default Ember.Controller.extend({
  queryParams: ['page'],
  page: 1,
  player: service('player'),
});
