import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    department,
    skills
  },
  id
}) => {
  return (
    <div className='profile bg-light' key={id}>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} <span> at {department} department</span>
        </p>

        <Link to={`/profile/${_id}`} className='btn btn-primary my-1'>
          View Profile
        </Link>
        <Link to={`/reviews/${_id}`} className='btn btn-primary my-1'>
          View Performance Review
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
