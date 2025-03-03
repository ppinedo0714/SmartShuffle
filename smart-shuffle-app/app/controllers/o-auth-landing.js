import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class OAuthLandingController extends Controller {
    @service oauthService;
    
    async processOAuthCallback(code, state, error) {
        try {
            this.oauthService.getAuthorizationToken(code, state, error);
        }
        catch (error) {
            console.error('Error getting authorization token: ', error);
        }
    }
}