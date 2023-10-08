import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { logout, setToken } from '../context/AuthContext';
import { GlobalContext } from '../context/GlobalProvider';
import api from './api';

export default function UserAuth() {
  let { setUserData, setConfigs } = useContext(GlobalContext);

  const setUserContext = async (result) => {
    setToken(result.data.tokenData.jwtToken, result.data.tokenData.jwtToken.organisationId);
    setUserData(result.data.userData);
    return Navigate('/');
  };

  const getUserData = async (data, errorMsg) => {
    return api
      .get('admin/userData')
      .then(async (result) => {
        if (result.data.error === null || result.data.error === undefined) {
          setUserData(result.data);
          debugger;
          setConfigs(result.data.configs);
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
    return api
      .post('admin/login', {
        username,
        password,
      })
      .then(async (result) => {
        debugger;
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
