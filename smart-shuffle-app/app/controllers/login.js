import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @tracked username = '';
  @tracked password = '';
  @tracked errorMessage = '';
  @tracked successMessage = '';

  @service oauthService;
  @service loginService;

  @action
  updateUsername(event) {
    this.username = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }

  @action
  handleLogin(event) {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    this.loginService.login(this.username, this.password);
    this.oauthService.getAuthorizationCode();

    if (this.username === 'admin' && this.password === 'password') {
      this.successMessage = 'Login successful!';
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}
