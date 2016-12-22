
interface IFilterFunction<T>
{
  (input: T[], ruleSet: any): T[];
};