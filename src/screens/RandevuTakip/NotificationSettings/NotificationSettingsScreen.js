import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// COMPONENTS

// Tooltips & Popovers

// Layout

import AppHeader from "../../../Layout/AppHeader";
import AppSidebar from "../../../Layout/AppSidebar";
import AppFooter from "../../../Layout/AppFooter";
import { NotificationEmailTable } from "./Components/NotificationEmailTable";

const NotificationSettingsScreen = ({ match, data }) => (
  <Fragment>
    <NotificationEmailTable />
  </Fragment>
);

export default NotificationSettingsScreen;
