import InstanceCache from 'Core/InstanceCache';
import ActionConstants from 'Constants/Actions/Index';
import { soundClipPaths } from 'Constants/Resources/Sound';

import { pushAppAlert } from 'Actions/AppAlerts';

import {
  createErrorAppAlert,
  createSuccessAppAlert
} from 'Helpers/Models/AppAlert';
import { getLast } from 'Helpers/Lang/Array';
import { playSound } from 'Helpers/Lang/Audio';
import { sortingMethods } from 'Helpers/Lang/Sort';
import { formatDateAsUTC } from 'Helpers/Lang/Date';
import { getAccountToken } from 'Helpers/Models/Accounts';
import { newItemsSoundIsEnabled } from 'Helpers/Models/Settings';
import { makeGitHubNotification } from 'Helpers/Models/GitHubNotification';

import {
  setLastPoll,
  setIsPolling
} from 'Actions/App';

export function removeAccountsNotifications(accountId: string)
{
  return {
    type      : ActionConstants.notifications.REMOVE_ACCOUNT_NOTIFICATIONS,
    accountId
  };
};

export function markNotificationAsRead(accountId: string, notificationId: string)
{
  return {
    type           : ActionConstants.notifications.MARK_NOTIFICATION_AS_READ,
    accountId,
    notificationId
  };
};

/**
 * @param  {any[]} notifications
 */
export function ingestNotifications(accountId: string, notifications: any[], updatedLastPoll: boolean = false)
{
  return dispatch =>
  {
    /*
     * Make Notifications from the input,
     * and fitler out. If theres none left,
     * then do nothing.
     */
    let madeNotifications = notifications.map(makeGitHubNotification)
                                         .filter(n => n !== null);
    if (madeNotifications.length === 0) {
      return;
    }

    /*
     * If new items sound is enabled, lets play.
     */
    if (newItemsSoundIsEnabled()) {
      playSound(soundClipPaths.harkNewItems);
    }

    /*
     * Ingest the notifications in to our state
     * @todo: Bulk this?
     */
    dispatch(ingestMultipleNotifications(accountId, madeNotifications));
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
export function ingestNotification(accountId: string, notification: IGitHubNotification)
{
  return {
    type         : ActionConstants.notifications.INGEST_NOTIFICATION,
    accountId,
    notification
  };
};

export function ingestMultipleNotifications(accountId: string, notifications: IGitHubNotification[])
{
  return {
    type          : ActionConstants.notifications.INGEST_NOTIFICATIONS,
    accountId,
    notifications
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
           }, err => dispatch(setIsPolling(false)));
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
           }, err => dispatch(setIsPolling(false)));
  };
};

/**
 * @param  {string} accountId
 * @param  {string} threadId
 */
export function handleMarkNotificationAsRead(accountId: string, threadId: string)
{
  let service = InstanceCache.getInstance<IGitHubNotificationsService>('IGitHubNotificationsService');

  return dispatch =>
  {
    service
      .markNotificationAsThread(getAccountToken(accountId), threadId)
      .then(res =>
      {
        dispatch(markNotificationAsRead(accountId, threadId));
        dispatch(pushAppAlert(createSuccessAppAlert(
          'Notification marked as read'
        )));
      }, err => dispatch(pushAppAlert(createErrorAppAlert(
                  'Issue marking notification as read'
                ))));
  };
};