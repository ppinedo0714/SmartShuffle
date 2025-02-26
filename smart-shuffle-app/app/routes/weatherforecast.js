import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class WeatherforecastRoute extends Route {
  @service weatherService;

  model() {
    return this.weatherService.getWeatherForecast();
  }

  @action
  refreshModel() {
    this.refresh();
  }
}
