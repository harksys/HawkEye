
interface IStateSettings
{
  authentication: IStateSettingsAuthentication;

  accountSettings: IStateSettingsAccounts;
};

interface IStateSettingsAuthentication
{
  isAuthenticating: boolean;
};

interface IStateSettingsAccounts
{
  [accountId: string]: IStateSettingsAccountsSettingsItem;
};

interface IStateSettingsAccountsSettingsItem
{

};