import React, { Fragment, Suspense, useContext } from "react";
import { Route } from "react-router-dom";

// COMPONENTS

import { Loader } from "react-bootstrap-typeahead";
import CustomerListScreen from "./CustomerList/CustomerListScreen";
const CustomersPage = ({ match, data }) => {
  return (
    <Suspense
      fallback={
        <div className="loader-container">
          <div className="loader-container-inner">
            <div className="text-center">
              <Loader type="ball-pulse-rise" />
            </div>
            <h6 className="mt-5">
              Please wait while we load all the Components examples
              <small>
                Because this is a demonstration we load at once all the
                Components examples. This wouldn't happen in a real live app!
              </small>
            </h6>
          </div>
        </div>
      }
    >
      <Route path="/musteri/liste" component={CustomerListScreen} />
    </Suspense>
  );
};

export default CustomersPage;
