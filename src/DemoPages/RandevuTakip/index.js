import React, { Fragment, useContext } from "react";
import { Route } from "react-router-dom";

// COMPONENTS

import CountryTrackerPage from "./Notifications/CountryTrackerPage";
import { GlobalContext } from "../../context/GlobalProvider";

// Tooltips & Popovers

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

const Components = ({ match, data }) => {
  const { countryAppointmentData } = useContext(GlobalContext);

  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            {countryAppointmentData?.map((popover, i) => {
              return (
                popover &&
                popover.name && (
                  <Route
                    key={popover.name}
                    path={`${match.url}/${popover.name.toLowerCase()}`}
                    render={(props) => <CountryTrackerPage data={popover} />}
                  />
                )
              );
            })}
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
};

export default Components;
