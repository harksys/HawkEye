import InstanceCache from 'Core/InstanceCache';
import ActionConstants from 'Constants/Actions/Index';

import { getLast } from 'Helpers/Lang/Array';
import { sortingMethods } from 'Helpers/Lang/Sort';
import { formatDateAsUTC } from 'Helpers/Lang/Date';
import { makeGitHubNotification } from 'Helpers/Models/GitHubNotification';

import {
  setLastPoll,
  setIsPolling
} from 'Actions/App';

/**
 * @param  {any[]} notifications
 */
export function ingestNotifications(accountId: string, notifications: any[], updatedLastPoll: boolean = false)
{
  return dispatch =>
  {
    let madeNotifications = notifications.map(makeGitHubNotification)
                                         .filter(n => n !== null
                                                        && n.repository !== null);

    if (madeNotifications.length === 0) {
      return;
    }

    madeNotifications.forEach(n => dispatch(ingestNotification(accountId, n)));
    if (!updatedLastPoll) {
      return;
    }

    /*
     * Sort the notifications, and get the last item.
     * Then set the lastPoll date to the updatedAt of the item.
     */
    let sortedNotifications = madeNotifications.sort(sortingMethods.dateAsc('updatedAt'));
    let lastNotification    =  getLast<IGitHubNotification>(sortedNotifications);

    dispatch(setLastPoll(formatDateAsUTC(lastNotification.updatedAt)));
  };
};

/**
 * @param  {IGitHubNotification} notification
 */
export function ingestNotification(accountId:string, notification: IGitHubNotification)
{
  return {
    type         : ActionConstants.notifications.INGEST_NOTIFICATION,
    accountId,
    notification
  };
};

/**
 * @param  {string} token
 * @param  {string} since
 * @param  {boolean=false} all
 */
export function pollSinceNotifications(accountId: string, token: string, since: string, all: boolean = false)
{
  let service = InstanceCache.getInstance<IGitHubNotificationsService>('IGitHubNotificationsService');

  return dispatch =>
  {
    dispatch(setIsPolling(true));
    service.getAllNotificationsSince(token, since, all)
           .then(notifications =>
           {
             dispatch(ingestNotifications(accountId, notifications, true));
             dispatch(setIsPolling(false));
           });
  };
};

/**
 * @param  {string} token
 * @param  {string} before
 * @param  {boolean=false} all
 */
export function pollBeforeNotifications(accountId: string, token: string, before: string, all: boolean = false)
{
  let service = InstanceCache.getInstance<IGitHubNotificationsService>('IGitHubNotificationsService');

  return dispatch =>
  {
    dispatch(setIsPolling(true));
    service.getAllNotificationsBefore(token, before, all)
           .then(notifications =>
           {
             dispatch(ingestNotifications(accountId, notifications));
             dispatch(setIsPolling(false));
           });
  };
};