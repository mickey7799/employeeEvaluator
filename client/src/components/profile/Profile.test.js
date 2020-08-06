import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import Profile, { UnconnectedProfile } from './Profile';

//Factory function to create a Wrapper for the Profile component.
const setup = (initialState = {}, props) => {
  const store = storeFactory(initialState);
  const wrapper = mount(
    <Router>
      <Profile store={store} {...props} />
    </Router>
  );
  return wrapper;
};

describe('render', () => {
  describe('user is authenticated', () => {
    let wrapper;

    beforeEach(() => {
      const initialState = {
        profile: {
          profile: {
            bio: 'hi',
            skills: ['JS', 'Python'],
            githubusername: null,
            status: 'intern',
            company: 'A&B',
            location: 'AU',
            user: { name: 'Amy', avatar: 'link' }
          },
          loading: false
        },
        auth: {
          isAuthenticated: true,
          loading: false,
          user: {
            isAdmin: true
          }
        }
      };
      const props = {
        match: { params: { id: 'id' } },
        history: { push: jest.fn() }
      };

      wrapper = setup(initialState, props);
    });
    test('renders profile top', () => {
      const profileTop = findByTestAttr(wrapper, 'component-profile-top');
      expect(profileTop.length).toBe(1);
    });
    test('renders profile about', () => {
      const profileAbout = findByTestAttr(wrapper, 'component-profile-about');
      expect(profileAbout.length).toBe(1);
    });
    test('not renders profile Github with githubusername null', () => {
      const profileGithub = findByTestAttr(wrapper, 'component-profile-github');
      expect(profileGithub.length).toBe(0);
    });
    test('renders edit profile with isAuthenticated true', () => {
      const editProfile = findByTestAttr(wrapper, 'edit-profile');
      expect(editProfile.length).toBeGreaterThan(0);
    });
    test('not renders delete-button with isAdmin false', () => {
      wrapper = setup(
        {
          profile: {
            profile: {
              bio: 'hi',
              skills: ['JS', 'Python'],
              githubusername: null,
              status: 'intern',
              company: 'A&B',
              location: 'AU',
              user: { name: 'Amy', avatar: 'link' }
            },
            loading: false
          },
          auth: {
            isAuthenticated: true,
            user: {
              isAdmin: false
            }
          }
        },
        {
          match: { params: { id: 'id' } },
          history: { push: jest.fn() }
        }
      );
      const deleteButton = findByTestAttr(wrapper, 'delete-button');
      expect(deleteButton.length).toBe(0);
    });
    test('renders spinner with profile === null', () => {
      wrapper = setup(
        {
          profile: {
            profile: null,
            loading: false
          },
          auth: {
            isAuthenticated: true,
            user: {
              isAdmin: true
            }
          }
        },
        {
          match: { params: { id: 'id' } },
          history: { push: jest.fn() }
        }
      );
      const spinner = findByTestAttr(wrapper, 'component-spinner');
      expect(spinner.length).toBe(1);
    });
    test('renders spinner with loading true', () => {
      wrapper = setup(
        {
          profile: {
            profile: {
              bio: 'hi',
              skills: ['JS', 'Python'],
              githubusername: null,
              status: 'intern',
              company: 'A&B',
              location: 'AU',
              user: { name: 'Amy', avatar: 'link' }
            },
            loading: true
          },
          auth: {
            isAuthenticated: true,
            user: {
              isAdmin: true
            }
          }
        },
        {
          match: { params: { id: 'id' } },
          history: { push: jest.fn() }
        }
      );
      const spinner = findByTestAttr(wrapper, 'component-spinner');
      expect(spinner.length).toBe(1);
    });
  });

  describe('user is not authenticated', () => {
    let wrapper;

    beforeEach(() => {
      const initialState = {
        profile: {
          profile: {
            bio: 'hi',
            skills: ['JS', 'Python'],
            githubusername: null,
            status: 'intern',
            company: 'A&B',
            location: 'AU',
            user: { name: 'Amy', avatar: 'link' }
          },
          loading: false
        },
        auth: {
          isAuthenticated: false,
          loading: false,
          user: {
            isAdmin: false
          }
        }
      };
      const props = {
        match: { params: { id: 'id' } },
        history: { push: jest.fn() }
      };

      wrapper = setup(initialState, props);
    });
    test('renders profile top', () => {
      const profileTop = findByTestAttr(wrapper, 'component-profile-top');
      expect(profileTop.length).toBe(1);
    });
    test('renders profile about', () => {
      const profileAbout = findByTestAttr(wrapper, 'component-profile-about');
      expect(profileAbout.length).toBe(1);
    });
    test('not renders profile Github with githubusername null', () => {
      const profileGithub = findByTestAttr(wrapper, 'component-profile-github');
      expect(profileGithub.length).toBe(0);
    });
    test('not renders edit profile', () => {
      const editProfile = findByTestAttr(wrapper, 'edit-profile');
      expect(editProfile.length).toBe(0);
    });
    test('not renders delete-button with isAdmin false', () => {
      const deleteButton = findByTestAttr(wrapper, 'delete-button');
      expect(deleteButton.length).toBe(0);
    });

    test('renders spinner with profile === null', () => {
      wrapper = setup(
        {
          profile: {
            profile: null,
            loading: false
          },
          auth: {
            isAuthenticated: false,
            user: {
              isAdmin: false
            }
          }
        },
        {
          match: { params: { id: 'id' } },
          history: { push: jest.fn() }
        }
      );
      const spinner = findByTestAttr(wrapper, 'component-spinner');
      expect(spinner.length).toBe(1);
    });
    test('renders spinner with loading true', () => {
      wrapper = setup(
        {
          profile: {
            profile: {
              bio: 'hi',
              skills: ['JS', 'Python'],
              githubusername: null,
              status: 'intern',
              company: 'A&B',
              location: 'AU',
              user: { name: 'Amy', avatar: 'link' }
            },
            loading: true
          },
          auth: {
            isAuthenticated: false,
            user: {
              isAdmin: false
            }
          }
        },
        {
          match: { params: { id: 'id' } },
          history: { push: jest.fn() }
        }
      );
      const spinner = findByTestAttr(wrapper, 'component-spinner');
      expect(spinner.length).toBe(1);
    });
  });
});

