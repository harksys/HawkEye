///<reference path="./IStateApp.ts" />
///<reference path="./IStateAccounts.ts" />
///<reference path="./IStateNotifications.ts" />
///<reference path="./IStateSettings.ts" />
///<reference path="./IStateAuthentication.ts" />
///<reference path="./IStateAppAlerts.ts" />

interface IState
{
  app: IStateApp;

  accounts: IStateAccounts;

  appAlerts: IStateAppAlerts;

  notifications: IStateNotifications;

  settings: IStateSettings;

  authentication: IStateAuthentication;
};