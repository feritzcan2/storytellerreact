import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from 'src/_mock';
import Label from 'src/components/label/label';

// ----------------------------------------------------------------------

export default function ClosestAppointmentComponent({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ['totalFavorites'], ['desc']).map((author, index) => (
          <AuthorItem key={author.id} author={author} index={index} />
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
      <Avatar alt={author.name} src={author.avatarUrl} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Ferit Özcan</Typography>

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
          Altunzade
        </Typography>
      </Box>

      <Label style={{ fontSize: '1rem' }} color="primary">
        BUGÜN 14:30
      </Label>
    </Stack>
  );
}

AuthorItem.propTypes = {
  author: PropTypes.object,
  index: PropTypes.number,
};
