import { dispatch } from 'Helpers/State/Store';
import { getElectron } from 'Helpers/System/Electron';

import { markNotificationAsRead } from 'Actions/Notifications';

const MarkNotificationAsReadTask        = 'MarkNotificationRead';
const MarkNotificationAsReadSuccessTask = 'MarkNotificationReadSuccess';

/**
 * @param  {string} token
 * @param  {string} accountId
 * @param  {string[]} notificationIds
 */
export function markMultipleNotificationsAsRead(token: string,
                                                accountId: number,
                                                notificationIds: string[])
{
  let ipc = getElectron().ipcRenderer;

  notificationIds.forEach(id => ipc.send(MarkNotificationAsReadTask, [{
    token          : token,
    accountId      : accountId,
    notificationId : id,
  }]));
};

/**
 */
export function registerMarkNotificationAsReadSuccess()
{
  getElectron()
    .ipcRenderer
    .on(MarkNotificationAsReadSuccessTask, (e, args: { token: string;
                                                       accountId: string;
                                                       notificationId: string; }) =>
    {
      dispatch(markNotificationAsRead(args.accountId, args.notificationId));
    });
};