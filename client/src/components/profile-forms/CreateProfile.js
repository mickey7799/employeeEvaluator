import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    department: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: ''
  });

  const { department, status, skills, githubusername, bio } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to help our
        performance review process
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select
            name='department'
            value={department}
            onChange={e => onChange(e)}
          >
            <option value='0'>* Select Your Department</option>
            <option value='HR'>HR</option>
            <option value='Marketing'>Marketing</option>
            <option value='Finance'>Finance</option>
            <option value='Purchase'>Purchase</option>
            <option value='Sales'>Sales</option>
            <option value='R&D'>R&D</option>
            <option value='Quality Assurance'>Quality Assurance</option>
            <option value='Operations'>Operations</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Role'
            name='status'
            value={status}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Your role in your department</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            If you are in R&D department, please include your username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
