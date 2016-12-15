
interface IGitHubAuthenticationService
{
  generateOAuthUrl(): Promise<string>;
};