import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';
import {
  getReviewsByUserId,
  getReviewsByReviewerId
} from '../../actions/review';
import { getProfiles } from '../../actions/profile';

const Reviews = ({
  getReviewsByUserId,
  getReviewsByReviewerId,
  getProfiles,
  review: { reviews },
  profile: { profiles },
  auth: { user },
  match: { params }
}) => {
  useEffect(() => {
    if (user.isAdmin) getReviewsByUserId(params.id);
    else getReviewsByReviewerId(user._id);
    getProfiles();
  }, [getReviewsByUserId, getReviewsByReviewerId, getProfiles]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Performance Reviews</h1>
      {user.isAdmin ? (
        <div>
          <p className='lead'>
            <i className='fas fa-user' /> Please give performance reviews to
            employees
          </p>
          <ReviewForm employee_id={params.id} profiles={profiles} />
        </div>
      ) : (
        <p className='lead'>
          <i className='fas fa-user' /> Please view each reviewee's performance
          review below and give feedbacks
        </p>
      )}

      <div className='posts'>
        {reviews &&
          reviews.map(review => (
            <ReviewItem key={review._id} review={review} />
          ))}
      </div>
    </Fragment>
  );
};

Reviews.propTypes = {
  getReviewsByUserId: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getReviewsByReviewerId: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  review: state.review,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getReviewsByUserId, getProfiles, getReviewsByReviewerId }
)(Reviews);
