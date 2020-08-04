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

// describe('redux props', () => {
//   const initialState = {
//     auth: {
//       token: '',
//       isAuthenticated: false,
//       loading: true,
//       user: null
//     },
//     profile: {
//       profile: {},
//       profiles: [],
//       repos: [],
//       loading: true,
//       error: {}
//     }
//   };
//   beforeEach(() => {
//     const store = storeFactory(initialState);
//     const wrapper = mount(<Profile store={store} />);

//     const mockGetProfileById = jest.fn();
//     mockGetProfileById.mockClear();
//     wrapper.instance().props.getProfileById = mockGetProfileById;
//   });

//   test('getProfileById gets called on Profile mount', () => {
//     expect(mockGetProfileById).toHaveBeenCalled();
//   });
//   test('`getProfileById` does not update when Profile update', () => {
//     mockGetSecretWord.mockClear();

//     wrapper.setProps();

//     expect(mockGetSecretWord).not.toHaveBeenCalled();
//   });
// });

// // Challenge #3: Give Up Button
// test('calls `giveUp` prop upon "Give Up" button click', () => {
//   // create a mock function so we can see whether it's called on click
//   const giveUpMock = jest.fn();

//   // set up Input, with giveUpMock as a prop
//   const wrapper = shallow(<UnconnectedProfile giveUp={giveUpMock} />);

//   // simulate click on giveUp button
//   const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
//   giveUpButton.simulate('click', { preventDefault() {} });

//   // expect the mock to have been called once
//   expect(giveUpMock.mock.calls.length).toBe(1);
// });
// // END: Challenge #3: Give Up Button

// describe('`guessWord` action creator', () => {
//   let guessWordMock;
//   let wrapper;
//   const guessedWord = 'train';
//   beforeEach(() => {
//     // create a mock function for `guessWord`
//     guessWordMock = jest.fn();

//     // set up Input, with guessWordMock as a prop
//     wrapper = shallow(<UnconnectedProfile guessWord={guessWordMock} />);

//     // simulate the input
//     wrapper.instance().inputBox.current = { value: guessedWord };

//     // simulate click on submit button
//     const submit = findByTestAttr(wrapper, 'submit-button');
//     submit.simulate('click', { preventDefault() {} });
//   });
//   test('`guessWord` was called once', () => {
//     const guessWordCallCount = guessWordMock.mock.calls.length;
//     expect(guessWordCallCount).toBe(1);
//   });
//   test('`guessWord` was called with input value as argument', () => {
//     const guessedWordArg = guessWordMock.mock.calls[0][0];
//     expect(guessedWordArg).toBe(guessedWord);
//   });
//   test('input box clears on submit', () => {
//     expect(wrapper.instance().inputBox.current.value).toBe('');
//   })

// });
