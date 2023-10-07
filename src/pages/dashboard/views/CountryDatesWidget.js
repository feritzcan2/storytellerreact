import PropTypes from 'prop-types';
// @mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// utils
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';
import { LoadingScreen } from 'src/components/loading-screen';
import Scrollbar from 'src/components/scrollbar';
import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function CountryDatesWidget({ countryAppointmentData, subheader, list, ...other }) {
  if (countryAppointmentData === undefined || countryAppointmentData.length === 0)
    return <LoadingScreen sx={{ minHeight: 200 }} />;

  return (
    <Card {...other}>
      <CardHeader title="Şu anda müsait olan randevu tarihleri" subheader={''} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {countryAppointmentData.map((country) => (
            <CountryItem key={country.id} country={country} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

CountryDatesWidget.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------
function findLowestDate(officeData) {
  let lowestDate = null;
  let anyDatesFound = false;
  let updated = false;
  let updateMinute = 0;

  for (const office of officeData) {
    let updateMinutes = getMinuteDifference(office);
    if (updateMinutes < 10) {
      updated = true;
      updateMinute = updateMinutes;
      if (office.dates.length > 0) {
        const officeMinDate = new Date(
          Math.min(...office.dates.map((dateStr) => new Date(dateStr)))
        );
        if (lowestDate === null || officeMinDate < lowestDate) {
          lowestDate = officeMinDate;
        }
        anyDatesFound = true; // Set the flag to true since we found non-empty date arrays
      }
    }
  }
  return {
    updated: updated,
    updateMinute: updateMinute,
    lowestDate: anyDatesFound ? lowestDate : null,
  };
}

function CountryItem({ country }) {
  const lowestDateData = findLowestDate(country.officeData);
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Stack direction="row" alignItems="center" flexGrow={1} sx={{ minWidth: 120 }}>
        <Iconify
          icon={GetCountryFlag(country.name)}
          sx={{ borderRadius: 0.65, width: 28, mr: 1 }}
        />
        <Typography variant="subtitle2" noWrap>
          {country.name.charAt(0).toLocaleUpperCase('tr-TR') + country.name.slice(1)}
        </Typography>
      </Stack>

      {lowestDateData.updated === false ? (
        <span>Sistemden veri alınamadı</span>
      ) : (
        lowestDateData.updateMinute + 'dakika önce'
      )}
      {GetDateLabel(country)}
    </Stack>
  );
}
function GetDateLabel(countryData) {
  const lowestDateData = findLowestDate(countryData.officeData);
  if (lowestDateData.updated === true) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('tr-TR', options).format(
      lowestDateData.lowestDate
    );
    if (lowestDateData.lowestDate !== null) {
      return (
        <>
          <Label style={{ fontSize: '1rem' }} color="primary">
            {formattedDate}
          </Label>
          <Label style={{ fontSize: '1rem' }} color="primary">
            {fToNow(lowestDateData.lowestDate)}
          </Label>
        </>
      );
    } else {
      return (
        <Label style={{ fontSize: '1rem' }} color="error">
          RANDEVU YOK
        </Label>
      );
    }
  } else {
    return (
      <Label style={{ fontSize: '1rem' }} color="warning">
        Güncellenmedi
      </Label>
    );
  }
}
function GetCountryFlag(name) {
  if (name.toLowerCase() === 'almanya') return 'flagpack:de';
  if (name.toLowerCase() === 'hollanda') return 'flagpack:nl';
  if (name === 'ispanya') return 'flagpack:es';
  if (name.toLowerCase() === 'yunanistan') return 'flagpack:gr';
  if (name === 'italya') return 'flagpack:it';
}
const getMinuteDifference = (country) => {
  let date1 = new Date();
  let date2 = new Date(country.updateDate);
  const diffInMilliseconds = Math.abs(date2 - date1);
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  return diffInMinutes;
};
CountryItem.propTypes = {
  country: PropTypes.object,
};
