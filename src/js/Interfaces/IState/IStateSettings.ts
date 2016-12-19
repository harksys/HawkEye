
interface IStateSettings
{
  pollPeriod: string;

  accountSettings: IStateSettingsAccountSettings;
};

interface IStateSettingsAccountSettings
{
  [accountId: string]: IStateSettingsAccountSettingsItem;
};

interface IStateSettingsAccountSettingsItem
{

};