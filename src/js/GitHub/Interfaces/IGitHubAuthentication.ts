
interface IGitHubAuthentication
{
  generateOAuthUrl(clientId: string, scopes: string[]): Promise<string>;

  authenticateAccessToken(clientId: string, clientSecret: string, code: string): Promise<string>;
};