
interface IGitHubNotificationFilterSet
{
  subjectTypes: IGitHubNotificationFilterSetStringFilter[];

  reasonTypes: IGitHubNotificationFilterSetStringFilter[];

  repositories: IGitHubNotificationFilterSetRepository[];
};

interface IGitHubNotificationFilterSetStringFilter
{
  name: string;

  count: number;
};

interface IGitHubNotificationFilterSetRepository
{
  repository: IGitHubRepository;

  count: number;
};