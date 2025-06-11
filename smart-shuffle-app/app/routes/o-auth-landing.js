import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OAuthLandingRoute extends Route {
  @service router;

  queryParams = {
    code: {
      refreshModel: true,
    },
    state: {
      refreshModel: true,
    },
    error: {
      refreshModel: true,
    },
  };

  model(params) {
    return params;
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    const { code, state, error } = model;

    if (code) {
      controller
        .processOAuthCallback(code, state, error)
        .then(() => {
          this.router.transitionTo('index');
        })
        .catch((error) => {
          console.error('Authentication callback failed:', error);
          this.router.transitionTo('login');
        });
    } else {
      console.error('No code parameter found');
      this.router.transitionTo('login');
    }
  }
}
