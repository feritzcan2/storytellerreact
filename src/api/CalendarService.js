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
        let newEntries = [...calendarData.Entries];
        if (data.id !== 0 && data.id !== undefined && data.id !== null)
          newEntries = newEntries.filter((customer) => customer.id !== data.id);
        newEntries.push(result.data);
        newData.Entries = newEntries;

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
    getCalendar,
    addCalendarEntry,
  };
}
