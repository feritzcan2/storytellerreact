import React, { Fragment, useContext } from "react";
import { Route } from "react-router-dom";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import CustomerTable from "./Components/CustomerTable";

// COMPONENTS

const CustomerListScreen = ({ match, data }) => {
  return (
    <Fragment>
      <PageTitle
        heading="Randevu Takibi"
        subheading="Randevu takibi bölümünde, seçili ülkedeki randevuları anlık olarak görebilirsiniz."
        subheading2="Veriler direkt olarak ilgili ülkenin randevu sisteminden anlık olarak çekilmektedir. Güncelleme zamanı verinin kaç dakika önce çekildiğini göstermektedir."
        subheading3="Takip planlayıcı, hangi aralıklarda yer açılması durumunda size bildirim gönderileceğini belirtmektedir."
        icon="pe-7s-glasses icon-gradient bg-love-kiss"
      />
      <CustomerTable />
    </Fragment>
  );
};

export default CustomerListScreen;
