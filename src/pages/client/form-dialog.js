import { useContext, useState } from 'react';

import AWS from 'aws-sdk';
import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import { GlobalContext } from 'src/context/GlobalProvider';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useParams } from 'src/routes/hooks';

import { Box, ListItemText, colors } from '@mui/material';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CustomerService from 'src/api/CustomerService';
import BasicPopover from './PopOver';

const accessKeyId = 'AKIA2BSIFJ6DJHWHWYUE';
const secretAccessKey = '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';
const S3_BUCKET = 'vizedefteridocs';
const REGION = 'eu-central-1';

const taxTypes = [
  {
    name: 'Öğrenci',
    id: 1,
  },
  {
    name: 'Emekli',
    id: 2,
  },
  {
    name: 'Çalışan',
    id: 3,
  },
];

AWS.config.update({
  accessKeyId,
  secretAccessKey,
});
const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export default function FormDialog({
  SelectedCustomerData,
  customerData,
  setUserData,
  customerIndex,
  editButton,
  setShouldRefetch,
}) {
  const { configs } = useContext(GlobalContext);
  const filesData = SelectedCustomerData.files;
  const { setClients } = CustomerService();
  const dialog = useBoolean();
  const [formData, setFormData] = useState(
    SelectedCustomerData || {
      name: '',
      email: '',
      surname: '',
      phone: '',
      taxType: configs?.taxTypes[0]?.id || 1,
      files: [], // Store an array of file objects
    }
  );

  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const params = useParams();

  const { id } = params;
  const uploadFile = async (sFile) => {
    setUploadStatus(true);
    const params = {
      Bucket: S3_BUCKET,
      Key: `${SelectedCustomerData.id}_${id}_${sFile.name}`,
      Body: sFile,
    };
    const uploadedImage = await s3.upload(params).promise();
    console.log('S3 Uploaded Image');
    setUploadStatus(false);
    return uploadedImage.Location;
  };

  const onCancel = async () => {
    setFormData({
      name: '',
      email: '',
      surname: '',
      phone: '',
      taxType: configs?.taxTypes[0]?.id || 1,
      files: [], // Store an array of file objects
    });
    dialog.onFalse();
  };

  const onClickSubmit = async () => {
    setLoading(true);
    if (!formData.name || !formData.surname || !formData.email || !formData.phone) {
      alert('Please fill in all required fields (Name, Surname, Email, Phone)');
      setLoading(false);
      return;
    }
    const updateCustomerrData = [...customerData.customers];
    updateCustomerrData[customerIndex] = {
      ...updateCustomerrData[customerIndex],
      name: formData.name,
      email: formData.email,
      surname: formData.surname,
      phone: formData.phone,
      taxType: formData.taxType,
      files: formData.files,
    };
    let updatedUserData = customerData;
    updatedUserData = {
      ...customerData,
      customers: updateCustomerrData,
    };
    console.log('updatedUserData >', updatedUserData);
    const newData = await setClients(id, updatedUserData);
    setUserData(newData);
    setShouldRefetch(true);
    setLoading(false);
    onCancel();
    if (formData?.files?.length > 0) {
      onCancel();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'taxType') {
      onClickSubmit();
    }
  };
  const handleFileChange = async (e, index) => {
    const newFile = await e[0];
    const fileUrl = await uploadFile(newFile);
    const updatedFiles = [...formData.files];
    updatedFiles[index] = {
      ...updatedFiles[index],
      fileName: newFile.name,
      fileSize: newFile.size,
      fileType: newFile.type,
      fileStatus: 1,
      fileUrl: fileUrl,
    };
    // Update the files at the specified index
    setFormData({
      ...formData,
      files: updatedFiles,
    });
  };
  if (!SelectedCustomerData) return <></>;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {editButton ? (
        // <Button onClick={dialog.onTrue}> EDIT </Button>
        <IconButton onClick={dialog.onTrue}>
          <Box
            sx={{
              color: 'text.secondary',
              fontSize: 14,
              paddingRight: 1,
            }}
          >
            Düzenle
          </Box>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      ) : (
        <Paper
          sx={{
            mr: 1,
            borderRadius: '20 !important',
            position: 'relative',
            bgcolor: 'background.neutral',
          }}
        >
          <Stack
            spacing={1}
            onClick={dialog.onTrue}
            sx={{
              // ...bgBlur({
              //   color: '#ffffff',
              //   opacity: 0.08,
              // }),
              marginX: 15,
              marginY: 6,
              borderRadius: '20 !important',
              cursor: 'pointer',
              color: 'black',
              justifyContent: 'start',
              alignItems: 'start',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: 'center', color: 'text.primary', minWidth: 100 }}
            >{`Yeni yolcu ekle`}</Typography>
          </Stack>
        </Paper>
      )}

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle style={{ background: 'rgba(145, 158, 101, 0.08)' }}>User Details</DialogTitle>

        <DialogContent style={{ background: 'rgba(145, 108, 101, 0.08)', padding: 10 }}>
          <Typography sx={{ mb: 3 }}>Lütfen kişi bilgilerini doldurunuz.</Typography>

          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Name"
            id="name"
            name="name"
            required
            style={{ background: '#fff' }}
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Surname"
            id="surname"
            name="surname"
            required
            style={{ background: '#fff' }}
            value={formData.surname}
            onChange={handleChange}
          />
          <TextField
            style={{ background: '#fff' }}
            fullWidth
            type="email"
            margin="dense"
            variant="outlined"
            label="Email Address"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            style={{ background: '#fff' }}
            fullWidth
            type="number"
            margin="dense"
            variant="outlined"
            label="Phone Number"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <div style={{ marginTop: 1, marginLeft: 8, marginBottom: 1 }}>
            <Typography variant="caption">Tax Type</Typography>
          </div>
          <Select
            id="taxType"
            name="taxType"
            native
            fullWidth
            value={formData.taxType}
            onChange={handleChange}
            input={<InputBase sx={{ pl: 1 }} />}
            inputProps={{
              sx: { textTransform: 'capitalize', background: 'white', padding: 2 },
            }}
          >
            {configs
              ? configs.taxTypes.map((option, index) => (
                  <option key={`${index}_${option.name}`} value={option.id}>
                    {option.name}
                  </option>
                ))
              : taxTypes.map((option, index) => (
                  <option key={`${index}_${option.name}`} value={option.id}>
                    {option.name}
                  </option>
                ))}
          </Select>
          {formData?.files?.length === 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: 12 }}>
              <Button
                variant={'contained'}
                color="primary"
                startIcon={<Iconify icon="zondicons:add-outline" />}
                onClick={onClickSubmit}
                disabled={loading}
              >
                Devam
              </Button>
            </div>
          )}
          <div style={{ marginTop: 14, marginLeft: 5 }}>
            <Typography variant="caption">Files to upload</Typography>
          </div>
          {uploadStatus}
          {filesData
            .filter((file) => file.requiredFileDetails.uploadRequired)
            .map((selectedfile, index) => (
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
                        file={formData.files[index]}
                        onDrop={(e) => handleFileChange(e, index)}
                        id={index}
                        name={`file_${index}`}
                        disabled={
                          selectedfile.fileStatus === 1 ||
                          selectedfile.fileStatus === 3 ||
                          uploadStatus
                        }
                      />
                      <BasicPopover
                        popoverText={selectedfile.requiredFileDetails.description}
                        helpLink={selectedfile.requiredFileDetails.helpLink}
                      />
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
                      {'Dosya adı:  '}
                      {formData?.files[index]?.fileName ||
                        selectedfile?.fileName ||
                        'Henüz dosya seçilmedi'}
                    </Typography>
                  </div>
                </Stack>
              </div>
            ))}
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={onCancel} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button disabled={loading} onClick={onClickSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
