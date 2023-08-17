import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// COMPONENTS

import CountryTrackerPage from "./Notifications/";

// Tooltips & Popovers

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

const Components = ({ match, data }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      {console.log(data)}

      <AppSidebar data={data} />
      <div className="app-main__outer">
        <div className="app-main__inner">
          {data.data.map((popover, i) => {
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

export default Components;
