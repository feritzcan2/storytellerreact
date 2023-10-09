import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import api from './api';

export default function CountryService() {
  let { setCountryAppointmentData, setUserData, userData, countryAppointmentData } =
    useContext(GlobalContext);

  const getCountryData = async (data, errorMsg) => {
    return api
      .get('admin/countryData')
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
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };

  const updateTrackingRange = async (data, errorMsg) => {
    const { serviceType, startDate, endDate, isNotificationsEnabled } = data;
    return api
      .get(
        'admin/updateTrackingDate?serviceType=' +
          serviceType +
          '&startDate=' +
          startDate.toISOString() +
          '&endDate=' +
          endDate.toISOString() +
          '&isNotificationsEnabled=' +
          isNotificationsEnabled
      )
      .then(async (result) => {
        if (
          result !== undefined &&
          result.data === true &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          let newData = countryAppointmentData;
          var foundIndex = newData.findIndex((x) => x.serviceType == serviceType);
          if (foundIndex != null) {
            newData[foundIndex].trackingStartDate = startDate.toISOString();
            newData[foundIndex].trackingEndDate = endDate.toISOString();
            setCountryAppointmentData(newData);
            return true;
          }
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

  const addMail = async (data, errorMsg) => {
    const { name, mail } = data;
    return api
      .post('admin/mail', {
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
  const deleteMail = async (data, errorMsg) => {
    const { email } = data;
    return api
      .delete('admin/mail?Email=' + email)
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
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };
  return {
    getCountryData,
    addMail,
    deleteMail,
    updateTrackingRange,
  };
}
