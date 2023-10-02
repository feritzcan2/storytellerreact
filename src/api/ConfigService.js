import api from './api';
import { useContext, useReducer } from 'react';
import { GlobalContext } from '../context/GlobalProvider';

export default function ConfigService() {
  let { setConfigs } = useContext(GlobalContext);

  const getConfigs = async (data, errorMsg) => {
    return api
      .get('config')
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          console.log(result.data);
          setConfigs(result.data);
        } else {
          if (errorMsg !== undefined) errorMsg(result.data.error.message);
        }
      })
      .catch((err) => {
        if (errorMsg !== undefined)
          errorMsg(
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };

  return {
    getConfigs,
  };
}
