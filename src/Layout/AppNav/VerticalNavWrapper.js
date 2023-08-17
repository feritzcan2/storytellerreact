import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import {
  MainNav,
  ComponentsNav,
  FormsNav,
  WidgetsNav,
  ChartsNav,
  dateTrackerNav,
} from "./NavItems";

class Nav extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Randevu Takip</h5>
        <MetisMenu
          content={dateTrackerNav}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);
