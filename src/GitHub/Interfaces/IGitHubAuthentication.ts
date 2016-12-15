
interface IGitHubAuthentication
{
  generateOAuthUrl(clientId: string, scopes: string[]): Promise<string>;
};