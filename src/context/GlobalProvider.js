import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  countryAppointmentData: [],
};

//const localState = JSON.parse(localStorage.getItem("cm"));

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    console.log("fethch");

    setInterval(() => {
      console.log("fethch");

      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch("http://api.vizedefteri.com/admin/countryData", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setCountryAppointmentData(result.countryData);
        })
        .catch((error) => console.log("error", error));
    }, 5000);
  }, []);

  function setCountryAppointmentData(data) {
    dispatch({
      type: "SET_COUNTRY_APPOINTMENT_DATA",
      payload: data,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        countryAppointmentData: state.countryAppointmentData,
        setCountryAppointmentData: setCountryAppointmentData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
