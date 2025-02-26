import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @tracked username = '';
  @tracked password = '';
  @tracked errorMessage = '';
  @tracked successMessage = '';

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

    if (this.username === 'admin' && this.password === 'password') {
      this.successMessage = 'Login successful!';
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}