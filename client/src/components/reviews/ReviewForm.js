import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReview } from '../../actions/review';

const ReviewForm = ({ addPost, employee_id, profiles }) => {
  const [formData, setFormData] = useState({
    reviewers: '',
    rating: '',
    text: ''
  });

  const { reviewers, rating, text } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addPost(employee_id, formData);
    setFormData({
      reviewers: '',
      rating: '',
      text: ''
    });
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Time to give performace reviews...</h3>
      </div>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='rating' value={rating} onChange={e => onChange(e)}>
            <option value='0'>* Select The Rating</option>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
          <small className='form-text'>5 (Very good) - 1 (Not good)</small>
        </div>
        <div className='form-group'>
          <textarea
            cols='30'
            rows='5'
            placeholder='Say Something about this employee...'
            name='text'
            value={text}
            onChange={e => onChange(e)}
            required
          />
          <small className='form-text'>How does this employee perform?</small>
        </div>

        <div className='form-group'>
          <select
            name='reviewers'
            value={reviewers}
            onChange={e => onChange(e)}
          >
            <option value='0'>* Select The Reviewer</option>
            {profiles.map(profile => (
              <option key={profile.user._id} value={profile.user._id}>
                {profile.user.name}
              </option>
            ))}
          </select>
          <small className='form-text'>
            Choose reviewers for this employee
          </small>
        </div>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost: addReview }
)(ReviewForm);
