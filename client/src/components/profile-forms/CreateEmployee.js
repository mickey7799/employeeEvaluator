import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { createEmployee } from '../../actions/profile';

const CreateEmployee = ({ createEmployee, setAlert, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    isAdmin: false,
    department: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: ''
  });

  const {
    name,
    email,
    password,
    password2,
    isAdmin,
    department,
    status,
    skills,
    githubusername,
    bio
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger');
    } else {
      createEmployee(formData, history);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>
        Create The Employee Account & Profile
      </h1>
      <small>* = required field</small>

      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            required
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            required
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            minLength='6'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            minLength='6'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='isAdmin'
              checked={isAdmin}
              value={isAdmin}
              onChange={e => {
                setFormData({ ...formData, isAdmin: !isAdmin });
              }}
            />{' '}
            Set this employee to be an admin user
          </p>
        </div>
        <div className='form-group'>
          <select
            name='department'
            value={department}
            onChange={e => onChange(e)}
          >
            <option value='0'>* Select The Department</option>
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
            placeholder='* Role'
            name='status'
            value={status}
            onChange={e => onChange(e)}
          />
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
            Include its username for employees in R&D department
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of its introduction'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/profiles'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateEmployee.propTypes = {
  createEmployee: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { createEmployee, setAlert }
)(withRouter(CreateEmployee));
