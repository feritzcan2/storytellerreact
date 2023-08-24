import React, { Fragment, useContext } from "react";
import { Route } from "react-router-dom";

// COMPONENTS

import { GlobalContext } from "../../../context/GlobalProvider";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import OfficeTrackingDates from "./Components/OfficeTrackingDates";
import OfficeAvailableDates from "./Components/OfficeAvailableDates";

const CountryTrackerScreen = ({ match, data }) => {
  const { countryAppointmentData } = useContext(GlobalContext);

  return (
    <Fragment>
      <PageTitle
        heading="Randevu Takibi"
        subheading="Randevu takibi bölümünde, seçili ülkedeki randevuları anlık olarak görebilirsiniz."
        subheading2="Veriler direkt olarak ilgili ülkenin randevu sisteminden anlık olarak çekilmektedir. Güncelleme zamanı verinin kaç dakika önce çekildiğini göstermektedir."
        subheading3="Takip planlayıcı, hangi aralıklarda yer açılması durumunda size bildirim gönderileceğini belirtmektedir."
        icon="pe-7s-glasses icon-gradient bg-love-kiss"
      />
      {countryAppointmentData?.map((popover, i) => {
        return (
          popover &&
          popover.name && (
            <Route
              key={popover.name}
              path={`${match.url}/${popover.name.toLocaleLowerCase("tr-TR")}`}
              render={(props) => <CountryDetailPage data={popover} />}
            />
          )
        );
      })}
    </Fragment>
  );
};
const CountryDetailPage = (props) => {
  return (
    props.data && (
      <Fragment>
        <OfficeAvailableDates data={props.data} />
        <div spacer={5} className="divider"></div>
        <OfficeTrackingDates data={props.data} />
      </Fragment>
    )
  );
};

export default CountryTrackerScreen;
