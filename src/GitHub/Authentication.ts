///<reference path="./Interfaces/IGitHubAuthentication.ts" />

import * as QueryString from 'query-string';

class Authentication implements IGitHubAuthentication
{
  private requestFactory: IRequestFactory;

  constructor(requestFactory: IRequestFactory)
  {
    this.requestFactory = requestFactory;
  }

  /**
   * @param  {string} clientId
   * @param  {string[]} scopes
   * @returns Promise
   */
  public generateOAuthUrl = (clientId: string, scopes: string[]): Promise<string> =>
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

  /**
   * @param  {string} clientId
   * @param  {string} clientSecret
   * @param  {string} code
   * @returns Promise
   */
  public authenticateAccessToken = (clientId: string, clientSecret: string, code: string): Promise<string> =>
  {
    return new Promise((resolve, reject) =>
    {
      let body = {
        client_id     : clientId,
        client_secret : clientSecret,
        code
      };

      // @todo: Host set :/ Extract?
      this.requestFactory
          .newRequest()
          .setHost('https://github.com')
          .setUrl('/login/oauth/access_token')
          .setMethod('post')
          .setBody(body)
          .sendAsJson()
          .execute()
          .then(r => r.json())
          .then(res =>
          {
            // @todo: IMPROVE THIS ERROR HANDLING.
            if (typeof res.access_token === 'undefined') {
              reject(null);
            }

            resolve(res.access_token);
          }, err => reject(null));
    });
  }
};

export default Authentication;