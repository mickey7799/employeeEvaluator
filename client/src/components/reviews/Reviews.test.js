import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import Reviews from './Reviews';

//Factory function to create a Wrapper for the Profile component.
const setup = (initialState = {}, props) => {
  const store = storeFactory(initialState);
  const wrapper = mount(
    <Router>
      <Provider store={store}>
        <Reviews {...props} />
      </Provider>
    </Router>
  );
  return wrapper;
};

describe('Render', () => {
  let wrapper;

  beforeEach(() => {
    const initialState = {
      review: {
        review: null,
        reviews: [
          {
            user: '5f24ee06a2c4e08896cd1b3c',
            text: 'R&D',
            rating: 5,
            _id: 1,
            feedbacks: [],
            name: 'Amy',
            avatar: 'link',
            admin: '5f24ee06a2c4e08896cd1b3s',
            date: '2020/08/07'
          },
          {
            user: '5f24ee06a2c4e08896cd1b3c',
            text: 'R&D',
            rating: 5,
            _id: 2,
            feedbacks: [],
            name: 'Amy',
            avatar: 'link',
            admin: '5f24ee06a2c4e08896cd1b3s',
            date: '2020/08/07'
          }
        ],
        loading: false
      },
      profile: {
        profiles: []
      },
      auth: {
        isAuthenticated: true,
        loading: false,
        user: {
          isAdmin: true,
          _id: '5f24ee06a2c4e08896cd1b3s'
        }
      }
    };
    const props = {
      match: { params: { id: 'id' } }
    };

    wrapper = setup(initialState, props);
  });
  test('renders review item', () => {
    const reviewItem = findByTestAttr(wrapper, 'component-review-item');
    expect(reviewItem.length).toBeGreaterThan(0);
  });
  test('not renders review item if reviews length ===0', () => {
    wrapper = setup(
      {
        review: {
          review: null,
          reviews: [],
          loading: false
        },
        profile: {
          profiles: []
        },
        auth: {
          isAuthenticated: true,
          loading: false,
          user: {
            isAdmin: true,
            _id: '5f24ee06a2c4e08896cd1b3s'
          }
        }
      },
      {
        match: { params: { id: 'id' } }
      }
    );
    const reviewItem = findByTestAttr(wrapper, 'component-review-item');
    expect(reviewItem.length).toBe(0);
  });
  test('renders review form', () => {
    const reviewForm = findByTestAttr(wrapper, 'component-review-form');
    expect(reviewForm.length).toBeGreaterThan(0);
  });
  test('not renders review form for isAdmin===false', () => {
    wrapper = setup(
      {
        review: {
          review: null,
          reviews: [
            {
              user: '5f24ee06a2c4e08896cd1b3c',
              text: 'R&D',
              rating: 5,
              _id: 1,
              feedbacks: [],
              name: 'Amy',
              avatar: 'link',
              admin: '5f24ee06a2c4e08896cd1b3s',
              date: '2020/08/07'
            },
            {
              user: '5f24ee06a2c4e08896cd1b3c',
              text: 'R&D',
              rating: 5,
              _id: 2,
              feedbacks: [],
              name: 'Amy',
              avatar: 'link',
              admin: '5f24ee06a2c4e08896cd1b3s',
              date: '2020/08/07'
            }
          ],
          loading: false
        },
        profile: {
          profiles: []
        },
        auth: {
          isAuthenticated: true,
          loading: false,
          user: {
            isAdmin: false,
            _id: '5f24ee06a2c4e08896cd1b3s'
          }
        }
      },
      {
        match: { params: { id: 'id' } }
      }
    );
    const reviewForm = findByTestAttr(wrapper, 'component-review-form');
    expect(reviewForm.length).toBe(0);
  });
});

describe('redux props', () => {
  let wrapper;
  const initialState = {
    review: {
      review: null,
      reviews: [
        {
          user: '5f24ee06a2c4e08896cd1b3c',
          text: 'R&D',
          rating: 5,
          _id: 1,
          feedbacks: [],
          name: 'Amy',
          avatar: 'link',
          admin: '5f24ee06a2c4e08896cd1b3s',
          date: '2020/08/07'
        },
        {
          user: '5f24ee06a2c4e08896cd1b3c',
          text: 'R&D',
          rating: 5,
          _id: 2,
          feedbacks: [],
          name: 'Amy',
          avatar: 'link',
          admin: '5f24ee06a2c4e08896cd1b3s',
          date: '2020/08/07'
        }
      ],
      loading: false
    },
    profile: {
      profiles: []
    },
    auth: {
      isAuthenticated: true,
      loading: false,
      user: {
        isAdmin: true,
        _id: '5f24ee06a2c4e08896cd1b3s'
      }
    }
  };
  beforeEach(() => {
    const store = storeFactory(initialState);
    wrapper = shallow(<Reviews store={store} />).dive();
  });

  test('has auth, profile, and review state as prop', () => {
    const authProp = wrapper.props().auth;
    const reviewProp = wrapper.props().review;
    const profileProp = wrapper.props().review;
    expect(authProp).toEqual(initialState.auth);
    expect(reviewProp).toEqual(initialState.review);
    expect(profileProp).toEqual(initialState.review);
  });
  test('`getReviewsByUserId` action creator is a function prop', () => {
    const getReviewsByUserIdProp = wrapper.props().getReviewsByUserId;
    expect(getReviewsByUserIdProp).toBeInstanceOf(Function);
  });
  test('`getReviewsByReviewerId` action creator is a function prop', () => {
    const getReviewsByReviewerIdProp = wrapper.props().getReviewsByReviewerId;
    expect(getReviewsByReviewerIdProp).toBeInstanceOf(Function);
  });
  test('`getProfiles` action creator is a function prop', () => {
    const getProfilesProp = wrapper.props().getProfiles;
    expect(getProfilesProp).toBeInstanceOf(Function);
  });
});
