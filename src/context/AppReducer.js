export default (state, action) => {
  switch (action.type) {
    case "SET_COUNTRY_APPOINTMENT_DATA":
      return {
        ...state,
        countryAppointmentData: action.payload,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
