import ActionConstants from 'Constants/Actions/Index';

/**
 * @param  {string} period
 */
export function updatePollPeriod(period: string)
{
  return dispatch => dispatch(updateSettingsValue('pollPeriod', period));
};

/**
 * @param  {string} key
 * @param  {any} value
 */
export function updateSettingsValue(key: string, value: any)
{
  return {
    type  : ActionConstants.settings.SET_SETTINGS_VALUE,
    key,
    value
  };
};

/**
 * @param  {boolean} enabled
 */
export function setNewItemsEnabled(enabled: boolean)
{
  return updateSoundSettingsEnabled('newItemsEnabled', enabled);
};

/**
 * @param  {boolean} enabled
 */
export function setAlertSuccessEnabled(enabled: boolean)
{
  return updateSoundSettingsEnabled('alertSuccessEnabled', enabled);
};

/**
 * @param  {boolean} enabled
 */
export function setAlertErrorEnabled(enabled: boolean)
{
  return updateSoundSettingsEnabled('alertErrorEnabled', enabled);
};


/**
 * @param  {string} key
 * @param  {boolean} enabled
 */
export function updateSoundSettingsEnabled(key: string, enabled: boolean)
{
  return {
    type    : ActionConstants.settings.SET_SOUND_SETTINGS_ENABLED,
    key,
    enabled
  };
};

export function setNotificationDoubleClickAction(action: string)
{
  return {
    type   : ActionConstants.settings.SET_NOTIFICATIONS_DOUBLE_CLICK_ACTION,
    action
  };
};