import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';

import authReducer from './auth';

describe('Auth reducer testing', () => {
  window.localStorage.__proto__.setItem = jest.fn();

  const defaultState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  const user = {
    skills: ['JS'],
    user: { name: 'Amy' },
    department: 'R&D',
    bio: '',
    status: 'Intern'
  };

  test('returns default initial state when no action is passed', () => {
    const newState = authReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });
  test('returns state of "false" on loading, update token, and true on isAuthenticated upon receiving an action of type `REGISTER_SUCCESS`', () => {
    const payload = { token: 'abc' };
    const newState = authReducer(defaultState, {
      type: REGISTER_SUCCESS,
      payload
    });

    expect(newState.token).toBe('abc');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.loading).toBe(false);
  });
  test('returns state of "false" on loading, update token, and true on isAuthenticated upon receiving an action of type `LOGIN_SUCCESS`', () => {
    const payload = { token: 'abc' };
    const newState = authReducer(defaultState, {
      type: LOGIN_SUCCESS,
      payload
    });
    expect(newState.token).toBe('abc');
    expect(newState.isAuthenticated).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(newState.loading).toBe(false);
  });
  test('returns state of "false" on loading, update user and true on isAuthenticated upon receiving an action of type `USER_LOADED`', () => {
    const payload = {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    };
    const newState = authReducer(undefined, { type: USER_LOADED, payload });
    expect(newState.user).toEqual(payload);
    expect(newState.loading).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
  });

  test('returns state of "false" on loading, null on token, and false on isAuthenticated upon receiving an action of type `REGISTER_FAIL`', () => {
    const newState = authReducer(
      { ...defaultState, isAuthenticated: true, token: 'token' },
      { type: REGISTER_FAIL }
    );
    expect(newState.loading).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.token).toBeNull();
  });

  test('returns state of "false" on loading, null on token, and false on isAuthenticated upon receiving an action of type `AUTH_ERROR`', () => {
    const newState = authReducer(
      { ...defaultState, isAuthenticated: true, token: 'token' },
      { type: AUTH_ERROR }
    );
    expect(newState.loading).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.token).toBeNull();
  });
  test('returns state of "false" on loading, null on token, and false on isAuthenticated upon receiving an action of type `LOGIN_FAIL`', () => {
    const newState = authReducer(
      { ...defaultState, isAuthenticated: true, token: 'token' },
      { type: LOGIN_FAIL }
    );
    expect(newState.loading).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.token).toBeNull();
  });
  test('returns state of "false" on loading, null on token, and false on isAuthenticated upon receiving an action of type `LOGOUT`', () => {
    const newState = authReducer(
      { ...defaultState, isAuthenticated: true, token: 'token' },
      { type: LOGOUT }
    );
    expect(newState.loading).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.token).toBeNull();
  });
  test('returns state of "false" on loading, null on token, and false on isAuthenticated upon receiving an action of type `ACCOUNT_DELETED`', () => {
    const newState = authReducer(
      { ...defaultState, isAuthenticated: true, token: 'token' },
      { type: ACCOUNT_DELETED }
    );
    expect(newState.loading).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.token).toBeNull();
  });
});
