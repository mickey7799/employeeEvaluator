import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteReview, getReview } from '../../actions/review';

const ReviewItem = ({
  deleteReview,
  getReview,
  auth,
  review: { _id, text, name, avatar, user, admin, feedbacks, rating, date },
  showActions
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>Reviewee: {name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>
        <strong>Comments:</strong> {text}
      </p>
      <strong>Rating:</strong> {rating}
      <span className='px'>
        <i className='fas fa-star' />
      </span>
      <p className='post-date my-1'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {showActions && (
        <Fragment>
          <Link to={`/review/${_id}`} className='btn btn-primary'>
            Feedbacks{' '}
            {feedbacks.length > 0 && (
              <span className='comment-count'>{feedbacks.length}</span>
            )}
          </Link>

          {!auth.loading && auth.user.isAdmin && admin === auth.user._id ? (
            <Fragment>
              <button
                onClick={() => getReview(_id)}
                type='button'
                className='btn btn-light'
              >
                Edit Review
              </button>
              <button
                onClick={() => deleteReview(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
            </Fragment>
          ) : null}
        </Fragment>
      )}
    </div>
  </div>
);

ReviewItem.defaultProps = {
  showActions: true
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired,
  getReview: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteReview, getReview }
)(ReviewItem);
