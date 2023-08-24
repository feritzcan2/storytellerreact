import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment, useEffect } from "react";
import Loader from "react-loaders";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";
import CountryService from "../../api/CountryService";
import AuthService from "../../api/AuthService";
import { isAuthenticated } from "../../context/AuthContext";
import { AppMainRoutes } from "./AppMainRoutes";

const Login = lazy(() => import("../../screens/Login/LoginPage"));

const AppMain = () => {
  const { getCountryData } = CountryService();
  const { getUserData } = AuthService();

  useEffect(() => {
    if (isAuthenticated()) {
      getUserData();
      getCountryData();
    }
    setInterval(() => {
      if (isAuthenticated()) {
        getCountryData();
      }
    }, 5000);
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
      <Fragment>
        <AppHeader />
        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <Route path="*" name="Home" component={AppMainRoutes} />
            </div>

            <AppFooter />
          </div>
        </div>
      </Fragment>
      ;
    </Fragment>
  );
};

export default AppMain;
