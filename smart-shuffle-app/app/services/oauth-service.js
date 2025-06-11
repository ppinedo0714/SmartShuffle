import Service from '@ember/service';
import fetch from 'fetch';

export default class OAuthService extends Service {
  async getAuthorizationCode() {
    try {
      let response = await fetch(
        'http://localhost:5155/Oauth/GetAuthorizationCode?' +
          `redirectUri=${window.location.origin}/oAuthLanding&` +
          'showDialog=true',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      window.location.replace(data.url);

      return true;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async getAuthorizationToken(code, state, error) {
    try {
      await fetch(
        'http://localhost:5155/Oauth/GetOAuthToken?' +
          `code=${code}&` +
          `state=${state}` +
          `error=${error}`,
      );
    } catch (error) {
      console.error('Error getting authorization token: ', error);
    }
  }
}
