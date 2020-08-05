import {
  GET_REVIEWS,
  REVIEW_ERROR,
  DELETE_REVIEW,
  ADD_REVIEW,
  UPDATE_REVIEW,
  GET_REVIEW,
  CLEAR_REVIEW,
  ADD_FEEDBACK,
  REMOVE_FEEDBACK
} from '../actions/types';

import reviewReducer from './review';

describe('Review reducer testing', () => {
  const defaultState = { reviews: [], review: null, loading: true, error: {} };
  const review = {
    user: '5f24ee06a2c4e08896cd1b3c',
    _id: 1,
    admin: '5f229ece17d7768ccff85190',
    text: 'R&D',
    bio: 'Good',
    rating: 5,
    reviewers: ['5f2253f77944be32c38936a1'],
    feedbacks: [
      {
        _id: 1,
        text: 'Good'
      }
    ]
  };
  const reviews = [
    {
      user: '5f24ee06a2c4e08896cd1b3c',
      _id: 1,
      admin: '5f229ece17d7768ccff85190',
      text: 'R&D',
      bio: 'Good',
      rating: 4,
      reviewers: ['5f2253f77944be32c38936a1'],
      feedbacks: [
        {
          _id: 1,
          text: 'Good'
        }
      ]
    },
    {
      user: '5f24ee06a2c4e08896cd1b3c',
      _id: 2,
      admin: '5f229ece17d7768ccff85190',
      text: 'R&D',
      bio: 'Good',
      rating: 5,
      reviewers: ['5f2253f77944be32c38936a1'],
      feedbacks: [
        {
          _id: 1,
          text: 'Good'
        }
      ]
    }
  ];
  test('returns default initial state when no action is passed', () => {
    const newState = reviewReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });
  test('returns state of "false" on loading and add reviews upon receiving an action of type `GET_REVIEWS`', () => {
    const newState = reviewReducer(undefined, {
      type: GET_REVIEWS,
      payload: reviews
    });
    expect(newState.loading).toBe(false);
    expect(newState.reviews).toEqual(reviews);
  });
  test('returns state of "false" on loading and add error upon receiving an action of type `REVIEW_ERROR`', () => {
    const payload = { msg: 'Profile updated', alertType: 'success', id: 1 };
    const newState = reviewReducer(undefined, { type: REVIEW_ERROR, payload });
    expect(newState.loading).toBe(false);
    expect(newState.error).toEqual(payload);
  });
  test('returns state of "false" on loading and delete one review from reviews upon receiving an action of type `DELETE_REVIEW`', () => {
    const newState = reviewReducer(
      { ...defaultState, reviews },
      { type: DELETE_REVIEW, payload: 1 }
    );
    expect(newState.loading).toBe(false);
    expect(newState.reviews.length).toBe(1);
  });

  test('returns state of "false" on loading and review to reviews upon receiving an action of type `ADD_REVIEW`', () => {
    const newState = reviewReducer(undefined, {
      type: ADD_REVIEW,
      payload: review
    });
    expect(newState.loading).toBe(false);
    expect(newState.reviews.length).toBe(1);
  });

  test('returns state of "false" on loading and update review by id upon receiving an action of type `UPDATE_REVIEW`', () => {
    const payload = { data: review, id: 1 };
    const newState = reviewReducer(
      { ...defaultState, reviews },
      {
        type: UPDATE_REVIEW,
        payload
      }
    );
    expect(newState.loading).toBe(false);
    expect(newState.reviews.find(review => review._id === 1)).toEqual(review);
  });

  test('returns state of "false" on loading and add one review to review upon receiving an action of type `GET_REVIEW`', () => {
    const newState = reviewReducer(undefined, {
      type: GET_REVIEW,
      payload: review
    });
    expect(newState.loading).toBe(false);
    expect(newState.review).toEqual(review);
  });

  test('returns state of null on review upon receiving an action of type `CLEAR_REVIEW`', () => {
    const newState = reviewReducer(
      { ...defaultState, review },
      { type: CLEAR_REVIEW }
    );
    expect(newState.review).toBeNull();
  });
  test('returns state of "false" on loading and add feedback to review upon receiving an action of type `ADD_FEEDBACK`', () => {
    const payload = { text: 'Good', _id: 1, name: 'Amy' };
    const newState = reviewReducer(
      { ...defaultState, review },
      { type: ADD_FEEDBACK, payload }
    );
    expect(newState.loading).toBe(false);
    expect(newState.review.feedbacks).toEqual(payload);
  });
  test('returns state of "false" on loading and remove feedback by id from review upon receiving an action of type `REMOVE_FEEDBACK`', () => {
    const newState = reviewReducer(
      {
        ...defaultState,
        review: {
          ...review,
          feedbacks: [
            { text: 'Good', _id: 1, name: 'Amy' },
            { text: 'Good', _id: 2, name: 'Andy' }
          ]
        }
      },
      { type: REMOVE_FEEDBACK, payload: 1 }
    );
    expect(newState.loading).toBe(false);
    expect(newState.review.feedbacks).toEqual([
      {
        text: 'Good',
        _id: 2,
        name: 'Andy'
      }
    ]);
  });
});
