///<reference path="./Interfaces/IScheduler.ts" />
///<reference path="./Interfaces/ISchedulerJobs.ts" />

import {
  cancelJob,
  scheduleJob,
  getScheduledJobs
} from './NodeSchedule';
import { generateId } from 'Helpers/Lang/String';

class Scheduler implements IScheduler
{
  private jobs: ISchedulerJobs = {};

  constructor()
  {
    /*
     * Cancel any currently running jobs. This is
     * in case of a refresh and not a restart.
     */
    this.cancelRunningJobs();
    this.jobs = {};
  }

  /**
   * @param  {string} time
   * @param  {any} parameters
   * @param  {()=>{}} method
   * @returns string
   */
  public scheduleJob = (time: string, parameters: any, method: () => {}): string =>
  {
    let name = this.makeJobName();
    let job  = scheduleJob(time, method);

    this.jobs[name] = {
      job        : job,
      parameters : parameters
    } as ISchedulerJobsJob;

    return name;
  };

  /**
   * @param  {string} name
   * @returns any
   */
  public getJobParameters = (name: string): any =>
  {
    return typeof this.jobs[name] !== 'undefined'
                    ? this.jobs[name].parameters
                    : null;
  }

  /**
   * @param  {string} name
   */
  public cancelJob = (name: string) =>
  {
    if (typeof this.jobs[name] === 'undefined') {
      return;
    }

    this.jobs[name].job.cancel();
  }

  /**
   */
  public clearAllJobs = () =>
  {
    this.cancelRunningJobs();
    this.jobs = {};
  }

  /**
   * @returns string
   */
  private makeJobName = (): string =>
  {
    let name = generateId();
    while (typeof this.jobs[name] !== 'undefined') {
      name = generateId();
    }

    return name;
  };

  /**
   */
  private cancelRunningJobs = () =>
  {
    let jobs = getScheduledJobs();

    Object.keys(jobs)
          .map(k => jobs[k].cancel());
  };
};

export default Scheduler;