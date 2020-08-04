import moxios from 'moxios';

import { storeFactory } from '../../test/testUtils';
import {
  getCurrentProfile,
  getProfiles,
  getProfileById,
  getGithubRepos,
  createEmployee,
  createProfile,
  deleteAccount,
  deleteEmployee
} from './profile';

describe('Profile action creators', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('getCurrentProfile: adds profile to state', () => {
    const profile = {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    };
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: profile
      });
    });

    return store.dispatch(getCurrentProfile()).then(() => {
      const newState = store.getState().profile;
      expect(newState.profile).toEqual(profile);
    });
  });

  test('getProfiles: clears profile and adds profiles to state', () => {
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
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: profiles
      });
    });

    return store.dispatch(getProfiles()).then(() => {
      const newState = store.getState().profile;
      expect(newState.profile).toEqual(null);
      expect(newState.profiles).toEqual(profiles);
    });
  });

  test('getProfileById: adds profile to state', () => {
    const profile = {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    };

    const user_id = '5f223efc5afe3e2445793de1';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: profile
      });
    });

    return store.dispatch(getProfileById(user_id)).then(() => {
      const newState = store.getState().profile;
      expect(newState.profile).toEqual(profile);
    });
  });

  test('getGithubRepos: adds repos to state', () => {
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
    const username = 'test123';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: repos
      });
    });

    return store.dispatch(getGithubRepos(username)).then(() => {
      const newState = store.getState().profile;
      expect(newState.repos).toEqual(repos);
    });
  });

  test('createEmployee: adds profile to state', () => {
    const historyMock = { push: jest.fn() };
    const formData = {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    };
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: formData
      });
    });

    return store.dispatch(createEmployee(formData, historyMock)).then(() => {
      const newStateAlert = store.getState().alert;
      expect(newStateAlert[0].alertType).toBe('success');
      expect(newStateAlert[0].msg).toBe('Employee Created');
    });
  });

  test('createProfile: adds profile to profile state', () => {
    const formData = {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    };
    const employee_id = '5f24ee06a2c4e08896cd1b3c';
    const edit = false;
    const historyMock = { push: jest.fn() };
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: formData
      });
    });
    return store
      .dispatch(createProfile(formData, historyMock, employee_id, edit))
      .then(() => {
        const newStateProfile = store.getState().profile;
        expect(newStateProfile.profile).toEqual(formData);
      });
  });

  test('deleteAccount: clears profile to profile state and clears token in auth state', () => {
    window.confirm = jest.fn(() => true);
    window.confirm.mockClear();
    const profile = {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern'
    };
    const store = storeFactory({
      alert: [],
      auth: {
        token: 'token',
        isAuthenticated: true,
        loading: true,
        user: null
      },
      profile: {
        profile: profile,
        profiles: [],
        repos: [],
        loading: true,
        error: {}
      },
      review: {}
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { msg: 'User deleted' }
      });
    });
    return store.dispatch(deleteAccount()).then(() => {
      const newStateProfile = store.getState().profile;
      const newStateAuth = store.getState().auth;
      expect(newStateProfile.profile).toEqual(null);
      expect(newStateAuth.token).toEqual(null);
      expect(newStateAuth.isAuthenticated).toEqual(false);
    });
  });

  test('deleteEmployee: clears profile to profile state and clears token in auth state', () => {
    window.confirm = jest.fn(() => true);
    window.confirm.mockClear();
    const employee_id = '5f24ee06a2c4e08896cd1b3c';
    const historyMock = { push: jest.fn() };
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { msg: 'Employee not found' }
      });
    });
    return store.dispatch(deleteEmployee(employee_id, historyMock)).then(() => {
      const newStateAlert = store.getState().alert;
      expect(newStateAlert[0].msg).toBe(
        'This employee has been permanantly deleted'
      );
    });
  });
});
