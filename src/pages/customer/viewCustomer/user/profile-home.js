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

import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

// ----------------------------------------------------------------------
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
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
export default function ProfileHome({ userData }) {
  const customer = userData.customers[0];

  const params = useParams();
  const { id } = params;
  const [uploadStatus, setUploadStatus] = useState(null);
  const [filesData, setFilesData] = useState(customer?.files);

  const uploadFile = async (sFile) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: `${customer.id}_${id}_${sFile.name}`,
      Body: sFile,
    };
    console.log('upload Params', params);
    var upload = s3
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        console.log('Uploading ' + parseInt((evt.loaded * 100) / evt.total) + '%');
        setUploadStatus('Uploading ' + parseInt((evt.loaded * 100) / evt.total) + '%');
      })
      .promise();

    await upload.then((err, data) => {
      setUploadStatus(null);
      console.log(err);
      console.log('upload file data', data);
    });
  };

  const handleFileChange = async (e, index) => {
    const newFile = await e[0];
    const fileUrl = await uploadFile(newFile);
    console.log(fileUrl);
    const updatedFiles = [...filesData];
    updatedFiles[index] = {
      ...updatedFiles[index],
      fileName: newFile.name,
      fileSize: newFile.size,
      fileType: newFile.type,
      fileStatus: 1,
      fileUrl: newFile.fileUrl,
    };
    console.log('updatedFiles', updatedFiles[index]);
    // Update the files at the specified index
    setFilesData({
      ...filesData,
      updatedFiles,
    });
  };

  const onclickDownload = (index) => {
    console.log('download file', filesData[index]?.fileUrl);
  };

  const renderDates = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {/* {fNumber(info.totalFollowers)} */}
          {fDate(userData.plannedTravelDate)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Planned Travel Date
          </Box>
        </Stack>

        <Stack width={1}>
          {fDate(customer.appointmentDate)}
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
          {customer.appointmentOffice || 'No Office'}
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
          {customer.email}
        </Stack>
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:phone-24-filled" width={24} sx={{ mr: 2 }} />
          {customer.phone}
        </Stack>
      </Stack>
    </Card>
  );

  const renderSocials = (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit">{'User 1'}</Link>
        <Link color="inherit">{'User 2'}</Link>
        <Link color="inherit">{'User 3'}</Link>
        <Link color="inherit">{'User 4'}</Link>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {renderDates}
          {renderAmountLocation}

          {renderAbout}

          {renderSocials}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          {uploadStatus}
          {filesData?.map((selectedfile, index) => (
            <div key={`${index}_${selectedfile.name}12`}>
              <Card sx={{ marginTop: 0, padding: 0, borderRadius: '10px 10px 10px 10px' }}>
                <CardContent sx={{ padding: 2 }}>
                  <Stack
                    direction="row"
                    spacing={0}
                    justifyContent={'space-between'}
                    alignItems={'start'}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                        }}
                      >
                        <IconButton
                          aria-label="settings"
                          sx={{
                            width: 50,
                            height: 50,
                            background: 'rgba(145, 158, 171, 0.08);',
                            marginRight: 2,
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

                        {selectedfile?.requiredFileDetails?.fileName}
                      </div>
                      <Typography
                        color={
                          selectedfile.fileStatus === 3
                            ? 'primary.main'
                            : selectedfile.fileStatus === 1
                            ? colors.orange[700]
                            : selectedfile.fileStatus === 2
                            ? 'red'
                            : 'text.disabled'
                        }
                        sx={{ ml: 8 }}
                      >
                        {selectedfile.fileStatus === 3
                          ? 'Approved'
                          : selectedfile.fileStatus === 1
                          ? 'Wating for Approval'
                          : selectedfile.fileStatus === 2
                          ? 'Rejected'
                          : 'File not uploaded'}
                      </Typography>
                    </div>

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
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <UploadBox
                          file={filesData[index]}
                          onDrop={(e) => handleFileChange(e, index)}
                          id={index}
                          name={`file_${index}`}
                        />
                        <IconButton
                          aria-label="settings"
                          onClick={() => onclickDownload(index)}
                          sx={{
                            width: 60,
                            height: 60,
                            background: 'rgba(145, 158, 171, 0.08);',
                            marginLeft: 3,
                          }}
                        >
                          <Iconify icon={'material-symbols:download'} width={30} height={30} />
                        </IconButton>
                      </div>
                    </div>
                  </Stack>
                  <div
                    style={{
                      display: 'flex',
                      textAlign: 'end',
                      alignItems: 'end',
                      alignContent: 'end',
                      justifyContent: 'end',
                      marginRight: 15,
                    }}
                  >
                    <Typography variant="caption">
                      {'File Uploaded: '}
                      {filesData[index]?.fileName || 'None'}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};
