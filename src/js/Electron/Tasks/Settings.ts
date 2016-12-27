import { replace } from 'react-router-redux';

import { dispatch } from 'Helpers/State/Store';
import { getElectron } from 'Helpers/System/Electron';

const PreferencesTask = 'Preferences';

export function registerPreferencesMenuControl()
{
  getElectron()
    .ipcRenderer
    .on(PreferencesTask, () => dispatch(replace('/settings')));
};