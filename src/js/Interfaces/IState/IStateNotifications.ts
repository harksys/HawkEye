///<reference path="../Models/IGitHubNotification.ts" />

interface IStateNotifications
{
  [accountId: string]: IStateNotificationsAccount;
};

interface IStateNotificationsAccount
{
  [repoId: string]: IStateNotificationsAccountRepo;
};

interface IStateNotificationsAccountRepo
{
  [notificationId: string]: IGitHubNotification;
};