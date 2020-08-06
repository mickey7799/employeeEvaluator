import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ReviewItem from '../reviews/ReviewItem';
import FeedbackForm from './FeedbackForm';
import FeedbackItem from './FeedbackItem';
import { getReview } from '../../actions/review';

const Review = ({ getReview, auth, review: { review, loading }, match }) => {
  useEffect(() => {
    getReview(match.params.id);
  }, [getReview, match.params.id]);

  return loading || review === null ? (
    <Spinner data-test='component-spinner' />
  ) : (
    <Fragment>
      <Link to={`/reviews/${review.user}`} className='btn'>
        Back To Performance Reviews
      </Link>
      <ReviewItem
        data-test='component-review-item'
        review={review}
        showActions={false}
      />
      <FeedbackForm data-test='component-feedback-form' reviewId={review._id} />
      <div className='comments'>
        {review.feedbacks.map(feedback => (
          <FeedbackItem
            data-test='component-feedback-item'
            auth={auth}
            key={feedback._id}
            feedback={feedback}
            reviewId={review._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  review: state.review,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getReview }
)(Review);
