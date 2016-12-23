
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
  newItems: boolean;

  alertSuccess: boolean;

  alertError: boolean;
};