import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Label from 'src/components/label/label';
import { Alert } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppTopInstalledCountries({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {list.map((country) => (
            <CountryItem key={country.id} country={country} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

AppTopInstalledCountries.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function CountryItem({ country }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Stack direction="row" alignItems="center" flexGrow={1} sx={{ minWidth: 120 }}>
        <Iconify icon={country.flag} sx={{ borderRadius: 0.65, width: 28, mr: 1 }} />
        <Typography variant="subtitle2" noWrap>
          {country.name}
        </Typography>
      </Stack>

      <Label style={{ fontSize: '1rem' }} color="primary">
        18 Mayıs 2023
      </Label>
    </Stack>
  );
}

CountryItem.propTypes = {
  country: PropTypes.object,
};
