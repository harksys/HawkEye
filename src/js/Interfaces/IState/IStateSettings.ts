
interface IStateSettings
{
  pollPeriod: string;

  soundSettings: IStateSettingsSound;

  accountSettings: IStateSettingsAccountSettings;
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