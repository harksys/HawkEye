///<reference path="./Interfaces/IGitHubNotificationsService.ts" />
///<reference path="../GitHub/Interfaces/IGitHub.ts" />

import * as Async from 'async';
import * as concat from 'lodash/concat';

class GitHubNotificationsService implements IGitHubNotificationsService
{
  private gitHub: IGitHub;

  constructor(gitHub: IGitHub)
  {
    this.gitHub = gitHub;
  }

  /**
   * @param  {string} token
   * @param  {string} threadId
   * @returns Promise
   */
  public markNotificationAsThread = (token: string, threadId: string): Promise<any> =>
  {
    return this.gitHub.activity.markThreadAsRead(token, threadId);
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
                             page: number = 1,
                             all?: boolean,
                             participating?: boolean,
                             since?: string,
                             before?: string): Promise<any[]> =>
  {
    return new Promise((resolve, reject) =>
    {
      this.gitHub
          .activity
          .getNotifications(token, page, all, participating, since, before)
          .then(res => resolve(res),
                err => reject(err));
    });
  };

  /**
   * @param  {string} token
   * @param  {string} since
   * @param  {boolean=true} all
   * @returns Promise
   */
  public getAllNotificationsSince = (token: string,
                                     since: string,
                                     all: boolean = true): Promise<any[]> =>
  {
    return this.recursiveGetNotifications(token, all, since);
  }

  /**
   * @param  {string} token
   * @param  {string} before
   * @param  {boolean=true} all
   * @returns Promise
   */
  public getAllNotificationsBefore = (token: string,
                                      before: string,
                                      all: boolean = true): Promise<any[]> =>
  {
    return this.recursiveGetNotifications(token, all, undefined, before);
  };

  /**
   * @param  {string} token
   * @param  {boolean=false} all
   * @param  {string} since?
   * @param  {string} before?
   * @returns Promise
   */
  private recursiveGetNotifications = (token: string,
                                       all: boolean = false,
                                       since?: string,
                                       before?: string): Promise<any[]> =>
  {
    /*
     * This method is private because it should
     * never see the light of day.
     * However it does work, and it'll help.
     */
    return new Promise(resolve =>
    {
      let notifications = [];
      let currentPage   = 1;
      let keepPolling   = true;

      Async.doWhilst(cb =>
      {
        this.getNotifications(token, currentPage, false, false, since, before)
            .then(res =>
            {
              /*
               * If the request fails, then cancel and callback.
               */
              if (!Array.isArray(res)) {
                keepPolling = false;
                cb();
                return;
              }

              /*
               * Apply the new notifications.
               * As we get 50 at a time, if we get only
               * 49 then we get to the end of the requests we
               * need to make. So stop here.
               */
              notifications = concat(notifications, res);
              if (res.length <= 49) {
                keepPolling = false;
                cb();
                return;
              }

              /*
               * If we get here, theres more requests to make.
               * So carry on, to the next page!
               */
              currentPage = currentPage + 1;
              cb();
            });
      }, () => keepPolling === true, () =>
      {
        // Return the total notifications!
        resolve(notifications);
      });
    });
  }
};

export default GitHubNotificationsService;