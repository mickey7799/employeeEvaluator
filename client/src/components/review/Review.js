import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ReviewItem from '../reviews/ReviewItem';
import FeedbackForm from './FeedbackForm';
import FeedbackItem from './FeedbackItem';
import { getReview, clearReview } from '../../actions/review';

const Review = ({
  getReview,
  clearReview,
  review: { review, loading },
  match
}) => {
  useEffect(() => {
    getReview(match.params.id);
  }, [getReview, match.params.id]);

  return loading || review === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link
        to={`/reviews/${review.user}`}
        className='btn'
        onClick={() => clearReview()}
      >
        Back To Performance Reviews
      </Link>
      <ReviewItem review={review} showActions={false} />
      <FeedbackForm reviewId={review._id} />
      <div className='comments'>
        {review.feedbacks.map(feedback => (
          <FeedbackItem
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
  clearReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  review: state.review
});

export default connect(
  mapStateToProps,
  { getReview, clearReview }
)(Review);
