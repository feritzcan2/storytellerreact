import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  countryAppointmentData: [],
  userData: null,
  customerList: null,
  configs: null,
  notifications: [],
  dashboardData: null,
  calendarData: null,
};

//const localState = JSON.parse(localStorage.getItem("cm"));

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setCountryAppointmentData(data) {
    dispatch({
      type: 'SET_COUNTRY_APPOINTMENT_DATA',
      payload: data,
    });
  }
  function setCalendarData(data) {
    dispatch({
      type: 'SET_CALENDAR_DATA',
      payload: data,
    });
  }
  function setDashboardData(data) {
    dispatch({
      type: 'SET_DASHBOARD_DATA',
      payload: data,
    });
  }
  function setNotifications(data) {
    dispatch({
      type: 'SET_NOTIFICATIONS',
      payload: data,
    });
  }
  function setCustomers(data) {
    dispatch({
      type: 'SET_CUSTOMERS',
      payload: data,
    });
  }

  function setConfigs(data) {
    dispatch({
      type: 'SET_CONFIGS',
      payload: data,
    });
  }

  function setUserData(data) {
    dispatch({
      type: 'SET_USER_DATA',
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
        customerList: state.customerList,
        setCustomers: setCustomers,
        setConfigs: setConfigs,
        configs: state.configs,
        notifications: state.notifications,
        setNotifications: setNotifications,
        dashboardData: state.dashboardData,
        setDashboardData: setDashboardData,
        setCalendarData: setCalendarData,
        calendarData: state.calendarData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
