import {
  gitHubNotificationReasonTypes,
  githubNotificationSubjectTypes
} from 'Constants/Services/GitHub';

export const defaultRepositoryMuteFilter: IStateRepositoryMuteFiltersAccountRepo = {
  allowedSubjectTypes : Object.keys(githubNotificationSubjectTypes),
  allowReasons        : Object.keys(gitHubNotificationReasonTypes)
};