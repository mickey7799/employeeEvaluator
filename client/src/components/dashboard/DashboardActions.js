import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DashboardActions = ({ user }) => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light p-1'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      {user !== null && user.isAdmin ? (
        <Link to='/profiles' className='btn btn-light p-1'>
          <i className='fab fa-black-tie text-primary'></i> View Employees
        </Link>
      ) : (
        <Link to='/reviews' className='btn btn-light p-1'>
          <i className='fas fa-graduation-cap text-primary'></i> Give Feedbacks
        </Link>
      )}
    </div>
  );
};

DashboardActions.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(DashboardActions);
