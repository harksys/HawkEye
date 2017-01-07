
interface IStateRepositoryMuteFilters
{
  [accountId: number]: IStateRepositoryMuteFiltersAccount;
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