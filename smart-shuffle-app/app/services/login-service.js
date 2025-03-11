import Service from '@ember/service';
import fetch from 'fetch';

export default class LoginService extends Service {
  async login(username, password) {
    try {
      let response = await fetch(
        "http://localhost:5155/Login/LoginAccount?" +
        `username=${username}&` +
        `password=${password}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      return true;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async createAccount(code, state, error) {
    try {
      let response = await fetch(
        "http://localhost:5155/Login/CreateAccount?" +
        `username=${username}&` +
        `password=${password}`
      );
    }
    catch (error) {
      console.error('Error creating account: ', error);
    }
  }
}
