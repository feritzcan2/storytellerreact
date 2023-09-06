import { Helmet } from 'react-helmet-async';
// sections
import EmailListTable from './views/NotificationSettingsView';

// ----------------------------------------------------------------------

export default function NotificationSettingsPage(props) {
  return (
    <>
      <Helmet>
        <title> CountryTrackerPage: ss</title>
      </Helmet>

      <EmailListTable country={props.country} />
    </>
  );
}
