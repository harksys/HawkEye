
/**
 * @param  {IGitHubNotification[]} input
 * @param  {INotificationFilterSet} ruleSet
 * @returns IGitHubNotification
 */
export default function filter(input: IGitHubNotification[], ruleSet: INotificationFilterSet): IGitHubNotification[]
{
  if (ruleSet.subjectType.length === 0) {
    return input;
  }

  return input.filter(n => ruleSet.subjectType.indexOf(n.subject.type) > -1);
};