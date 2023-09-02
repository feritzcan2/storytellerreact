import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment, useEffect } from "react";
import Loader from "react-loaders";

import { ToastContainer } from "react-toastify";
import ProtectedRoute from "../../screens/Login/Components/ProtectedRoute";
import CountryTrackerPage from "../../screens/RandevuTakip/CountryTrackerPage";
import CustomersPage from "../../screens/Customers/CustomersPage";

export const AppMainRoutes = () => {
  return (
    <ProtectedRoute>
      <CountryTrackerPage />
      <CustomersPage />
      <Route exact path="/" render={() => <Redirect to="/dashboards/crm" />} />
      <ToastContainer />
    </ProtectedRoute>
  );
};