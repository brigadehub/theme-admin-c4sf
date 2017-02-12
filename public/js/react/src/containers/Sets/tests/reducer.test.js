
import { fromJS } from 'immutable';
import setsReducer from '../reducer';

describe('setsReducer', () => {
  it('returns the initial state', () => {
    expect(setsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
