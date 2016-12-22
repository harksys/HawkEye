///<reference path="../Models/IGitHubNotification.ts" />

interface IStateNotifications
{
  [accountId: string]: IStateNotificationsAccountsNotifications;
};

interface IStateNotificationsAccountsNotifications
{
  [notificationId: string]: IGitHubNotification;
};