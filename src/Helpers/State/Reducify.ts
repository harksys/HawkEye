
/**
 * @param  {any={}} defaultState
 * @param  {any} reducingMethods
 */
const reducify = (defaultState: any = {}, reducingMethods: any) =>
{
  return (state = defaultState, action) =>
  {
    return typeof reducingMethods[action.type] === 'function'
             ? reducingMethods[action.type](state, action)
             : state;
  };
};

export default reducify;