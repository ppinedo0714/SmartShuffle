import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @tracked isAuthenticated = false;
  @tracked token = null;
  
  login(token) {
    this.token = token;
    this.isAuthenticated = true;

    window.localStorage.setItem('authToken', token);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;

    window.localStorage.removeItem('authToken');
  }

  // To restore session on reload
  restore() {
    let token = window.localStorage.getItem('authToken');

    if (token) {
      this.token = token;
      this.isAuthenticated = true;
    }
  }
}