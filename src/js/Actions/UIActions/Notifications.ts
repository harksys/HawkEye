import { notificationDoubleClickActions } from 'Constants/Models/Settings';

import {
  getElectron,
  openExternalUrl,
  getCurrentWindow,
  copyStringToClipboard
} from 'Helpers/System/Electron';
import { getNotificationWebUrl } from 'Helpers/Services/GitHub';
import {
  getNotificationDoubleClickAction,
  shouldConfirmBeforeMarkingNotificationsAsRead
} from 'Helpers/Models/Settings';
import { markNotificationsAsRead } from 'Helpers/Models/GitHubNotification';

import { clearFilters } from 'Actions/NotificationFilters';

/**
 * @param  {number} accountId
 * @param  {IGitHubNotification} notification
 */
export function doubleClickNotification(accountId: number, notification: IGitHubNotification)
{
  return dispatch =>
  {
    let action = getNotificationDoubleClickAction();
    if (action === notificationDoubleClickActions.nothing) {
      return;
    }

    let url = getNotificationWebUrl(notification);
    if (action === notificationDoubleClickActions.copyLink) {
      copyStringToClipboard(url);
      return;
    }

    openExternalUrl(url);
  };
};

/**
 * @param  {number} accountId
 * @param  {IGitHubNotification[]} notifications
 */
export function markMultipleNotificationsAsRead(accountId: number, notifications: IGitHubNotification[])
{
  return dispatch =>
  {
    /*
     * If we shouldn't confirm, then just go ahead and clear notificatins
     */
    if (!shouldConfirmBeforeMarkingNotificationsAsRead()) {
      dispatch(clearFilters(accountId));
      markNotificationsAsRead(accountId, notifications);
      return;
    }

    /*
     * Ask the user whether we should really go through with this
     */
    getElectron().remote.dialog.showMessageBox(getCurrentWindow(), {
      type    : 'question',
      title   : 'Mark all as read?',
      message : 'Are you sure you want to mark all these notifications as read?',
      buttons : [
        'Yes',
        'No'
      ]
    }, index =>
    {
      /*
       * Answered No, so don't!
       */
      if (index === 1) {
        return;
      }

      /*
       * Answered yes, so lets go ahead
       */
      dispatch(clearFilters(accountId));
      markNotificationsAsRead(accountId, notifications);
    });
  };
};