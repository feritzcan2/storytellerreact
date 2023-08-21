import { useHistory } from "react-router-dom";
import { setToken } from "../context/AuthContext";
import api from "./api";
import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";

export default function UserAuth() {
  let history = useHistory();
  let { setUserData } = useContext(GlobalContext);

  const setUserContext = async (result) => {
    setToken(result.data.tokenData.jwtToken);
    setUserData(result.data);
    return history.push("/");
  };

  const loginUser = async (data, errorMsg) => {
    const { username, password } = data;
    return api
      .post("login", {
        username,
        password,
      })
      .then(async (result) => {
        if (result.data.error === null) {
          await setUserContext(result);
        } else {
          errorMsg(result.data.error.message);
        }
      })
      .catch((err) => {
        debugger;

        errorMsg(
          "Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com",
          "danger"
        );
      });
  };

  return {
    loginUser,
  };
}
