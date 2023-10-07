import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// utils
// components
import { orderBy } from 'lodash';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';
import { LoadingScreen } from 'src/components/loading-screen';
import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function ClosestAppointmentComponent({
  configs,
  title,
  subheader,
  list,
  data,
  ...other
}) {
  if ((data === null) | (data === undefined) || configs === null) return <LoadingScreen />;
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(data, ['date'], ['asc']).map((author, index) => (
          <AuthorItem
            cities={configs.cities}
            countries={configs.countries}
            key={author.customerName}
            author={author}
            index={index}
          />
        ))}
      </Stack>
    </Card>
  );
}

ClosestAppointmentComponent.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function AuthorItem({ author, index, countries, cities }) {
  var c = countries.filter((value) => value.id === author.country)[0];
  var city = cities.filter((value) => value.id === author.city)[0];
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author.customerName} src={author.avatarUrl} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author.customerName}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <Iconify
            icon={'flagpack:' + c.code.toLowerCase()}
            sx={{ borderRadius: 0.65, width: 15, mr: 1 }}
          />
          {c.name}
          <Iconify icon="fluent:location-12-filled" width={14} sx={{ ml: 1, mr: 0.5 }} />
          {city.name}
        </Typography>
      </Box>

      <Label style={{ fontSize: '1rem' }} color="primary">
        {fToNow(author.date)}
      </Label>
    </Stack>
  );
}

AuthorItem.propTypes = {
  author: PropTypes.object,
  index: PropTypes.number,
};
