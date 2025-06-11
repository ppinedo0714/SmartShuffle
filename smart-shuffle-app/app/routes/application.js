import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service sessionService;

  beforeModel() {
    this.sessionService.restore();
  }
}