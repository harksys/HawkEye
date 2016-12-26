import { notificationDoubleClickActions } from 'Constants/Models/Settings';

import {
  openExternalUrl,
  copyStringToClipboard
} from 'Helpers/System/Electron';
import { getNotificationWebUrl } from 'Helpers/Services/GitHub';
import { getNotificationDoubleClickAction } from 'Helpers/Models/Settings';

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