test('calls `deleteEmployee` prop upon "deleteEmployee" button click', () => {
  const deleteEmployeeMock = jest.fn();
  const getProfileByIdMock = jest.fn();
  const props = {
    profile: {
      profile: {
        bio: 'hi',
        skills: ['JS', 'Python'],
        githubusername: null,
        status: 'intern',
        company: 'A&B',
        location: 'AU',
        user: { name: 'Amy', avatar: 'link' }
      },
      loading: false
    },
    auth: {
      user: { isAdmin: true }
    },
    match: { params: { id: 'id' } },
    history: { push: jest.fn() }
  };
  const wrapper = shallow(
    <UnconnectedProfile
      {...props}
      deleteEmployee={deleteEmployeeMock}
      getProfileById={getProfileByIdMock}
    />
  );
  // simulate click on button
  const deleteButton = findByTestAttr(wrapper, 'delete-button');
  deleteButton.simulate('click');

  // expect the mock to have been called once
  expect(deleteEmployeeMock.mock.calls.length).toBe(1);
});

describe('redux props', () => {
  let wrapper;
  const initialState = {
    profile: {
      profile: {
        bio: 'hi',
        skills: ['JS', 'Python'],
        githubusername: null,
        status: 'intern',
        company: 'A&B',
        location: 'AU',
        user: { name: 'Amy', avatar: 'link' }
      },
      loading: false
    },
    auth: {
      isAuthenticated: false,
      loading: false,
      user: {
        isAdmin: false
      }
    }
  };
  beforeEach(() => {
    const store = storeFactory(initialState);
    wrapper = shallow(<Profile store={store} />).dive();
  });

  test('has auth and profile state as prop', () => {
    const authProp = wrapper.props().auth;
    const profileProp = wrapper.props().profile;
    expect(authProp).toEqual(initialState.auth);
    expect(profileProp).toEqual(initialState.profile);
  });
  test('`getProfileById` action creator is a function prop', () => {
    const getProfileByIdProp = wrapper.props().getProfileById;
    expect(getProfileByIdProp).toBeInstanceOf(Function);
  });
  test('`deleteEmployee` action creator is a function prop', () => {
    const deleteEmployeeProp = wrapper.props().deleteEmployee;
    expect(deleteEmployeeProp).toBeInstanceOf(Function);
  });
});
