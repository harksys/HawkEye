
interface IScheduler
{
  scheduleJob(time: string, parameters: any, method: () => any): string;

  getJobParameters(name: string): any;

  cancelJob(name: string);

  clearAllJobs();
};