import { module, test } from 'qunit';
import { setupTest } from 'smart-shuffle-app/tests/helpers';

module('Unit | Route | oAuthLanding', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:o-auth-landing');
    assert.ok(route);
  });
});
