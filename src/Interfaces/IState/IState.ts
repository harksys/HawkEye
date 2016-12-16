///<reference path="./IStateApp.ts" />
///<reference path="./IStateAccounts.ts" />
///<reference path="./IStateNotifications.ts" />
///<reference path="./IStateSettings.ts" />
///<reference path="./IStateAuthentication.ts" />

interface IState
{
  app: IStateApp;

  accounts: IStateAccounts;

  notifications: IStateNotifications;

  settings: IStateSettings;

  authentication: IStateAuthentication;
};