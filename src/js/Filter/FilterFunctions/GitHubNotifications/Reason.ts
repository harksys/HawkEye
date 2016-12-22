
/**
 * @param  {IGitHubNotification[]} input
 * @param  {INotificationFilterSet} ruleSet
 * @returns IGitHubNotification
 */
export default function filter(input: IGitHubNotification[], ruleSet: INotificationFilterSet): IGitHubNotification[]
{
  if (ruleSet.reasonType.length === 0) {
    return input;
  }

  return input.filter(n => ruleSet.reasonType.indexOf(n.reason) > -1);
};