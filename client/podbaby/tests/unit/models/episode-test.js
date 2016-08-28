import { moduleForModel, test } from 'ember-qunit';

moduleForModel('episode', 'Unit | Model | episode', {
  // Specify the other units that are required for this test.
  needs: ['model:channel']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
