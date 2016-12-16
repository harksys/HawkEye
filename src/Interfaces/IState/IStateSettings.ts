
interface IStateSettings
{
  accountSettings: IStateSettingsAccountSettings;
};

interface IStateSettingsAccountSettings
{
  [accountId: string]: IStateSettingsAccountSettingsItem;
};

interface IStateSettingsAccountSettingsItem
{

};