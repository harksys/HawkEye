
interface IGitHubActivity
{
  getNotifications(token: string,
                   page?: number,
                   all?: boolean,
                   participating?: boolean,
                   since?: string,
                   before?: string): Promise<any[]>;
};