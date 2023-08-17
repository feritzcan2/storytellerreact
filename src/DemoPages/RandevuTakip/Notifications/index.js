import React, { Fragment } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";

// Examples
import OfficeAvailableDates from "./Examples/OfficeAvailableDates";
import OfficeTrackingDates from "./Examples/TrackingDatePicker";
import { CardTitle, ModalHeader } from "reactstrap";

export default class CountryTrackerPage extends React.Component {
  render() {
    return (
      <Fragment>
        <PageTitle
          heading="Randevu Takibi"
          subheading="Notifications represent one of the best ways to give feedback for various users actions."
          icon="pe-7s-glasses icon-gradient bg-love-kiss"
        />
        <div className="mbg-3 h-auto ps-0 pe-0 bg-transparent no-border card-header">
          <div className="card-header-title fsize-2 text-capitalize fw-normal">
            <CardTitle>Uygun TARİHLER</CardTitle>
          </div>
        </div>
        <OfficeAvailableDates data={this.props.data} />
        <div
          style={{ marginTop: "3%" }}
          className="mbg-3 h-auto ps-0 pe-0 bg-transparent no-border card-header"
        >
          <div className="card-header-title fsize-2 text-capitalize fw-normal">
            <CardTitle>TAKİP PLANLAYICI</CardTitle>
          </div>
        </div>
        <OfficeTrackingDates data={this.props.data} />
      </Fragment>
    );
  }
}
