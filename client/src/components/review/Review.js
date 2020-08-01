import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ReviewItem from '../reviews/ReviewItem';
import FeedbackForm from './FeedbackForm';
import FeedbackItem from './FeedbackItem';
import { getReview } from '../../actions/review';

const Review = ({ getPost, review: { review, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || review === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/reviews' className='btn'>
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
  getPost: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  review: state.review
});

export default connect(
  mapStateToProps,
  { getPost: getReview }
)(Review);
