import { setAlert } from './alert';
import axios from 'axios';
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
} from './types';

// Get reviews by employee ID
export const getReviewsByUserId = employee_id => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews`);
    const reviewsById = res.data.filter(review => {
      return review.user.toString() === employee_id;
    });

    dispatch({
      type: GET_REVIEWS,
      payload: reviewsById
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get reviews by reviewer id
export const getReviewsByReviewerId = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews`);
    let reviewsByReviewerId = [];

    if (res.data) {
      reviewsByReviewerId = res.data.filter(review => {
        return review.reviewers.includes(user_id.toString());
      });
    }

    dispatch({
      type: GET_REVIEWS,
      payload: reviewsByReviewerId
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete review
export const deleteReview = id => async dispatch => {
  try {
    await axios.delete(`/api/reviews/${id}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: id
    });

    dispatch(setAlert('Review Removed', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add review
export const addReview = (
  employee_id,
  id,
  formData,
  edited
) => async dispatch => {
  try {
    const res = await axios.post(`/api/reviews/${employee_id}/${id}`, formData);
    if (edited) {
      dispatch({ type: UPDATE_REVIEW, payload: { data: res.data, id: id } });
    } else {
      dispatch({
        type: ADD_REVIEW,
        payload: res.data
      });
    }

    dispatch(setAlert(edited ? 'Review Updated' : 'Review Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// // Update review
// export const updateReview = (user_id, id, formdata) => async dispatch => {
//   try {
//     const res = await axios.post(`/api/reviews/${user_id}/${id}`, formdata);
//     dispatch({ type: UPDATE_REVIEW, payload: { data: res.data, id: id } });
//     dispatch(setAlert('Review Updated', 'success'));
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: REVIEW_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Get review
export const getReview = id => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/${id}`);

    dispatch({
      type: GET_REVIEW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Clear review
export const clearReview = () => async dispatch => {
  dispatch({ type: CLEAR_REVIEW });
};

// Add feedback
export const addFeedback = (reviewId, formData) => async dispatch => {
  try {
    const res = await axios.post(`/api/reviews/feedback/${reviewId}`, formData);

    dispatch({
      type: ADD_FEEDBACK,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete feedback
export const deleteFeedback = (reviewId, feedbackId) => async dispatch => {
  try {
    await axios.delete(`/api/reviews/feedback/${reviewId}/${feedbackId}`);

    dispatch({
      type: REMOVE_FEEDBACK,
      payload: feedbackId
    });

    dispatch(setAlert('Feedback Removed', 'success'));
  } catch (err) {
    console.error(err);
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
