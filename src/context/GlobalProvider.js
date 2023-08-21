import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import CountryService from "../api/CountryService";

const initialState = {
  countryAppointmentData: [],
  userData: null,
};

//const localState = JSON.parse(localStorage.getItem("cm"));

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setCountryAppointmentData(data) {
    dispatch({
      type: "SET_COUNTRY_APPOINTMENT_DATA",
      payload: data,
    });
  }

  function setUserData(data) {
    dispatch({
      type: "SET_USER_DATA",
      payload: data,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        countryAppointmentData: state.countryAppointmentData,
        userData: state.userData,
        setCountryAppointmentData: setCountryAppointmentData,
        setUserData: setUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
