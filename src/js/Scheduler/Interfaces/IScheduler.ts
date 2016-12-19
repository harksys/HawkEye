
interface IScheduler
{
  scheduleJob(time: string, parameters: any, method: () => {}): string;

  getJobParameters(name: string): any;

  cancelJob(name: string);

  clearAllJobs();
};