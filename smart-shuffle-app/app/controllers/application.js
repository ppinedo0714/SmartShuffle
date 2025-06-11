import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @tracked showNav = false;

  @service sessionService;

  @action
  toggleNav() {
    this.showNav = !this.showNav;
  }

  get isSessionActive() {
    return this.sessionService.isAuthenticated;
  }

  @action
  logout() {
    this.sessionService.logout();

    this.toggleNav();
  }
}
