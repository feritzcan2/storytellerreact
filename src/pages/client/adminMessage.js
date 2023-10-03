// utils
import { fDateTime } from 'src/utils/format-time';

import { colors } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------
const avatarUrl = 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_12.jpg';
export default function AdminMessage({ name = '', description = '', postedAt = '', ...other }) {
  return (
    <Card
      sx={{
        background: colors.green[50],
        maxWidth: { xs: 325, md: 550 },
        minWidth: { xs: 300, md: 500 },
      }}
      {...other}
    >
      {/* <CardHeader title={'Admin message'} /> */}
      <Typography variant="h5" color="black" sx={{ p: 2 }}>
        {'Admin message'}
      </Typography>
      <Stack
        spacing={2}
        sx={{
          p: 2,
          position: 'relative',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />

          <ListItemText
            primary={name}
            secondary={`Posted ${fDateTime(postedAt)}`}
            primaryTypographyProps={{
              color: 'black',
            }}
            secondaryTypographyProps={{
              component: 'span',
              typography: 'caption',
              mt: 0.5,
              color: 'text.disabled',
            }}
          />
        </Stack>

        <Typography variant="body2" color="black">
          {description}
        </Typography>
      </Stack>
    </Card>
  );
}
