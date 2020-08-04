import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import Profiles from './Profiles';

//Factory function to create a ShallowWrapper for the Profiles component.
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Profiles store={store} />).dive();

  return wrapper;
};

describe('render', () => {
  describe('user is admin & profiles length >0', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {};
      wrapper = setup(initialState);
    });

    test('renders create employee', () => {
      console.log(wrapper);
      const createEmployee = findByTestAttr(wrapper, 'create-employee');
      expect(createEmployee.length).toBe(1);
    });
    test('renders profile item', () => {
      const profileItem = findByTestAttr(wrapper, 'profile-item');
      expect(profileItem.length).toBe(1);
    });
  });
  describe('user is not an admin && profiles length == 0', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {
        auth: {
          token: '',
          isAuthenticated: false,
          loading: true,
          user: { isAdmin: false }
        },
        profile: {
          profile: {},
          profiles: [],
          repos: [],
          loading: true,
          error: {}
        }
      };
      wrapper = setup(initialState);
    });

    test('renders create employee', () => {
      const createEmployee = findByTestAttr(wrapper, 'create-employee');
      expect(createEmployee.length).toBe(0);
    });
    test('renders profile item', () => {
      const profileItem = findByTestAttr(wrapper, 'profile-item');
      expect(profileItem.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has auth and profile state as prop', () => {
    const initialState = {
      auth: {
        token: '',
        isAuthenticated: false,
        loading: true,
        user: null
      },
      profile: {
        profile: {},
        profiles: [],
        repos: [],
        loading: true,
        error: {}
      }
    };
    const wrapper = setup(initialState);
    const authProp = wrapper.instance().props.auth;
    const profileProp = wrapper.instance().props.profile;
    expect(authProp).toEqual(initialState.auth);
    expect(profileProp).toEqual(initialState.profile);
  });
  test('`getProfiles` action creator is a function prop', () => {
    const wrapper = setup();
    const getProfilesProp = wrapper.instance().props.getProfiles;
    expect(getProfilesProp).toBeInstanceOf(Function);
  });
});
