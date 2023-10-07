import { useState } from 'react';

import AWS from 'aws-sdk';
import PropTypes from 'prop-types';
// _mock
import { _socials } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import { useParams } from 'src/routes/hooks';
import { fDate } from 'src/utils/format-time';

import { Button, ListItemText, colors } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import OtherUsers from './otherUsers';
import UserQuickEditForm from '../../list/components/UserQuickEditForm';
import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import ClientService from 'src/api/clientService';
// ----------------------------------------------------------------------
const accessKeyId = 'AKIA2BSIFJ6DJHWHWYUE';
const secretAccessKey = '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';
const S3_BUCKET = 'vizedefteridocs';
const REGION = 'eu-central-1';
AWS.config.update({
  accessKeyId,
  secretAccessKey,
});
const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});
export default function ProfileHome({ userData, setShouldRefetch }) {
  const quickEdit = useBoolean();
  const params = useParams();
  const { id } = params;
  const customer = userData.customers.find((customer) => customer.id == id);
  const customerIndex = userData.customers.findIndex((customer) => customer.id === id);
  const { setClients } = ClientService();
  const [uploadStatus, setUploadStatus] = useState(false);
  const [filesData, setFilesData] = useState(customer?.files);

  const uploadFile = async (sFile) => {
    setUploadStatus(true);
    const params = {
      Bucket: S3_BUCKET,
      Key: `${customer.id}_${id}_${sFile.name}`,
      Body: sFile,
    };
    const uploadedImage = await s3.upload(params).promise();
    console.log('S3 Uploaded Image', uploadedImage);
    setUploadStatus(false);
    return uploadedImage.Location;
  };

  const handleFileChange = async (e, index) => {
    const newFile = await e[0];
    const fileUrl = await uploadFile(newFile);
    console.log('upload fileUrl data', fileUrl);
    const updatedFiles = [...filesData];
    updatedFiles[index] = {
      ...updatedFiles[index],
      fileName: newFile.name,
      fileSize: newFile.size,
      fileType: newFile.type,
      fileStatus: 1,
      fileUrl: fileUrl,
    };
    console.log('updatedFiles', updatedFiles[index]);
    // Update the files at the specified index
    setFilesData(updatedFiles);
    onSubmit();
  };

  const handleAcceptReject = async (acceptReject, index) => {
    const updatedFiles = [...filesData];
    updatedFiles[index] = {
      ...updatedFiles[index],
      fileStatus: acceptReject,
    };
    console.log('updatedFiles', updatedFiles[index]);
    // Update the files at the specified index
    setFilesData(updatedFiles);
    onSubmit();
  };

  const onSubmit = async () => {
    console.log('filesData >', filesData);
    const updateCustomerrData = [...userData.customers];
    updateCustomerrData[customerIndex] = {
      ...userData.customers[customerIndex],
      files: filesData,
    };

    let updatedUserData = userData;
    updatedUserData = {
      ...userData,
      customers: updateCustomerrData,
    };
    await setClients(id, updatedUserData);
    setShouldRefetch(true);
  };

  const renderEdit = (
    <Stack spacing={0} alignItems="center" sx={{ p: 1 }}>
      <Button fullWidth color="inherit" variant="contained" onClick={quickEdit.onTrue}>
        Edit User
      </Button>
    </Stack>
  );

  const renderDates = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {/* {fNumber(info.totalFollowers)} */}
          {userData?.plannedTravelDate ? fDate(userData.plannedTravelDate) : 'No Date'}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Planned Travel Date
          </Box>
        </Stack>

        <Stack width={1}>
          {userData?.appointmentDate ? fDate(userData.appointmentDate) : 'No Date'}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Appointment Date
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAmountLocation = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h5' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {userData?.AmountCredit || 0}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Amount Credited
          </Box>
        </Stack>

        <Stack width={1}>
          {customer?.appointmentOffice || 'No Office'}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Appointment Office
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {userData.country || 'No Country'}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>{userData.visaType || 'Any'}</Box>
        </Stack>
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {customer?.email ? customer?.email : 'No email'}
        </Stack>
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:phone-24-filled" width={24} sx={{ mr: 2 }} />
          {customer?.phone ? customer?.phone : 'No phone'}
        </Stack>
      </Stack>
    </Card>
  );

  const renderOtherCustomers = <OtherUsers title="Users" list={userData} />;

  return (
    <>
      <UserQuickEditForm
        currentUser={customer}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Stack spacing={3}>
            {renderEdit}
            {renderDates}
            {renderAmountLocation}
            {renderAbout}
            {renderOtherCustomers}
          </Stack>
        </Grid>

        <Grid xs={12} md={8}>
          <Stack spacing={3}>
            <Label key={'info'} color={'info'} variant="soft" sx={{ mt: 1, mx: 1 }}>
              Files to upload
            </Label>
            {filesData?.map((selectedfile, index) => (
              <div key={`${index}_${selectedfile.name}12`}>
                <Stack
                  component={Card}
                  variant="outlined"
                  spacing={1}
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'unset', sm: 'center' }}
                  sx={{
                    borderRadius: 2,
                    bgcolor: 'unset',
                    cursor: 'pointer',
                    position: 'relative',
                    p: { xs: 1.5, sm: 1 },
                    marginBottom: 1,
                    background: 'white',
                  }}
                >
                  <IconButton
                    aria-label="settings"
                    sx={{
                      width: 50,
                      height: 50,
                      background: 'rgba(145, 158, 171, 0.08);',
                    }}
                  >
                    <Iconify
                      icon="eva:checkmark-circle-2-outline"
                      width={30}
                      height={30}
                      sx={{
                        color:
                          selectedfile.fileStatus === 3
                            ? 'primary.main'
                            : selectedfile.fileStatus === 1
                            ? colors.orange[700]
                            : selectedfile.fileStatus === 2
                            ? 'red'
                            : 'text.disabled',
                        justifyContent: 'end',
                        alignItems: 'end',
                        alignContent: 'end',
                        textAlign: 'end',
                      }}
                    />
                  </IconButton>
                  <ListItemText
                    primary={selectedfile?.requiredFileDetails?.fileName}
                    secondary={
                      <>
                        <Typography
                          typography={'caption'}
                          color={
                            selectedfile.fileStatus === 3
                              ? 'primary.main'
                              : selectedfile.fileStatus === 1
                              ? colors.orange[700]
                              : selectedfile.fileStatus === 2
                              ? 'red'
                              : 'text.disabled'
                          }
                        >
                          {selectedfile.fileStatus === 3
                            ? 'Approved'
                            : selectedfile.fileStatus === 1
                            ? 'Wating for Approval'
                            : selectedfile.fileStatus === 2
                            ? 'Rejected'
                            : 'File not uploaded'}
                        </Typography>
                      </>
                    }
                    primaryTypographyProps={{
                      noWrap: true,
                      typography: 'body2',
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                      }}
                    >
                      <UploadBox
                        file={filesData[index]}
                        onDrop={(e) => handleFileChange(e, index)}
                        id={index}
                        name={`file_${index}`}
                        disabled={
                          selectedfile.fileStatus === 1 ||
                          selectedfile.fileStatus === 3 ||
                          uploadStatus
                        }
                      />
                      <a
                        href={filesData[index]?.fileUrl}
                        download="proposed_file_name"
                        target="_blank"
                      >
                        <IconButton
                          aria-label="settings"
                          sx={{
                            width: 60,
                            height: 60,
                            background: 'rgba(145, 158, 171, 0.08);',
                            marginLeft: 3,
                          }}
                        >
                          <Iconify icon={'material-symbols:download'} width={30} height={30} />
                        </IconButton>
                      </a>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        textAlign: 'end',
                        alignItems: 'end',
                        alignContent: 'end',
                        justifyContent: 'end',
                      }}
                    ></div>
                    <Typography variant="caption" overflow={'clip'} maxWidth={200} maxHeight={40}>
                      {'File Uploaded: '}
                      {filesData[index]?.fileName || selectedfile?.fileName || 'None'}
                    </Typography>
                  </div>
                  <Stack spacing={1} direction="row" alignItems="center" sx={{ p: 1 }}>
                    <Button
                      color="error"
                      variant="soft"
                      disabled={filesData[index]?.fileStatus === 2}
                      onClick={() => handleAcceptReject(2, index)}
                    >
                      Reject
                    </Button>

                    <Button
                      color="inherit"
                      variant="contained"
                      disabled={filesData[index]?.fileStatus === 3}
                      onClick={() => handleAcceptReject(3, index)}
                    >
                      Accept
                    </Button>
                  </Stack>
                </Stack>
              </div>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};
