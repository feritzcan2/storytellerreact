import Iconify from 'src/components/iconify';
// utils
import { fDateTime } from 'src/utils/format-time';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FormDialog from './form-dialog';
import LinearAlternativeLabel from './linear-alternative-label-stepper';

// ----------------------------------------------------------------------

export default function UserCard2({ customer, userData, setUserData, customerIndex }) {
  const { surname, name, date, bookedAt, phone, email, files, taxType } = customer;
  const avatarUrl = 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg';
  return (
    <Paper
      sx={{
        mr: 1,
        borderRadius: 2,
        position: 'relative',
        bgcolor: 'background.neutral',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          px: 2,
          pb: 1,
          pt: 2.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Avatar alt={name} src={avatarUrl} /> */}
          <Avatar alt={'name'} src={avatarUrl} />
          <ListItemText
            primary={`${customer.name} ${customer.surname}`}
            primaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'h5',
            }}
            secondary={customer.date ? fDateTime(customer.date) : 'No Appointent'}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Stack>

        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          sx={{ color: 'text.secondary', typography: 'caption' }}
        >
          <Stack direction="row" alignItems="center">
            {/* <Iconify icon="solar:calendar-date-bold" width={16} sx={{ mr: 0.5 }} />
            {duration} */}
            <Iconify icon="ic:outline-phone" sx={{ color: 'primary.main' }} />
            <Typography variant="body2">{customer.phone}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            {/* <Iconify icon="solar:users-group-rounded-bold" width={16} sx={{ mr: 0.5 }} />
            {guests} Guests */}
            <Iconify icon="ic:baseline-email" sx={{ color: 'primary.main' }} />
            <Typography variant="body2">{customer.email}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1">{'Tax Type: '}</Typography>
          <> &nbsp;</>
          <Typography variant="body2">{taxType}</Typography>
        </Stack>
        {files.map(
          (file, index) =>
            file?.fileName && (
              <div key={index}>
                <Iconify icon="ph:files" sx={{ color: 'primary.main' }} /> {file.fileName}{' '}
              </div>
            )
        )}
      </Stack>

      <Box sx={{ p: 1, position: 'relative' }}>
        {/* <VerticalLinearStepper step={1} /> */}
        <LinearAlternativeLabel activeStep={1} />
      </Box>
      <FormDialog
        SelectedCustomerData={customer}
        userData={userData}
        setUserData={setUserData}
        customerIndex={userData.customers.length}
        editButton
      />
    </Paper>
  );
}
