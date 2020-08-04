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
  test('returns default initial state when no action is passed', () => {
    const newState = reviewReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });
  test('returns state of "false" on loading and not null on review upon receiving an action of type `GET_REVIEWS`', () => {
    const newState = reviewReducer(undefined, { type: GET_REVIEWS });
    expect(newState.loading).toBe(false);
    expect(newState.reviews).not.toBe(null);
  });
  test('returns state of "false" on loading and not null on error upon receiving an action of type `REVIEW_ERROR`', () => {
    const newState = reviewReducer(undefined, { type: REVIEW_ERROR });
    expect(newState.loading).toBe(false);
    expect(newState.error).not.toBe(null);
  });
  test('returns state of "false" on loading upon receiving an action of type `DELETE_REVIEW`', () => {
    const newState = reviewReducer(undefined, { type: DELETE_REVIEW });
    expect(newState.loading).toBe(false);
  });

  test('returns state of "false" on loading upon receiving an action of type `ADD_REVIEW`', () => {
    const newState = reviewReducer(
      { ...defaultState, review },
      { type: ADD_REVIEW }
    );
    expect(newState.loading).toBe(false);
    expect(newState.reviews).not.toBe(null);
  });

  test('returns state of "false" on loading and not null on review upon receiving an action of type `GET_REVIEW`', () => {
    const newState = reviewReducer(undefined, { type: GET_REVIEW });
    expect(newState.loading).toBe(false);
    expect(newState.review).not.toBe(null);
  });

  test('returns state of null on review upon receiving an action of type `CLEAR_REVIEW`', () => {
    const newState = reviewReducer(
      { ...defaultState, review },
      { type: CLEAR_REVIEW }
    );
    expect(newState.review).toBeNull();
  });
  test('returns state of "false" on loading and not null on review upon receiving an action of type `ADD_FEEDBACK`', () => {
    const newState = reviewReducer(
      { ...defaultState, review },
      { type: ADD_FEEDBACK }
    );
    expect(newState.loading).toBe(false);
    expect(newState.review).not.toBe(null);
  });
  test('returns state of "false" on loading upon receiving an action of type `REMOVE_FEEDBACK`', () => {
    const newState = reviewReducer(
      { ...defaultState, review },
      { type: REMOVE_FEEDBACK }
    );
    expect(newState.loading).toBe(false);
  });
});
