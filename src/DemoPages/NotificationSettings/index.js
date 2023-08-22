import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// COMPONENTS

// Tooltips & Popovers

// Layout

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";
import { NotificationEmailTable } from "./Notifications/NotificationEmailTable";

const NotificationSettings = ({ match, data }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar data={data} />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <NotificationEmailTable />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default NotificationSettings;
