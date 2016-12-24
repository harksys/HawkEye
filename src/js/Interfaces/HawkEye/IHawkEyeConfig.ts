
interface IHawkEyeConfig
{
  github: IHawkEyeConfigGitHub;

  appAlerts: IHawkEyeConfigAppAlerts;
};

interface IHawkEyeConfigGitHub
{
  clientId: string;

  clientSecret: string;

  scopes: string[];

  webUrl: string;
};

interface IHawkEyeConfigAppAlerts
{
  showFor: number;
};