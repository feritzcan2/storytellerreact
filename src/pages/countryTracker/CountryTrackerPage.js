import { Helmet } from 'react-helmet-async';
// sections
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useContext } from 'react';
import { GlobalContext } from 'src/context/GlobalProvider';
import MainContainer from '../mainContainer';
import AvailableDatesView from './views/AvailableDatesView';
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
        <title> Ülkeler</title>
      </Helmet>

      <Typography variant="h4">Ülke randevu bilgisi</Typography>

      <MainContainer>
        <Grid flexDirection={'column'} display={'flex'}>
          <AvailableDatesView country={props.country} countryData={countryAppointmentData[index]} />
          <TrackingDatesView country={props.country} countryData={countryAppointmentData[index]} />
        </Grid>
      </MainContainer>
    </>
  );
}
