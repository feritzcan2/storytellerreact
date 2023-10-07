import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from 'src/components/iconify';
import { _mock } from 'src/_mock';
import { useNavigate } from 'react-router';
import { useParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function OtherUsers({ title, subheader, list, ...other }) {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {list?.customers
          ?.filter((customer) => customer.id != id)
          .map((contact) => (
            <Stack direction="row" alignItems="center" key={contact.id}>
              <Avatar src={_mock.image.avatar(11)} sx={{ width: 48, height: 48, mr: 2 }} />

              <ListItemText primary={contact.name} secondary={contact.email} />

              <Tooltip title="View Customer">
                <IconButton onClick={() => navigate(`/musteri/${contact.id}`)}>
                  <Iconify icon="eva:diagonal-arrow-right-up-fill" />
                </IconButton>
              </Tooltip>
            </Stack>
          ))}
      </Stack>
    </Card>
  );
}
