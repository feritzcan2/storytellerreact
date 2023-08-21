import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment, useEffect } from "react";
import Loader from "react-loaders";

import { ToastContainer } from "react-toastify";
import ProtectedRoute from "../../DemoPages/Auth/ProtectedRoute";
import CountryService from "../../api/CountryService";
const RandevuTakip = lazy(() => import("../../DemoPages/RandevuTakip"));
const Login = lazy(() => import("../../DemoPages/Login"));

const AppMain = () => {
  const { getCountryData } = CountryService();

  useEffect(() => {
    setInterval(() => getCountryData(), 5000);
  }, []);

  return (
    <Fragment>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
              <h6 className="mt-5">
                Please wait while we load all the Components examples
                <small>
                  Because this is a demonstration we load at once all the
                  Components examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route name="Login page" path="/login" component={Login} />
      </Suspense>

      <Route path="*" name="Home" component={AppRoutes} />
    </Fragment>
  );
};

const AppRoutes = () => {
  return (
    <ProtectedRoute>
      {/* Components */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
              <h6 className="mt-5">
                Please wait while we load all the Components examples
                <small>
                  Because this is a demonstration we load at once all the
                  Components examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/randevuTakibi" component={RandevuTakip} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-grid-cy" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all the Dashboards examples
                <small>
                  Because this is a demonstration, we load at once all the
                  Dashboards examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/dashboards" component={RandevuTakip} />
      </Suspense>

      <Route exact path="/" render={() => <Redirect to="/dashboards/crm" />} />
      <ToastContainer />
    </ProtectedRoute>
  );
};

export default AppMain;
