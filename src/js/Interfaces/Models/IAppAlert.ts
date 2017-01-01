
interface IAppAlert
{
  id: string;

  index: number;

  status: string;

  message: string;

  show: boolean;

  sticky: boolean;

  stickyActionIcon?: string;

  stickyActionName?: string;

  stickyActionParams?: any;
};