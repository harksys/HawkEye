///<reference path="./IGitHubRepository.ts" />

interface IGitHubNotification
{
  id: number;

  reason: string;

  unread: boolean;

  updatedAt: string;

  lastReadAt: string;

  url: string;

  repository: IGitHubRepository;

  subject: IGitHubNotificationSubject;
};

interface IGitHubNotificationSubject
{
  title: string;

  url: string;

  latestCommentUrl: string;

  type: string;
};