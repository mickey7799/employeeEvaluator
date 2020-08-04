import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from '../actions/types';

import profileReducer from './profile';

describe('Profile reducer testing', () => {
  const defaultState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
  };
  const profiles = [
    {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    },
    {
      skills: ['Java'],
      user: { name: 'Tim' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    },
    {
      skills: ['Ruby'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    }
  ];

  const repos = [
    {
      fork: 100,
      star: 30,
      name: 'calculator_app',
      content: ''
    },
    {
      fork: 20,
      star: 10,
      name: 'todo_app',
      content: ''
    }
  ];
  test('returns default initial state when no action is passed', () => {
    const newState = profileReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });
  test('returns state of "false" on loading and not null on profile upon receiving an action of type `GET_PROFILE`', () => {
    const newState = profileReducer(undefined, { type: GET_PROFILE });
    expect(newState.profile).not.toBe(null);
    expect(newState.loading).toBe(false);
  });
  test('returns state of "false" on loading and not null on profile upon receiving an action of type `UPDATE_PROFILE`', () => {
    const newState = profileReducer(undefined, { type: UPDATE_PROFILE });
    expect(newState.profile).not.toBe(null);
    expect(newState.loading).toBe(false);
  });
  test('returns state of "false" on loading and null on profile upon receiving an action of type `PROFILE_ERROR`', () => {
    const newState = profileReducer(
      { ...defaultState, profiles },
      { type: PROFILE_ERROR }
    );
    expect(newState.loading).toBe(false);
    expect(newState.profile).toBeNull();
  });

  test('returns state of "false" on loading, not null on repos, and null on profile upon receiving an action of type `CLEAR_PROFILE`', () => {
    const newState = profileReducer(
      { ...defaultState, profiles, repos },
      { type: CLEAR_PROFILE }
    );
    expect(newState.loading).toBe(false);
    expect(newState.repos).toEqual([]);
    expect(newState.profile).toBeNull();
  });

  test('returns state of "false" on loading and not null on profiles upon receiving an action of type `GET_PROFILES`', () => {
    const newState = profileReducer(undefined, { type: GET_PROFILES });
    expect(newState.loading).toBe(false);
    expect(newState.profiles).not.toBe(null);
  });

  test('returns state of "false" on loading and not null on repos upon receiving an action of type `GET_REPOS`', () => {
    const newState = profileReducer(undefined, { type: GET_REPOS });
    expect(newState.repos).not.toBe(null);
    expect(newState.loading).toBe(false);
  });
});
