import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
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

    const endpoint = this.isCreatingAccount ? '/api/signup' : '/api/login';
    const body = {
      username: this.username,
      password: this.password
    };

    try {
      let response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });

      let data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication error');
      }
      // Save token, set session, redirect, etc.
      // For now, just redirect to home:
      this.transitionTo('index');
    } catch (e) {
      this.error = e.message;
    }
  }
}
