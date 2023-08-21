export default (state, action) => {
  switch (action.type) {
    case "SET_COUNTRY_APPOINTMENT_DATA":
      return {
        ...state,
        countryAppointmentData: action.payload,
      };
    default:
      return state;
  }
};
