import React, { Fragment, Suspense, useContext } from "react";
import { Route } from "react-router-dom";

// COMPONENTS

import { GlobalContext } from "../../context/GlobalProvider";
import PageTitle from "../../Layout/AppMain/PageTitle";
import OfficeTrackingDates from "./CountryTracker/Components/OfficeTrackingDates";
import OfficeAvailableDates from "./CountryTracker/Components/OfficeAvailableDates";
import { Loader } from "react-bootstrap-typeahead";
import CountryTrackerScreen from "./CountryTracker/CountryTrackerScreen";
import NotificationSettingsScreen from "./NotificationSettings/NotificationSettingsScreen";

const CountryTrackerPage = ({ match, data }) => {
  return (
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
      <Route path="/randevuTakibi" component={CountryTrackerScreen} />
      <Route path="/bildirimAyarlari" component={NotificationSettingsScreen} />
    </Suspense>
  );
};

export default CountryTrackerPage;
