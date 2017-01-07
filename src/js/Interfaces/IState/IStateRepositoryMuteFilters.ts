
interface IStateRepositoryMuteFilters
{
  [accountId: string]: IStateRepositoryMuteFiltersAccount;
};

interface IStateRepositoryMuteFiltersAccount
{
  [repoId: string]: IStateRepositoryMuteFiltersAccountRepo;
};

interface IStateRepositoryMuteFiltersAccountRepo
{
  allowedSubjectTypes: string[];

  allowReasons: string[];
};