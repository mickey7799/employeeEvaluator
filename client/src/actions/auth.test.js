import moxios from 'moxios';

import { storeFactory } from '../../test/testUtils';
import { loadUser, register, login } from './auth';

describe('Auth action creators', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('loadUser: adds user to state and set isAuthenticated to true', () => {
    const user = {
      skills: ['JS'],
      user: { name: 'Amy' },
      department: 'R&D',
      bio: '',
      status: 'Intern',
      isAdmin: true
    };
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: user
      });
    });

    return store.dispatch(loadUser()).then(() => {
      const newState = store.getState().auth;
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.user).toEqual(user);
    });
  });

  test('register: adds user to state and set isAuthenticated to true', () => {
    const name = 'Amy';
    const email = 'Amy@gmail.com';
    const password = '123456';
    const isAdmin = false;
    const res = { token: 'token' };
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: res
      });
    });

    return store.dispatch(register(name, email, password, isAdmin)).then(() => {
      const newState = store.getState().auth;
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.token).toBe(res.token);
    });
  });

  test('login: adds user to state and set isAuthenticated to true', () => {
    const email = 'Amy@gmail.com';
    const password = '123456';

    const res = { token: 'token' };
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: res
      });
    });

    return store.dispatch(login(email, password)).then(() => {
      const newState = store.getState().auth;
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.token).toBe(res.token);
    });
  });
});
