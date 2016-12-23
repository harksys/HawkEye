import { getState } from 'Helpers/State/Store';

/**
 * @returns string
 */
export function getAccountIds(): string[]
{
  return Object.keys(getState<IState>().accounts);
};

/**
 * @param  {string} accountId
 * @returns string
 */
export function getAccountToken(accountId: string): string
{
  let account = getAccount(accountId);
  if (account === null) {
    return null;
  }

  return account.token;
};

/**
 * @param  {string} accountId
 * @returns IStateAccountsAccount
 */
export function getAccount(accountId: string): IStateAccountsAccount
{
  let accounts = getState<IState>().accounts;
  if (typeof accounts[accountId] === 'undefined') {
    return null;
  }

  return accounts[accountId];
};

/**
 * @param  {string} accountId
 * @returns boolean
 */
export function accountAlreadyAdded(accountId: string): boolean
{
  return getAccount(accountId) != null;
};