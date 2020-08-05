import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import { getProfileById, deleteEmployee } from '../../actions/profile';

export const UnconnectedProfile = ({
  getProfileById,
  deleteEmployee,
  profile: { profile, loading },
  auth,
  match: { params },
  history
}) => {
  useEffect(() => {
    getProfileById(params.id);
  }, [getProfileById, params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner data-test='component-spinner' />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>

          {auth.isAuthenticated &&
            auth.loading === false &&
            (auth.user._id === profile.user._id || auth.user.isAdmin) && (
              <Link
                data-test='edit-profile'
                to='/edit-profile'
                className='btn btn-dark'
              >
                Edit Profile
              </Link>
            )}
          {auth.user.isAdmin && (
            <button
              data-test='delete-button'
              className='btn btn-danger'
              onClick={() => {
                deleteEmployee(params.id, history);
              }}
            >
              <i className='fas fa-user-minus'></i> Delete This Employee
            </button>
          )}
          <div className='profile-grid my-1'>
            <ProfileTop data-test='component-profile-top' profile={profile} />
            <ProfileAbout
              data-test='component-profile-about'
              profile={profile}
            />

            {profile.githubusername && (
              <ProfileGithub
                data-test='component-profile-github'
                username={profile.githubusername}
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

UnconnectedProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById, deleteEmployee }
)(UnconnectedProfile);
