
interface IGitHubNotificationsService
{
  getNotifications(token: string,
                   all?: boolean,
                   participating?: boolean,
                   since?: string,
                   before?: string): Promise<any[]>;
};