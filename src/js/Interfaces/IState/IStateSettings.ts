
interface IStateSettings
{
  pollPeriod: string;

  soundSettings: IStateSettingsSound;

  accountSettings: IStateSettingsAccountSettings;

  notifications: IStateSettingsNotification;
};

interface IStateSettingsAccountSettings
{
  [accountId: string]: IStateSettingsAccountSettingsItem;
};

interface IStateSettingsAccountSettingsItem
{

};

interface IStateSettingsSound
{
  newItemsEnabled: boolean;

  alertSuccessEnabled: boolean;

  alertErrorEnabled: boolean;
};

interface IStateSettingsNotification
{
  doubleClickAction: string;

  confirmBeforeMarkingMultipleAsRead: boolean;
};