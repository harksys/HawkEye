
export const sortingMethods = {
  dateAsc  : sortDateAsc,
  dateDesc : sortDateDesc
};

/**
 * @param  {string} field?
 * @returns any
 */
export function sortDateAsc(field?: string): any
{
  return (a, b) =>
  {
    let dateOne = new Date(typeof field !== 'undefined'
                            ? a[field]
                            : a);
    let dateTwo = new Date(typeof field !== 'undefined'
                            ? b[field]
                            : b);

    if (dateOne > dateTwo) return 1;
    if (dateOne < dateTwo) return -1;
  };
};

export function sortDateDesc(field?: string): any
{
  return (a, b) =>
  {
    let dateOne = new Date(typeof field !== 'undefined'
                            ? a[field]
                            : a);
    let dateTwo = new Date(typeof field !== 'undefined'
                            ? b[field]
                            : b);

    if (dateOne > dateTwo) return -1;
    if (dateOne < dateTwo) return 1;
  };
};