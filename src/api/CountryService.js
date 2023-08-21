import api from "./api";
import { useContext, useReducer } from "react";
import { GlobalContext } from "../context/GlobalProvider";

export default function CountryService() {
  let { setCountryAppointmentData } = useContext(GlobalContext);

  const getCountryData = async (data, errorMsg) => {
    return api
      .get("countryData")
      .then(async (result) => {
        if (result !== undefined && result.data.error === null) {
          setCountryAppointmentData(result.data.countryData);
        } else {
          if (errorMsg !== undefined) errorMsg(result.data.error.message);
        }
      })
      .catch((err) => {
        if (errorMsg !== undefined)
          errorMsg(
            "Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com",
            "danger"
          );
      });
  };

  return {
    getCountryData,
  };
}
