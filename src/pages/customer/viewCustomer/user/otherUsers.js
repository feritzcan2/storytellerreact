// @mui
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
// components
import { useNavigate } from 'react-router';
import { _mock } from 'src/_mock';
import Iconify from 'src/components/iconify';
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
        {list?.map((contact) => (
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
