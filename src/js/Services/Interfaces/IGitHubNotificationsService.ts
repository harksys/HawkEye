
interface IGitHubNotificationsService
{
  getNotifications(token: string,
                   page?: number,
                   all?: boolean,
                   participating?: boolean,
                   since?: string,
                   before?: string): Promise<any[]>;

  getAllNotificationsSince(token: string, since: string, all?: boolean): Promise<any[]>;

  getAllNotificationsBefore(token: string, before: string, all?: boolean): Promise<any[]>;

  markNotificationAsThread(token: string, threadId: string): Promise<any>;
};