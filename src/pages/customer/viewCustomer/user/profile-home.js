import { useContext, useState } from 'react';

import AWS from 'aws-sdk';
import PropTypes from 'prop-types';
// _mock
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
import Label from 'src/components/label';
import { GlobalContext } from 'src/context/GlobalProvider';
import { useBoolean } from 'src/hooks/use-boolean';
import { useConfigs } from 'src/hooks/use-configs';
import UserQuickEditForm from '../../list/components/UserQuickEditForm';
import OtherUsers from './otherUsers';
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
export default function ProfileHome({ customer }) {
  const quickEdit = useBoolean();
  const params = useParams();
  const [uploadStatus, setUploadStatus] = useState(null);
  const { configs } = useContext(GlobalContext);
  const [filesData, setFilesData] = useState(customer?.files);
  console.log(customer);
  const configData = useConfigs(customer);
  const uploadFile = async (sFile) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: `${customer.id}__${sFile.name}`,
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

    const cje = await upload.then((err, data) => {
      setUploadStatus(null);
      console.log(err);
      console.log('upload file data', data);
    });
    console.log('upload file cje', cje);
  };

  const handleFileChange = async (e, index) => {
    const newFile = await e[0];
    const fileUrl = await uploadFile(newFile);
    console.log(fileUrl);
    const updatedFiles = [...filesData];
    console.log('updatedFiles', updatedFiles);
    updatedFiles[index] = {
      ...updatedFiles[index],
      fileName: newFile.name,
      fileSize: newFile.size,
      fileType: newFile.type,
      fileStatus: 1,
      fileUrl:
        'https://file-examples.com/storage/feaade38c1651bd01984236/2017/10/file-sample_150kB.pdf',
      // newFile.fileUrl,
    };
    console.log('updatedFiles', updatedFiles[index]);
    // Update the files at the specified index
    setFilesData(updatedFiles);
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
  };

  //   const onSubmit = async () => {
  //   console.log('filesData >', filesData);
  //   const updateCustomerrData = [...customer.customers];
  //   updateCustomerrData[customerIndex] = {
  //     ...customer.customers[customerIndex],
  //     name: formData.name,
  //     email: formData.email,
  //     surname: formData.surname,
  //     phone: formData.phone,
  //     taxType: formData.taxType,
  //     files: [...formData.files],
  //   };

  //   let updatedUserData = customer;
  //   updatedUserData = {
  //     ...customer,
  //     customers: updateCustomerrData,
  //   };
  //   const newData = await setClients(id, updatedUserData);
  //   setUserData(newData);
  //   setShouldRefetch(true);
  //   onCancel();
  //   if (formData?.files?.length > 0) {
  //     onCancel();
  //   }
  // };

  const renderEdit = (
    <Stack alignItems="center" sx={{ p: 0 }}>
      <Stack
        direction="row"
        alignItems="space-between"
        sx={{ justifyContent: 'space-between', width: '100%', p: 1 }}
      >
        <Button
          fullWidth
          variant="soft"
          color="error"
          endIcon={<Iconify icon="mdi:export-variant" />}
        >
          Müşteri ile paylaş
        </Button>
        <Button fullWidth color="success" variant="soft" onClick={quickEdit.onTrue}>
          Gözünden gör
        </Button>
      </Stack>
      <Button fullWidth color="inherit" variant="soft" onClick={quickEdit.onTrue}>
        Düzenle
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
          {customer?.plannedTravelDate ? fDate(customer.plannedTravelDate) : 'Yok'}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Planlanan gidiş tarihi
          </Box>
        </Stack>
        <Stack width={1}>
          {customer?.AmountCredit || 0}TL
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Alınan ödeme
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAmountLocation = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h5' }}>
      <Label>Vize Görüşmesi</Label>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {customer?.appointmentDate ? fDate(customer.appointmentDate) : 'Yok'}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Randevu Tarihi
          </Box>
        </Stack>
        <Stack width={1}>
          {customer?.appointmentOffice || 'No Office'}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Ofis
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  if (configData.visaType === undefined) {
    debugger;
  }
  const renderAbout = (
    <Card>
      <CardHeader title="Hakkında" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Iconify
            icon={'flagpack:' + configData.country.code.toLowerCase()}
            sx={{ borderRadius: 0.65, width: 24, mr: 1 }}
          />
          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {configData.country.name || 'No Country'}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>{configData.visaType.name || 'Any'}</Box>
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

  const renderOtherCustomers = <OtherUsers title="Grubundaki kişiler" list={customer} />;

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
            <Label
              key={'infso'}
              color={'error'}
              variant="filled"
              sx={{ mt: 1, mx: 1, fontSize: '1rem', height: 30 }}
            >
              YÜKLENEN DOSYALAR
            </Label>
            {uploadStatus}
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
                            ? 'Onaylandı..'
                            : selectedfile.fileStatus === 1
                            ? 'Onay bekliyor..'
                            : selectedfile.fileStatus === 2
                            ? 'Reddedildi..'
                            : 'Dosya yüklenmedi..'}
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
                          !!uploadStatus
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
                      {'Dosya adı: '}
                      {filesData[index]?.fileName ||
                        selectedfile?.fileName ||
                        'Henüz dosya seçilmedi'}
                    </Typography>
                  </div>
                  <Stack spacing={1} direction="row" alignItems="center" sx={{ p: 1 }}>
                    <Button
                      color="error"
                      variant="soft"
                      disabled={filesData[index]?.fileStatus === 2}
                      onClick={() => handleAcceptReject(2, index)}
                    >
                      Reddet
                    </Button>

                    <Button
                      color="inherit"
                      variant="contained"
                      disabled={filesData[index]?.fileStatus === 3}
                      onClick={() => handleAcceptReject(3, index)}
                    >
                      Kabul et
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
