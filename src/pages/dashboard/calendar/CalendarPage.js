import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import CalendarService from 'src/api/CalendarService';
import { LoadingScreen } from 'src/components/loading-screen';
import { GlobalContext } from 'src/context/GlobalProvider';
import CalendarView from './calendar-view';
// sections

// ----------------------------------------------------------------------

export default function CalendarPage() {
  const { getCalendar } = CalendarService();
  const { calendarData } = useContext(GlobalContext);
  useEffect(() => {
    getCalendar();
  }, []);
  if (calendarData === null) return <LoadingScreen />;
  return (
    <>
      <Helmet>
        <title> Takvim</title>
      </Helmet>

      <CalendarView calendarData={calendarData} />
    </>
  );
}
