import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import CreateEmployee from '../profile-forms/CreateEmployee';
import Reviews from '../reviews/Reviews';
import Review from '../review/Review';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/admin-create-profile' component={CreateEmployee} />
        <Route path='/profiles' component={Profiles} />
        <Route path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/reviews' component={Reviews} />
        <PrivateRoute exact path='/reviews/:id' component={Reviews} />
        <PrivateRoute exact path='/review/:id' component={Review} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
