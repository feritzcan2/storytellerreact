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

export default function CountryDatesWidget({
  configs,
  countryAppointmentData,
  subheader,
  list,
  ...other
}) {
  if (countryAppointmentData === undefined || countryAppointmentData.length === 0)
    return <LoadingScreen sx={{ minHeight: 200 }} />;

  return (
    <Card {...other}>
      <CardHeader title="Şu anda müsait olan randevu tarihleri" subheader={''} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {countryAppointmentData.map((countryData) => {
            return <CountryItem configs={configs} key={countryData.id} countryData={countryData} />;
          })}
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
  let updateMinutes = getMinuteDifference(officeData);
  if (updateMinutes < 10) {
    updated = true;
    updateMinute = updateMinutes;
    if (officeData.appointmentDate !== undefined) {
      lowestDate = officeData.appointmentDate;
      anyDatesFound = true; // Set the flag to true since we found non-empty date arrays
    }
  }

  return {
    updated: updated,
    updateMinute: updateMinute,
    lowestDate: officeData.appointmentDate !== undefined ? officeData.appointmentDate : null,
  };
}

function CountryItem({ configs, countryData }) {
  const lowestDateData = findLowestDate(countryData);
  let country = configs.countries.find((x) => x.id == countryData.countryId);
  let visaCategory = configs.visaCategories.find((x) => x.id == countryData.visaCategoryId);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        flexGrow={1}
        sx={{ minWidth: 120, alignItems: 'flex-end' }}
      >
        <Iconify
          icon={GetCountryFlag(configs, countryData)}
          sx={{ borderRadius: 0.65, width: 28, mr: 1 }}
        />
        <Stack
          direction="row"
          alignItems="center"
          flexGrow={1}
          sx={{ justifyContent: 'left', marginLeft: '30px' }}
        >
          <Typography variant="subtitle2" noWrap sx={{ minWidth: '150px' }}>
            {country.name}
          </Typography>
          <Typography variant="subtitle2" noWrap sx={{ marginLeft: '40px' }}>
            {visaCategory.name}
          </Typography>
        </Stack>
      </Stack>

      {lowestDateData.updated === false ? (
        <span>Sistemden veri alınamadı</span>
      ) : (
        lowestDateData.updateMinute + 'dakika önce'
      )}
      {GetDateLabel(countryData)}
    </Stack>
  );
}
function GetCountryFlag(configs, name) {
  let country = configs.countries.find((x) => x.id == name.countryId);
  return 'flagpack:' + country.code.toLowerCase();
}
function GetDateLabel(countryData) {
  const lowestDateData = findLowestDate(countryData);

  if (lowestDateData.updated === true) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('tr-TR', options).format(
      new Date(lowestDateData.lowestDate)
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

const getMinuteDifference = (country) => {
  if (!country || !country.updateDate) return 100;
  let date1 = new Date();
  let date2 = new Date(country.updateDate);
  const diffInMilliseconds = Math.abs(date2 - date1);
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  return diffInMinutes;
};
CountryItem.propTypes = {
  country: PropTypes.object,
};
