
import { fromJS } from 'immutable';
import hiraganaReducer from '../reducer';

describe('hiraganaReducer', () => {
  it('returns the initial state', () => {
    expect(hiraganaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
