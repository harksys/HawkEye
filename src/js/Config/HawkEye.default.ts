import { gitHubScopes } from 'Constants/Services/GitHub';

const config: IHawkEyeConfig = {
  github    : {
    clientId     : '',
    clientSecret : '',
    scopes       : [
      gitHubScopes.notifications
    ]
  },
  appAlerts : {
    showFor : 4000
  }
};

export default config;