///<reference path="./IGithubRepository.ts" />

interface IGithubNotification
{
  id: number;

  reason: string;

  unread: boolean;

  updatedAt: string;

  lastReadAt: string;

  url: string;

  repository: IGithubRepository;
};

interface IGithubNotificationSubject
{
  title: string;

  url: string;

  latestCommentUrl: string;

  type: string;
};