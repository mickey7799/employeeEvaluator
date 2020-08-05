import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profiles = ({
  getProfiles,
  profile: { profiles, loading },
  auth: { user }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'> Employees List</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> View employee profiles or
            give performance reviews to each employee
          </p>
          {user && user.isAdmin && (
            <Link
              to='/admin-create-profile'
              className='btn btn-dark my-1'
              data-test='create-employee'
            >
              <i className='fas fa-user-minus'></i> Create a New Employee
            </Link>
          )}
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem
                  data-test='profile-item'
                  key={profile._id}
                  profile={profile}
                />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
