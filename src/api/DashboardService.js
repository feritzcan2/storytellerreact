import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import api from './api';

export default function DashboardService() {
  let { setNotifications } = useContext(GlobalContext);

  const getNotifications = async (data, errorMsg) => {
    return api
      .get('dashboard/notifications')
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          console.log('notifications');
          console.log(result.data);
          setNotifications(result.data);
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
    getNotifications,
  };
}
