import { gitHubScopes } from 'Constants/Services/GitHub';

const config: IHawkEyeConfig = {
  github : {
    clientId     : '',
    clientSecret : '',
    scopes       : [
      gitHubScopes.notifications
    ]
  }
};

export default config;