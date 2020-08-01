import {
  GET_REVIEWS,
  REVIEW_ERROR,
  DELETE_REVIEW,
  ADD_REVIEW,
  GET_REVIEW,
  ADD_FEEDBACK,
  REMOVE_FEEDBACK
} from '../actions/types';

const initialState = {
  reviews: [],
  review: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false
      };
    case GET_REVIEW:
      return {
        ...state,
        review: payload,
        loading: false
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [payload, ...state.reviews],
        loading: false
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== payload),
        loading: false
      };
    case REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case ADD_FEEDBACK:
      return {
        ...state,
        review: { ...state.review, feedbacks: payload },
        loading: false
      };
    case REMOVE_FEEDBACK:
      return {
        ...state,
        review: {
          ...state.review,
          feedbacks: state.review.feedbacks.filter(
            feedback => feedback._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
