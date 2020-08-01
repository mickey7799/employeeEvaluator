import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFeedback } from '../../actions/review';

const FeedbackForm = ({ reviewId, addFeedback }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Give a Feedback</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addFeedback(reviewId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Give your feedback'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

FeedbackForm.propTypes = {
  addFeedback: PropTypes.func.isRequired
};

export default connect(
  null,
  { addFeedback }
)(FeedbackForm);
