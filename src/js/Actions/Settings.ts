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