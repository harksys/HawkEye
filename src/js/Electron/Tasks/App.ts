import { dispatch } from 'Helpers/State/Store';
import { pushAppAlert } from 'Actions/AppAlerts';
import { getElectron } from 'Helpers/System/Electron';
import { updateActions } from 'Constants/System/Electron';
import { createSuccessAppAlert } from 'Helpers/Models/AppAlert';

/**
 */
export function autoUpdateQuitAndInstall()
{
  getElectron()
    .ipcRenderer
    .send(updateActions.AU_QUIT_INSTALL);
};

export function registerUpdateAvailableHandler()
{
  getElectron()
    .ipcRenderer
    .on(updateActions.AU_UPDATE_AVAILABLE, () => dispatch(pushAppAlert(createSuccessAppAlert(
      'Update available. Click the refresh icon to quit and install',
      true, {
        stickyActionIcon   : 'sticky',
        stickyActionName   : updateActions.AU_QUIT_INSTALL,
        stickyActionParams : {}
      }
    ))));
};