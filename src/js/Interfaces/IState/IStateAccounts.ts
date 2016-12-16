///<reference path="../Models/IGitHubUser.ts" />

interface IStateAccounts
{
  [accountId: string]: IStateAccountsAccount;
};

interface IStateAccountsAccount
{
  token: string;

  gitHubUser: IGitHubUser;
};