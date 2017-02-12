import { createSelector } from 'reselect';

/**
 * Direct selector to the sets state domain
 */
const selectSetsDomain = () => (state) => state.get('sets');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Sets
 */

const makeSelectSets = () => createSelector(
  selectSetsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSets;
export {
  selectSetsDomain,
};
