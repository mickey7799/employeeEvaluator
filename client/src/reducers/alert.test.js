import { SET_ALERT } from '../actions/alert';

import alertReducer from './alert';

describe('Alert reducer testing', () => {
  test('returns default initial state when no action is passed', () => {
    const newState = alertReducer(undefined, {});
    expect(newState).toEqual([]);
  });
  test('returns state of not null upon receiving an action of type `SET_ALERT`', () => {
    const newState = alertReducer(undefined, { type: SET_ALERT });
    expect(newState).not.toBe(null);
  });
});
