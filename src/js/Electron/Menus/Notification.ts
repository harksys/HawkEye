import {
  openExternalUrl,
  copyStringToClipboard,
  getNewRemoteElectronMenu,
  getNewRemoteElectronMenuItem
} from 'Helpers/System/Electron';
import {
  getNotificationWebUrl,
  getNotificationSubjectPrettyName
} from 'Helpers/Services/GitHub';
import { dispatch } from 'Helpers/State/Store';

import { handleMarkNotificationAsRead } from 'Actions/Notifications';

/**
 * @param  {string} accountId
 * @param  {IGitHubNotification} notification
 */
export default function createMenu(accountId: string, notification: IGitHubNotification)
{
  let menu              = getNewRemoteElectronMenu();
  let subjectPrettyName = getNotificationSubjectPrettyName(notification.subject.type);

  /*
   * Open In Browser
   */
  menu.append(getNewRemoteElectronMenuItem({
    label : 'Open in Browser',
    click : () => openExternalUrl(getNotificationWebUrl(notification))
  }));

  /*
   * Copy X Link
   */
  menu.append(getNewRemoteElectronMenuItem({
    label : 'Copy ' + subjectPrettyName + ' Link',
    click : () => copyStringToClipboard(getNotificationWebUrl(notification))
  }));

  /*
   * Copy X Title
   */
  menu.append(getNewRemoteElectronMenuItem({
    label : 'Copy ' + subjectPrettyName + ' Title',
    click : () => copyStringToClipboard(notification.subject.title)
  }));

  /*
   * Separate!
   */
  menu.append(getNewRemoteElectronMenuItem({
    type : 'separator'
  }));

  /*
   * Mark Notification as Read
   */
  menu.append(getNewRemoteElectronMenuItem({
    label : 'Mark as Read',
    click : () => dispatch(handleMarkNotificationAsRead(accountId, notification.id.toString()))
  }))

  return menu;
};