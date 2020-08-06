import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import Review from './Review';

//Factory function to create a Wrapper for the Profile component.
const setup = (initialState = {}, props) => {
  const store = storeFactory(initialState);
  const wrapper = mount(
    <Router>
      <Provider store={store}>
        <Review {...props} />
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
        review: {
          user: '5f24ee06a2c4e08896cd1b3c',
          text: 'R&D',
          rating: 5,
          _id: '1',
          feedbacks: [{ text: 'good', name: 'Amy' }],
          name: 'Amy',
          avatar: 'link',
          admin: '5f24ee06a2c4e08896cd1b3s',
          date: '2020/08/07'
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
      match: { params: { id: 'id' } }
    };

    wrapper = setup(initialState, props);
  });
  test('renders review item', () => {
    const reviewItem = findByTestAttr(wrapper, 'component-review-item');
    expect(reviewItem.length).toBeGreaterThan(0);
  });
  test('renders feedback form', () => {
    const feedbackForm = findByTestAttr(wrapper, 'component-feedback-form');
    expect(feedbackForm.length).toBeGreaterThan(0);
  });
  test('renders feedback item', () => {
    const feedbackItem = findByTestAttr(wrapper, 'component-feedback-item');
    expect(feedbackItem.length).toBeGreaterThan(0);
  });
  test('not renders feedback item with feedback length ===0', () => {
    wrapper = setup(
      {
        review: {
          review: {
            user: '5f24ee06a2c4e08896cd1b3c',
            text: 'R&D',
            rating: 5,
            _id: '1',
            feedbacks: [],
            name: 'Amy',
            avatar: 'link',
            admin: '5f24ee06a2c4e08896cd1b3s',
            date: '2020/08/07'
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
      },
      {
        match: { params: { id: 'id' } }
      }
    );
    const feedbackItem = findByTestAttr(wrapper, 'component-feedback-item');
    expect(feedbackItem.length).toBe(0);
  });
  test('renders spinner with review === null', () => {
    wrapper = setup(
      {
        review: {
          review: null,
          loading: false
        },
        auth: {
          isAuthenticated: true,
          loading: false,
          user: {
            isAdmin: true
          }
        }
      },
      {
        match: { params: { id: 'id' } }
      }
    );
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.length).toBe(1);
  });
  test('renders spinner with loading true', () => {
    wrapper = setup(
      {
        review: {
          review: null,
          loading: false
        },
        auth: {
          isAuthenticated: true,
          loading: false,
          user: {
            isAdmin: true
          }
        }
      },
      {
        match: { params: { id: 'id' } }
      }
    );
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.length).toBe(1);
  });
});

describe('redux props', () => {
  let wrapper;
  const initialState = {
    review: {
      review: {
        user: '5f24ee06a2c4e08896cd1b3c',
        text: 'R&D',
        rating: 5,
        _id: '1',
        feedbacks: [{ text: 'good', name: 'Amy' }],
        name: 'Amy',
        avatar: 'link',
        admin: '5f24ee06a2c4e08896cd1b3s',
        date: '2020/08/07'
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
  beforeEach(() => {
    const store = storeFactory(initialState);
    wrapper = shallow(<Review store={store} />).dive();
  });

  test('has auth and review state as prop', () => {
    const authProp = wrapper.props().auth;
    const reviewProp = wrapper.props().review;
    expect(authProp).toEqual(initialState.auth);
    expect(reviewProp).toEqual(initialState.review);
  });
  test('`getReview` action creator is a function prop', () => {
    const getReviewProp = wrapper.props().getReview;
    expect(getReviewProp).toBeInstanceOf(Function);
  });
});
