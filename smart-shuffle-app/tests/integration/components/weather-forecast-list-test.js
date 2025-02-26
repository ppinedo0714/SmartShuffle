import { module, test } from 'qunit';
import { setupRenderingTest } from 'smart-shuffle-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | weather-forecast-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<WeatherForecastList />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <WeatherForecastList>
        template block text
      </WeatherForecastList>
    `);

    assert.dom().hasText('template block text');
  });
});
