import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteFeedback } from '../../actions/review';

const FeedbackItem = ({
  reviewId,
  feedback: { _id, text, name, avatar, user, date },
  auth,
  deleteFeedback
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteFeedback(reviewId, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  </div>
);

FeedbackItem.propTypes = {
  reviewId: PropTypes.string.isRequired,
  feedback: PropTypes.object.isRequired,
  deleteFeedback: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteFeedback }
)(FeedbackItem);
