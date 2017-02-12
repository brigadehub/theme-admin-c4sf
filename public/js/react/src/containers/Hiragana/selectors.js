import { createSelector } from 'reselect';

/**
 * Direct selector to the hiragana state domain
 */
const selectHiraganaDomain = () => (state) => state.get('hiragana');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Hiragana
 */

const makeSelectHiragana = () => createSelector(
  selectHiraganaDomain(),
  (substate) => substate.toJS()
);

export default makeSelectHiragana;
export {
  selectHiraganaDomain,
};
