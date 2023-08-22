import api from "./api";
import { useContext, useReducer } from "react";
import { GlobalContext } from "../context/GlobalProvider";

export default function CountryService() {
  let { setCountryAppointmentData, setUserData, userData } =
    useContext(GlobalContext);

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

  const addMail = async (data, errorMsg) => {
    const { name, mail } = data;
    return api
      .post("mail", {
        name,
        mail,
      })
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          let newData = userData;
          newData.mailList = result.data;
          setUserData(newData);
          console.log("set usd");
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
  const deleteMail = async (data, errorMsg) => {
    const { email } = data;
    return api
      .delete("mail?Email=" + email)
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          let newData = userData;
          newData.mailList = result.data;
          setUserData(newData);
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
    addMail,
    deleteMail,
  };
}
