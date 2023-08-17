import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";

import { ToastContainer } from "react-toastify";

const RandevuTakip = lazy(() => import("../../DemoPages/RandevuTakip"));

const AppMain = (data) => {
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Elements examples
                <small>
                  Because this is a demonstration we load at once all the
                  Elements examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route
          path="/randevuTakibi"
          render={(props) => <RandevuTakip {...props} data={data} />}
        />
      </Suspense>
      {/* Charts */}

      <Route
        exact
        path="/"
        render={() => <Redirect to="/randevuTakibi/almanya" />}
      />
      <ToastContainer />
    </Fragment>
  );
};

export default AppMain;
