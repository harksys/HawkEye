
interface IHawkEyeConfig
{
  github: IHawkEyeConfigGitHub;
};

interface IHawkEyeConfigGitHub
{
  clientId: string;

  clientSecret: string;

  scopes: string[];
};