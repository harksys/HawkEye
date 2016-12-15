///<reference path="./Interfaces/IGitHubAuthentication.ts" />

import * as QueryString from 'query-string';

class Authentication implements IGitHubAuthentication
{
  private requestFactory: IRequestFactory;

  constructor(requestFactory: IRequestFactory)
  {
    this.requestFactory = requestFactory;
  }

  generateOAuthURL(clientId: string, scopes: string[]): Promise<string>
  {
    return new Promise(resolve =>
    {
      let url = 'https://github.com/login/oauth/authorize?';
      let qs  = {
        client_id : clientId,
        scope     : scopes.join(' ')
      };

      resolve(url + QueryString.stringify(qs));
    });
  }
};

export default Authentication;