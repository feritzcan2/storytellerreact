import { Helmet } from 'react-helmet-async';
import CalendarView from './calendar-view';
// sections

// ----------------------------------------------------------------------

export default function CalendarPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Calendar</title>
      </Helmet>

      <CalendarView />
    </>
  );
}
