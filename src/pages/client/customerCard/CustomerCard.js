// components
import Iconify from 'src/components/iconify';
import { fDateTime } from 'src/utils/format-time';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useConfigs } from 'src/hooks/use-configs';
import AnalyticsTasks from '../analytics-tasks';
import FormDialog from '../form-dialog';

const icondoc = <Box component="img" src="/assets/icons/files/ic_document.svg" />;

const avatarUrl = 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg';
// ----------------------------------------------------------------------

export default function CustomerCard({
  customer,
  customerData,
  setUserData,
  customerIndex,
  uploadUserData,
  setShouldRefetch,
  onViewFiles,
}) {
  var configData = useConfigs(customer);
  const renderCustomer = (
    <>
      <Stack
        spacing={2}
        sx={{
          px: 2,
          pb: 1,
          pt: 2.5,
          bgcolor: 'background.neutral',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          // sx={{ bgcolor: 'background.neutral' }}
        >
          <Avatar alt={customer?.name} src={avatarUrl} />
          <ListItemText
            primary={`${customer?.name} ${customer?.surname}`}
            secondary={''}
            primaryTypographyProps={{
              mt: 0,
              component: 'span',
              typography: 'h5',
              color: 'text.disabled',
            }}
          />
          <FormDialog
            SelectedCustomerData={customer}
            customerData={customerData}
            setUserData={setUserData}
            customerIndex={customerIndex}
            uploadUserData={uploadUserData}
            setShouldRefetch={setShouldRefetch}
            editButton
          />
        </Stack>
        {/* Side by Side */}
        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 0.5, mb: 0.5 }}
        >
          <Stack direction="column" alignItems="center" sx={{ color: 'text.primary', ml: 2 }}>
            <Stack direction="row" alignItems="center">
              <Iconify icon="solar:calendar-date-bold" width={16} sx={{ mr: 0.5 }} />
              <Typography variant="subtitle1">Vize randevu tarihi</Typography>
            </Stack>
            <Typography variant="subtitle2">
              {' '}
              {customer.appointmentDate ? fDateTime(customer.appointmentDate) : ' Aranıyor'}
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="center" sx={{ color: 'text.primary', mr: 2 }}>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle1">Vergi türü</Typography>
            </Stack>
            <Typography variant="subtitle2">{configData?.taxType.name}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );

  const renderButtons = (
    <div>
      <Stack
        direction={'column'}
        spacing={1}
        sx={{ height: '100%', justifyContent: 'space-evenly' }}
      >
        {customer.filesReady === false && (
          <Button
            variant={'soft'}
            color="error"
            startIcon={<Iconify icon="ic:round-access-alarm" />}
          >
            Eksik dosyaları yükle
          </Button>
        )}

        <Button onClick={onViewFiles} variant={'soft'}>
          Yanında getirmen gerekenler
        </Button>
      </Stack>
    </div>
  );
  const renderStatusList = (
    <>
      {/* <CardHeader title="Status" /> */}
      <AnalyticsTasks title="Durum" list={customer?.statusData} />
    </>
  );

  return (
    <Card sx={{ maxWidth: 500 }}>
      {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Divider sx={{ borderStyle: 'dashed' }} />
      {/* {renderStatusList} */}

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack sx={{ mr: 2, ml: 2, justifyContent: 'space-between' }} direction={'row'}>
        {renderStatusList} {renderButtons}
      </Stack>
      {/* {renderFiles} */}
    </Card>
  );
}
