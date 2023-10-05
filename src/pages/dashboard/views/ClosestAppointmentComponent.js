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
import { _appInstalled } from 'src/_mock';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';
import { LoadingScreen } from 'src/components/loading-screen';
import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function ClosestAppointmentComponent({ title, subheader, list, data, ...other }) {
  if ((data === null) | (data === undefined)) return <LoadingScreen />;
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(data, ['date'], ['desc']).map((author, index) => (
          <AuthorItem key={author.customerName} author={author} index={index} />
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

function AuthorItem({ author, index }) {
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
          <Iconify icon={_appInstalled[index].flag} sx={{ borderRadius: 0.65, width: 15, mr: 1 }} />
          {_appInstalled[index].name}
          <Iconify icon="fluent:location-12-filled" width={14} sx={{ ml: 1, mr: 0.5 }} />
          {author.city}
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
