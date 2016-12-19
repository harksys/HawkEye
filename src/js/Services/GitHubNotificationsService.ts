///<reference path="./Interfaces/IGitHubNotificationsService.ts" />
///<reference path="../GitHub/Interfaces/IGitHub.ts" />

class GitHubNotificationsService implements IGitHubNotificationsService
{
  private gitHub: IGitHub;

  constructor(gitHub: IGitHub)
  {
    this.gitHub = gitHub;
  }

  /**
   * @param  {string} token
   * @param  {boolean} all?
   * @param  {boolean} participating?
   * @param  {string} since?
   * @param  {string} before?
   * @returns Promise
   */
  public getNotifications = (token: string,
                             all?: boolean,
                             participating?: boolean,
                             since?: string,
                             before?: string): Promise<any[]> =>
  {
    return new Promise((resolve, reject) =>
    {
      this.gitHub
          .activity
          .getNotifications(token, all, participating, since, before)
          .then(res => resolve(res),
                err => reject(err));
    });
  };
};

export default GitHubNotificationsService;