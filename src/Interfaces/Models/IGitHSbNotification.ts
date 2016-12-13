///<reference path="./IGithubRepository.ts" />

interface IGitHubNotification
{
  id: number;

  reason: string;

  unread: boolean;

  updatedAt: string;

  lastReadAt: string;

  url: string;

  repository: IGithubRepository;
};

interface IGitHubNotificationSubject
{
  title: string;

  url: string;

  latestCommentUrl: string;

  type: string;
};