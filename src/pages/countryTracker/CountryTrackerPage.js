import { Helmet } from 'react-helmet-async';
// sections
import AvailableDatesView from './views/AvailableDatesView';

// ----------------------------------------------------------------------

export default function CountryTrackerPage(props) {
  return (
    <>
      <Helmet>
        <title> CountryTrackerPage: ss</title>
      </Helmet>

      <AvailableDatesView country={props.country} />
    </>
  );
}
