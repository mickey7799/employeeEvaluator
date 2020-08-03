import moxios from 'moxios';

import { storeFactory } from '../../test/testUtils';
import {
  getReviewsByUserId,
  getReviewsByReviewerId,
  deleteReview,
  addReview,
  createEmployee,
  createProfile,
  deleteAccount,
  deleteEmployee
} from './review';
import { setAlert } from './alert';

describe('Reivew action creators', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('getReviewsByUserId: adds reviews to state', () => {
    const reviews = [
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        admin: '5f229ece17d7768ccff85190',
        text: 'R&D',
        bio: 'Good',
        rating: 5
      },
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        admin: '5f229ece17d7768ccff85190',
        text: 'R&D',
        bio: 'Good',
        rating: 3
      }
    ];
    const employee_id = '5f24ee06a2c4e08896cd1b3c';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: reviews
      });
    });

    return store.dispatch(getReviewsByUserId(employee_id)).then(() => {
      const newState = store.getState().review;
      expect(newState.reviews).toEqual(reviews);
    });
  });

  test('getReviewsByReviewerId: gets reviews according to reviewers to state', () => {
    const reviews = [
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        admin: '5f229ece17d7768ccff85190',
        text: 'R&D',
        bio: 'Good',
        rating: 5,
        reviewers: ['5f2253f77944be32c38936a1']
      },
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        admin: '5f229ece17d7768ccff85190',
        text: 'R&D',
        bio: 'Good',
        rating: 3,
        reviewers: ['5f24ee06a2c4e08896cd1b3c']
      }
    ];
    const user_id = '5f24ee06a2c4e08896cd1b3c';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: reviews
      });
    });

    const reviewsByReviewerId = reviews.filter(review => {
      return review.reviewers.includes(user_id);
    });

    return store.dispatch(getReviewsByReviewerId(user_id)).then(() => {
      const newState = store.getState().review;
      expect(newState.reviews).toEqual(reviewsByReviewerId);
    });
  });

  test('deleteReview: updates reviews from state', () => {
    const reviews = [
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        text: 'R&D',
        rating: 5,
        _id: 1
      },
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        text: 'R&D',
        rating: 3,
        _id: 2
      },
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        text: 'R&D',
        rating: 2,
        _id: 3
      }
    ];
    const _id = 3;
    const store = storeFactory({
      alert: [],
      auth: {},
      profile: {},
      review: {
        reviews: reviews,
        review: null,
        loading: true,
        error: {}
      }
    });
    const newReviews = reviews.filter(review => {
      return review._id !== _id;
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    return store.dispatch(deleteReview(_id)).then(() => {
      const newState = store.getState().review;
      expect(newState.reviews).toEqual(newReviews);
    });
  });

  test('addReview: adds review to state', () => {
    const reviews = [
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        text: 'R&D',
        rating: 5,
        _id: 1
      },
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        text: 'R&D',
        rating: 3,
        _id: 2
      },
      {
        user: '5f24ee06a2c4e08896cd1b3c',
        text: 'R&D',
        rating: 2,
        _id: 3
      }
    ];

    const _id = 3;
    const formData = {
      user: '5f24ee06a2c4e08896cd1b3c',
      text: 'Finance',
      rating: 4,
      _id: 3
    };
    const employee_id = '5f24ee06a2c4e08896cd1b3c';

    const store = storeFactory({
      alert: [],
      auth: {},
      profile: {},
      review: {
        reviews: reviews,
        review: null,
        loading: true,
        error: {}
      }
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: formData
      });
    });

    return store
      .dispatch(addReview(employee_id, _id, formData, true))
      .then(() => {
        const newState = store.getState().review;
        expect(newState.reviews).toEqual([
          formData,
          ...reviews.filter(review => review._id !== _id)
        ]);
      });
  });
});
