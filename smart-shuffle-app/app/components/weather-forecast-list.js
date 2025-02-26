import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class WeatherForecastListComponent extends Component {
  @service router;

  @action
  refreshData() {
    this.router.refresh('application');
  }
}
