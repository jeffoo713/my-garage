import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Navigator from './components/navigator/navigator.component';
import Homepage from './components/pages/homepage/homepage.component';
import MyPage from './components/pages/my-page/my-page.component';
import AddVehiclePage from './components/pages/add-vehicle/add-vehicle-page.component';
import SignInPage from './components/pages/sign-in/sign-in.component';
import SignUpPage from './components/pages/sign-up/sign-up.component';
import VehicleDetailPage from './components/pages/vehicle-detail/vehicle-detail.component';
import AddVehicleServicePage from './components/pages/add-service-history/add-service-history.component';
import ErrorBanner from './components/error-banner/error-banner.component';

import { selectErrorMessage } from './redux/error/error.selectors';

import './App.scss';

const App = ({ errorMessage }) => {
  return (
    <div className='app'>
      <Navigator />
      {/* is it good idea put an error message on app? since when error occurs, the whole app.js will rerender. */}
      <ErrorBanner display={errorMessage && true}>{errorMessage}</ErrorBanner>
      <div className='main'>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/sign-in' component={SignInPage} />
          <Route exact path='/sign-up' component={SignUpPage} />
          <Route exact path='/my-page' component={MyPage} />
          <Route exact path='/my-page/add-vehicle' component={AddVehiclePage} />
          <Route path='/my-page/:vehicleId/edit' component={AddVehiclePage} />
          <Route
            path='/my-page/:vehicleId/add-service'
            component={AddVehicleServicePage}
          />
          <Route
            path='/my-page/:vehicleId/:serviceId'
            component={AddVehicleServicePage}
          />
          <Route path='/my-page/:vehicleId' component={VehicleDetailPage} />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps)(App);
