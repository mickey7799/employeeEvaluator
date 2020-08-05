import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import Profiles from './Profiles';

//Factory function to create a ShallowWrapper for the Profiles component.
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = mount(
    <Router>
      <Profiles store={store} />
    </Router>
  );
  //   console.log(wrapper.debug());
  return wrapper;
};

describe('render', () => {
  describe('user is admin & profiles length >0', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {
        auth: {
          user: { isAdmin: true }
        },
        profile: {
          profile: {},
          profiles: [
            {
              skills: ['JS'],
              user: { name: 'Amy' },
              department: 'R&D',
              bio: '',
              status: 'Intern'
            }
          ],
          loading: false
        }
      };
      wrapper = setup(initialState);
    });

    test('renders create employee', () => {
      wrapper = setup({
        auth: {
          user: { isAdmin: true }
        },
        profile: {
          profile: {},
          profiles: [],
          loading: false
        }
      });
      const createEmployee = findByTestAttr(wrapper, 'create-employee');
      expect(createEmployee.length).toBeGreaterThan(0);
    });
    test('renders profile item with profiles length > 0', () => {
      wrapper = setup({
        auth: {
          user: { isAdmin: true }
        },
        profile: {
          profile: {},
          profiles: [
            {
              skills: ['JS'],
              user: { name: 'Amy' },
              department: 'R&D',
              bio: '',
              status: 'Intern'
            }
          ],
          loading: false
        }
      });
      const profileItem = findByTestAttr(wrapper, 'profile-item');
      expect(profileItem.length).toBe(1);
    });
    test('not renders profile item with profiles length == 0', () => {
      wrapper = setup({
        auth: {
          user: { isAdmin: true }
        },
        profile: {
          profile: {},
          profiles: [],
          loading: false
        }
      });
      const profileItem = findByTestAttr(wrapper, 'profile-item');
      expect(profileItem.length).toBe(0);
    });
  });
  describe('user is not an admin', () => {
    let wrapper;
    test('not renders create employee', () => {
      wrapper = setup({
        auth: {
          loading: false,
          user: { isAdmin: false }
        },
        profile: {
          profile: {},
          profiles: [],
          repos: [],
          loading: true,
          error: {}
        }
      });
      const createEmployee = findByTestAttr(wrapper, 'create-employee');
      expect(createEmployee.length).toBe(0);
    });
    test('renders profile item with profiles length > 0', () => {
      wrapper = setup({
        auth: {
          loading: false,
          user: { isAdmin: false }
        },
        profile: {
          profile: {},
          profiles: [
            {
              skills: ['JS'],
              user: { name: 'Amy' },
              department: 'R&D',
              bio: '',
              status: 'Intern'
            }
          ],
          repos: [],
          loading: true,
          error: {}
        }
      });
      const profileItem = findByTestAttr(wrapper, 'profile-item');
      expect(profileItem.length).toBe(1);
    });

    test('not renders profile item with profiles length==0', () => {
      wrapper = setup({
        auth: {
          loading: false,
          user: { isAdmin: false }
        },
        profile: {
          profile: {},
          profiles: [],
          repos: [],
          loading: true,
          error: {}
        }
      });
      const profileItem = findByTestAttr(wrapper, 'profile-item');
      expect(profileItem.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  let wrapper;
  const initialState = {
    auth: {
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
  beforeEach(() => {
    const store = storeFactory(initialState);
    wrapper = shallow(<Profiles store={store} />).dive();
    console.log(wrapper.debug());
  });

  test('has auth and profile state as prop', () => {
    console.log(wrapper.props());
    const authProp = wrapper.props().auth;
    const profileProp = wrapper.props().profile;
    expect(authProp).toEqual(initialState.auth);
    expect(profileProp).toEqual(initialState.profile);
  });
  test('`getProfiles` action creator is a function prop', () => {
    const getProfilesProp = wrapper.props().getProfiles;
    expect(getProfilesProp).toBeInstanceOf(Function);
  });
});
