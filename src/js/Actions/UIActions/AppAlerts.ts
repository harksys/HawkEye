import { updateActions } from 'Constants/System/Electron';
import { autoUpdateQuitAndInstall } from 'Electron/Tasks/App';

/**
 * @param  {string} actionName
 * @param  {any={}} actionParams
 */
export function handleAppAlertActionClick(actionName: string, actionParams: any = {})
{
  return dispatch =>
  {
    if (actionName !== updateActions.AU_QUIT_INSTALL) {
      return;
    }

    autoUpdateQuitAndInstall();
  };
};