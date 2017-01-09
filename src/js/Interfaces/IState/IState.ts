///<reference path="./IStateApp.ts" />
///<reference path="./IStateSetup.ts" />
///<reference path="./IStateAccounts.ts" />
///<reference path="./IStateSettings.ts" />
///<reference path="./IStateAppAlerts.ts" />
///<reference path="./IStateRepositories.ts" />
///<reference path="./IStateNotifications.ts" />
///<reference path="./IStateAuthentication.ts" />
///<reference path="./IStateNotificationFilters.ts" />
///<reference path="./IStateRepositoryMuteFilters.ts" />

interface IState
{
  app: IStateApp;

  setup: IStateSetup;

  accounts: IStateAccounts;

  settings: IStateSettings;

  appAlerts: IStateAppAlerts;

  repositories: IStateRepositories;

  notifications: IStateNotifications;

  authentication: IStateAuthentication;

  notificationFilters: IStateNotificationFilters;

  repositoryMuteFilters: IStateRepositoryMuteFilters;
};