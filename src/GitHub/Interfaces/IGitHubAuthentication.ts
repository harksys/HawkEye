
interface IGitHubAuthentication
{
  generateOAuthURL(clientId: string, scopes: string[]): Promise<string>;
};