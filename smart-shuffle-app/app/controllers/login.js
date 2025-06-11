import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service loginService;
  @service router;

  @tracked username = '';
  @tracked password = '';
  @tracked error = '';
  @tracked isCreatingAccount = false;

  @action
  toggleCreateAccount() {
    this.isCreatingAccount = !this.isCreatingAccount;
    this.error = '';
    this.username = '';
    this.password = '';
  }

  @action
  async submitForm(event) {
    event.preventDefault();

    let response;

    if (!this.isCreatingAccount) {
      response = await this.loginService.login(this.username, this.password);
    } else {
      response = await this.loginService.createAccount(
        this.username,
        this.password,
      );
    }

    // Success
    if (response) {
      this.router.transitionTo('index');
    }
    // Failure
    else {
      this.error = 'Failed to log in or create account';
    }
  }
}
