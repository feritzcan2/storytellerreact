import { Helmet } from 'react-helmet-async';
// sections
import AvailableDatesView from './views/AvailableDatesView';
import { useContext } from 'react';
import { GlobalContext } from 'src/context/GlobalProvider';

// ----------------------------------------------------------------------

export default function CountryTrackerPage(props) {
  const { countryAppointmentData } = useContext(GlobalContext);

  let index = countryAppointmentData.findIndex(
    (x) => x.name.toLowerCase() == props.country.toLowerCase()
  );

  return (
    <>
      <Helmet>
        <title> CountryTrackerPage: ss</title>
      </Helmet>

      <AvailableDatesView country={props.country} countryData={countryAppointmentData[index]} />
    </>
  );
}
