
interface IGitHubAuthenticationService
{
  generateOAuthUrl(): Promise<string>;

  authenticateAccessToken(code: string): Promise<string>;
};