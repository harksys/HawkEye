import HawkEyeConfig from 'Config/HawkEye';

/**
 * @returns string
 */
export function getGitHubClientId(): string
{
  return HawkEyeConfig.github.clientId;
};

/**
 * @returns string
 */
export function getGitHubClientSecret(): string
{
  return HawkEyeConfig.github.clientSecret;
};

/**
 * @returns string
 */
export function getGitHubScopes(): string[]
{
  return HawkEyeConfig.github.scopes;
};