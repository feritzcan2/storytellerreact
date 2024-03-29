import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import api from './api';

export default function CalendarService() {
  let { setCalendarData, calendarData } = useContext(GlobalContext);

  const getCalendar = async (data, errorMsg) => {
    return api
      .get('calendar')
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          setCalendarData(result.data);
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
  const addCalendarEntry = async (data, errorMsg) => {
    return api
      .post('calendar', data)
      .then(async (result) => {
        let newData = { ...calendarData };
        let newEntries = [...calendarData.entries];
        if (data.id !== 0 && data.id !== undefined && data.id !== null)
          newEntries = newEntries.filter((customer) => customer.id !== data.id);
        newEntries.push(result.data);
        newData.entries = newEntries;

        setCalendarData(newData);
      })
      .catch((err) => {
        if (errorMsg !== undefined)
          errorMsg(
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };
  const removeCalendarEntry = async (id) => {
    return api
      .delete('calendar?id=' + id)
      .then(async (result) => {
        let newData = { ...calendarData };
        let newEntries = [...calendarData.entries];
        newEntries = newEntries.filter((customer) => customer.id !== parseInt(id));
        newData.entries = newEntries;
        setCalendarData(newData);
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
    removeCalendarEntry,
    getCalendar,
    addCalendarEntry,
  };
}
