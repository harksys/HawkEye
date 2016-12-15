///<reference path="../Models/IGitHubUser.ts" />

interface IStateAccounts
{
  [accountId: string]: IStateAccountsAccount;
};

interface IStateAccountsAccount
{
  gitHubToken: string;

  gitHubUser: IGitHubUser;
};