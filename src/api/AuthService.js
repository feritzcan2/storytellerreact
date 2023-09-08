import { Navigate } from 'react-router-dom';
import { setToken, logout } from '../context/AuthContext';
import api from './api';
import { GlobalContext } from '../context/GlobalProvider';
import { useContext } from 'react';

export default function UserAuth() {
  let { setUserData } = useContext(GlobalContext);

  const setUserContext = async (result) => {
    setToken(result.data.tokenData.jwtToken);
    setUserData(result.data.userData);
    return Navigate('/');
  };

  const getUserData = async (data, errorMsg) => {
    return api
      .get('userData')
      .then(async (result) => {
        if (result.data.error === null || result.data.error === undefined) {
          setUserData(result.data);
        } else {
          if (errorMsg) errorMsg(result.data.error.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (errorMsg)
          errorMsg(
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };
  const loginUser = async (data, errorMsg) => {
    const { username, password } = data;
    debugger;
    return api
      .post('login', {
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
        errorMsg(
          'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
          'danger'
        );
      });
  };

  return {
    loginUser,
    logout,
    getUserData,
  };
}
