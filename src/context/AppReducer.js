export default (state, action) => {
  switch (action.type) {
    case 'SET_COUNTRY_APPOINTMENT_DATA':
      return {
        ...state,
        countryAppointmentData: action.payload,
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    case 'SET_CUSTOMER_NAMES':
      return {
        ...state,
        customerNames: action.payload,
      };
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    case 'SET_CUSTOMERS':
      return {
        ...state,
        customerList: action.payload,
      };
    case 'SET_DASHBOARD_DATA':
      return {
        ...state,
        dashboardData: action.payload,
      };
    case 'SET_CONFIGS':
      return {
        ...state,
        configs: action.payload,
      };
    case 'SET_CALENDAR_DATA':
      return {
        ...state,
        calendarData: action.payload,
      };
    default:
      return state;
  }
};
