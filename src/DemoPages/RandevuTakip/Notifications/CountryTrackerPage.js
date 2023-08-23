import React, { Fragment, useContext } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";
// Examples
import OfficeAvailableDates from "./Examples/OfficeAvailableDates";
import OfficeTrackingDates from "./Examples/TrackingDatePicker";
import { CardTitle, ModalHeader } from "reactstrap";

const CountryTrackerPage = (props) => {
  return (
    props.data && (
      <Fragment>
        <PageTitle
          heading="Randevu Takibi"
          subheading="Randevu takibi bölümünde, seçili ülkedeki randevuları anlık olarak görebilirsiniz."
          subheading2="Veriler direkt olarak ilgili ülkenin randevu sisteminden anlık olarak çekilmektedir. Güncelleme zamanı verinin kaç dakika önce çekildiğini göstermektedir."
          subheading3="Takip planlayıcı, hangi aralıklarda yer açılması durumunda size bildirim gönderileceğini belirtmektedir."
          icon="pe-7s-glasses icon-gradient bg-love-kiss"
        />

        <OfficeAvailableDates data={props.data} />
        <div spacer={5} className="divider"></div>
        <OfficeTrackingDates data={props.data} />
      </Fragment>
    )
  );
};

export default CountryTrackerPage;
