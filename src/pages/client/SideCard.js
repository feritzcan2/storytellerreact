import { _analyticTasks } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { fDateTime } from 'src/utils/format-time';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

// const icon = <Box component="img" src="/assets/icons/files/ic_pdf.svg" />;
// import LinearAlternativeLabel from './linear-alternative-label-stepper';
// import VerticalLinearStepper from './vertical-linear-stepper-small';
import AnalyticsTasks from './analytics-tasks';
import FormDialog from './form-dialog';
import BasicPopover from './PopOver';

const icondoc = <Box component="img" src="/assets/icons/files/ic_document.svg" />;

const avatarUrl = 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg';
// ----------------------------------------------------------------------

export default function SideCard({
  customer,
  userData,
  setUserData,
  customerIndex,
  uploadUserData,
}) {
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
            userData={userData}
            setUserData={setUserData}
            customerIndex={customerIndex}
            uploadUserData={uploadUserData}
            editButton
          />
          {/* <ListItemText
            primary={'Email'}
            secondary={customer?.email}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
          <ListItemText
            primary={'Phone'}
            secondary={customer?.phone}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          /> */}
        </Stack>
        {/* Side by Side */}
        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 0.5, mb: 0.5 }}
        >
          <Stack direction="row" alignItems="center" sx={{ color: 'text.primary', ml: 2 }}>
            <Iconify icon="solar:calendar-date-bold" width={16} sx={{ mr: 0.5 }} />
            {customer.date ? fDateTime(customer.date) : ' No Appointent'}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ color: 'text.secondary', typography: 'caption', ml: 2, mr: 2.5 }}
          >
            <Iconify icon="solar:users-group-rounded-bold" width={16} sx={{ mr: 0.5 }} />
            {'Tax Type: '} {customer?.taxType}
          </Stack>
        </Stack>
      </Stack>
    </>
  );

  const renderFiles = (
    <div>
      <Label color={'warning'} variant="soft" sx={{ mt: 1, mx: 1 }}>
        Files to be deliver by hand
      </Label>
      {/* <Stack spacing={2} direction="row" sx={{ p: 2, ml: 3, typography: 'caption' }}> */}
      <Stack spacing={1} sx={{ pt: 1, px: 1, pb: 2 }}>
        {customer?.files
          .filter((file) => !file?.requiredFileDetails?.uploadRequired)
          .map((file, index) => (
            <div key={`${index}_${file.name}`}>
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                sx={{ color: 'text.main', typography: 'caption', ml: 0, mt: 1 }}
              >
                <Stack direction="row" alignItems="center">
                  <Iconify icon="system-uicons:files-multi" width={16} sx={{ mr: 0.5 }} />
                  {file.requiredFileDetails?.fileName}
                </Stack>
                <BasicPopover
                  popoverText={file.requiredFileDetails.description}
                  helpLink={file.requiredFileDetails.helpLink}
                  iconSize={30}
                  cricleSize={30}
                />
              </Stack>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </div>
          ))}
      </Stack>
    </div>
  );

  const renderStatusList = (
    <>
      {/* <CardHeader title="Status" /> */}
      <AnalyticsTasks title="Status" list={customer?.applicationStatus} />
    </>
  );

  return (
    <Card>
      {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Divider sx={{ borderStyle: 'dashed' }} />
      {renderFiles}
      {/* {renderStatusList} */}

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Divider sx={{ borderStyle: 'dashed' }} />
      {renderStatusList}
      {/* {renderFiles} */}
    </Card>
  );
}
