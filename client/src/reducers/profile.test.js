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
  test('returns state of "false" on loading and add profile upon receiving an action of type `GET_PROFILE`', () => {
    const payload = {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    };
    const newState = profileReducer(undefined, { type: GET_PROFILE, payload });
    expect(newState.profile).toEqual(payload);
    expect(newState.loading).toBe(false);
  });
  test('returns state of "false" on loading and add profile upon receiving an action of type `UPDATE_PROFILE`', () => {
    const payload = {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    };
    const newState = profileReducer(undefined, {
      type: UPDATE_PROFILE,
      payload
    });
    expect(newState.profile).toEqual(payload);
    expect(newState.loading).toBe(false);
  });
  test('returns state of "false" on loading, add error, and null on profile upon receiving an action of type `PROFILE_ERROR`', () => {
    const payload = { msg: 'Profile updated', alertType: 'success', id: 1 };
    const newState = profileReducer(
      { ...defaultState, profiles },
      { type: PROFILE_ERROR, payload }
    );
    expect(newState.loading).toBe(false);
    expect(newState.profile).toBeNull();
    expect(newState.error).toEqual(payload);
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

  test('returns state of "false" on loading and add profiles upon receiving an action of type `GET_PROFILES`', () => {
    const newState = profileReducer(undefined, {
      type: GET_PROFILES,
      payload: profiles
    });
    expect(newState.loading).toBe(false);
    expect(newState.profiles).toEqual(profiles);
  });

  test('returns state of "false" on loading and add repos upon receiving an action of type `GET_REPOS`', () => {
    const newState = profileReducer(undefined, {
      type: GET_REPOS,
      payload: repos
    });
    expect(newState.repos).toEqual(repos);
    expect(newState.loading).toBe(false);
  });
});
