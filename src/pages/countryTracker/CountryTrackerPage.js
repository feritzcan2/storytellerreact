import { Helmet } from 'react-helmet-async';
// sections
import AvailableDatesView from './views/AvailableDatesView';
import { useContext } from 'react';
import { GlobalContext } from 'src/context/GlobalProvider';
import Grid from '@mui/material/Unstable_Grid2';
import TrackingDatesView from './views/TrackingDatesView';

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
      <Grid flexDirection={'column'} display={'flex'} height={'100%'}>
        <AvailableDatesView country={props.country} countryData={countryAppointmentData[index]} />
        <TrackingDatesView country={props.country} countryData={countryAppointmentData[index]} />
      </Grid>
    </>
  );
}
