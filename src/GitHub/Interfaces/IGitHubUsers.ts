
interface IGitHubUsers
{
  getAuthenticatedUser(token: string): Promise<any>;
};