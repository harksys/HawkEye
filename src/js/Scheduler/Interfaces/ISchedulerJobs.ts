//import * as nodeSchedule from 'node-schedule';

interface ISchedulerJobs
{
  [jobId: string]: ISchedulerJobsJob;
};

interface ISchedulerJobsJob
{
  parameters: any;

  job: any;
};