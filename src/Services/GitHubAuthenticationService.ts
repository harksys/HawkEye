///<reference path="./Interfaces/IGitHubAuthenticationService.ts" />
///<reference path="../GitHub/Interfaces/IGitHub.ts" />

import {
  getGitHubScopes,
  getGitHubClientId,
  getGitHubClientSecret
} from 'Helpers/Services/GitHub';

class GitHubAuthenticationService implements IGitHubAuthenticationService
{
  private gitHub: IGitHub;

  constructor(gitHub: IGitHub)
  {
    this.gitHub = gitHub;
  }

  /**
   * @returns Promise
   */
  public generateOAuthUrl = (): Promise<string> =>
  {
    return this.gitHub
               .authentication
               .generateOAuthUrl(getGitHubClientId(), getGitHubScopes());

  }

  /**
   * @param  {string} code
   * @returns Promise
   */
  public authenticateAccessToken = (code: string): Promise<string> =>
  {
    return new Promise((resolve, reject) =>
    {
      this.gitHub
          .authentication
          .authenticateAccessToken(getGitHubClientId(), getGitHubClientSecret(), code)
          .then(res => resolve(res),
                err => reject(err));
    });
  };

  /**
   * @param  {string} token
   * @returns Promise
   */
  public getAuthenticatedUser = (token: string): Promise<any> =>
  {
    return new Promise((resolve, reject) =>
    {
      this.gitHub
          .users
          .getAuthenticatedUser(token)
          .then(res => resolve(res),
                err => reject(err));
    });
  }
};

export default GitHubAuthenticationService;