import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";

import { ToastContainer } from "react-toastify";

const RandevuTakip = lazy(() => import("../../DemoPages/RandevuTakip"));
const NotificationSettings = lazy(() =>
  import("../../DemoPages/NotificationSettings")
);

const AppMain = (data) => {
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Lütfen site yüklenirken bekleyin.
                <small>Randevular güncelleniyor....</small>
              </h6>
            </div>
          </div>
        }
      >
        <Route
          path="/randevuTakibi"
          render={(props) => <RandevuTakip {...props} data={data} />}
        />
        <Route
          path="/bildirimAyarlari"
          render={(props) => <NotificationSettings {...props} data={data} />}
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
