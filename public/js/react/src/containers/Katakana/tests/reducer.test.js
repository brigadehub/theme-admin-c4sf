
import { fromJS } from 'immutable';
import katakanaReducer from '../reducer';

describe('katakanaReducer', () => {
  it('returns the initial state', () => {
    expect(katakanaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
