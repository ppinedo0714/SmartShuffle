import Service from '@ember/service';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class LoginService extends Service {
  @service sessionService;

  async login(username, password) {
    try {
      let response = await fetch(
        'http://localhost:5155/Login/LoginAccount?' +
          `username=${username}&` +
          `password=${password}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      this.sessionService.login(data.token);

      return true;
    } catch (error) {
      throw new Error('Error fetching data:', error);
    }
  }

  async createAccount(username, password) {
    try {
      let response = await fetch(
        'http://localhost:5155/Login/CreateAccount?' +
          `username=${username}&` +
          `password=${password}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      return data.isNewUser;
    } catch (error) {
      console.error('Error creating account: ', error);
    }
  }
}
