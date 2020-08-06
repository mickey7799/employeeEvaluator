import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

import alertReducer from './alert';

describe('Alert reducer testing', () => {
  test('returns default initial state when no action is passed', () => {
    const newState = alertReducer(undefined, {});
    expect(newState).toEqual([]);
  });
  test('returns state of not null with correct error message and type upon receiving an action of type `SET_ALERT`', () => {
    const payload = { msg: 'Profile updated', alertType: 'success', id: 3 };
    const newState = alertReducer(undefined, {
      type: SET_ALERT,
      payload
    });
    expect(newState.length).toBe(1);
    expect(newState[0].msg).toBe('Profile updated');
    expect(newState[0].alertType).toBe('success');
  });
  test('returns state with alert deleted by id upon receiving an action of type `REMOVE_ALERT`', () => {
    const newState = alertReducer(
      [
        { msg: 'Profile updated', alertType: 'success', id: 1 },
        { msg: 'Profile created', alertType: 'success', id: 2 }
      ],
      { type: REMOVE_ALERT, payload: 1 }
    );
    expect(newState[0]).toEqual({
      msg: 'Profile created',
      alertType: 'success',
      id: 2
    });
  });
});
