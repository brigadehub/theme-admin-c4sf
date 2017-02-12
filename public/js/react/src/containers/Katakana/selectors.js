import { createSelector } from 'reselect';

/**
 * Direct selector to the katakana state domain
 */
const selectKatakanaDomain = () => (state) => state.get('katakana');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Katakana
 */

const makeSelectKatakana = () => createSelector(
  selectKatakanaDomain(),
  (substate) => substate.toJS()
);

export default makeSelectKatakana;
export {
  selectKatakanaDomain,
};
