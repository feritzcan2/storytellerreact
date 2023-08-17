import React, { Fragment } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { withRouter } from "react-router-dom";

import ResizeDetector from "react-resize-detector";

import AppMain from "../../Layout/AppMain";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closedSmallerSidebar: false,
      width: undefined,
      data: [],
    };
    setInterval(this.getData, 10000);
    this.getData();
  }

  getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://triviastars-env.eba-vqcrvzer.eu-central-1.elasticbeanstalk.com/admin/countryData",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: result.countryData });
      })
      .catch((error) => console.log("error", error));
  };
  onResize = (width) => this.setState({ width });

  render() {
    const { width } = this.state;

    let {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      enableClosedSidebar,
      closedSmallerSidebar,
      enableMobileMenu,
      enablePageTabsAlt,
    } = this.props;

    return (
      <Fragment>
        <div
          className={cx(
            "app-container app-theme-" + colorScheme,
            { "fixed-header": enableFixedHeader },
            { "fixed-sidebar": enableFixedSidebar || width < 1250 },
            { "fixed-footer": enableFixedFooter },
            { "closed-sidebar": enableClosedSidebar || width < 1250 },
            { "closed-sidebar-mobile": closedSmallerSidebar || width < 1250 },
            { "sidebar-mobile-open": enableMobileMenu }
          )}
        >
          <AppMain data={this.state.data} />
          <ResizeDetector handleWidth onResize={this.onResize} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProp = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme,
  enableFixedHeader: state.ThemeOptions.enableFixedHeader,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
});

export default withRouter(connect(mapStateToProp)(Main));
