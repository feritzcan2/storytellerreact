import { useState } from 'react';

import AWS from 'aws-sdk';
import axios from 'axios';
import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useParams } from 'src/routes/hooks';

import { Box, colors } from '@mui/material';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
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

import { _descriptions } from '../../_mock/assets';
import BasicPopover from './PopOver';

// const sessionId = 'S-1231231211';
// const customerId = 'C-1231222';
const accessKeyId = 'AKIA2BSIFJ6DJHWHWYUE';
const secretAccessKey = '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';
const S3_BUCKET = 'vizedefteridocs';
const REGION = 'eu-central-1';

// ----------------------------------------------------------------------
// const customerTaxType = [
//   { option: 'Student', value: 'Student' },
//   { option: 'Retired', value: 'Retired' },
// ];

const customerTaxType = ['Student', 'Retired'];
export default function FormDialog({
  SelectedCustomerData,
  userData,
  setUserData,
  customerIndex,
  editButton,
}) {
  const filesData = SelectedCustomerData.files;
  const dialog = useBoolean();
  const [formData, setFormData] = useState(
    SelectedCustomerData || {
      name: '',
      email: '',
      surname: '',
      phone: '',
      taxType: '',
      files: [], // Store an array of file objects
    }
  );

  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const params = useParams();

  const { id } = params;
  const postUrl = `https://api.vizedefteri.com/Customer/updateCustomerSession?id=${id}`;
  const uploadFile = async (sFile) => {
    AWS.config.update({
      accessKeyId,
      secretAccessKey,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: `${SelectedCustomerData.id}_${id}_${sFile.name}`,
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

  const LabelView = ({ status }) => {
    if (status === 3) {
      return (
        <>
          <Typography color={'primary.main'}>Approved</Typography>
          {uploadStatus}
          <Iconify
            icon="eva:checkmark-circle-2-outline"
            sx={{
              color: 'primary.main',
              marginRight: 4,
            }}
          />
        </>
      );
    } else if (status === 1) {
      return (
        <>
          <Typography color={colors.orange[700]}>Waiting for approval</Typography>
          {uploadStatus}
          <Iconify
            icon="eva:checkmark-circle-2-outline"
            sx={{
              color: colors.orange[700],
              marginRight: 4,
            }}
          />
        </>
      );
    } else if (status === 2) {
      return (
        <>
          <Typography color={'red'}>Rejected</Typography>
          {uploadStatus}
          <Iconify
            icon="eva:checkmark-circle-2-outline"
            sx={{
              marginRight: 4,
              color: 'red',
            }}
          />
        </>
      );
    } else
      return (
        <>
          <Typography color={'text.disabled'}>File not uploaded</Typography>
          {uploadStatus}
          <Iconify
            icon="eva:checkmark-circle-2-outline"
            sx={{
              marginRight: 4,
              color: 'text.disabled',
            }}
          />
        </>
      );
  };
  const onCancel = async () => {
    setFormData({
      name: '',
      email: '',
      surname: '',
      phone: '',
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
    const updateCustomerrData = [...userData.customers];
    updateCustomerrData[customerIndex] = {
      ...userData.customers[customerIndex],
      name: formData.name,
      email: formData.email,
      surname: formData.surname,
      phone: formData.phone,
      files: [...formData.files],
    };

    let updatedUserData = userData;
    updatedUserData = {
      ...userData,
      customers: updateCustomerrData,
    };
    await axios
      .post(postUrl, updatedUserData)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
    setLoading(false);
    if (formData.files.length > 0) {
      setFormData({
        name: '',
        email: '',
        surname: '',
        phone: '',
        files: [], // Store an array of file objects
      });
      dialog.onFalse();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e, index) => {
    const newFile = await e[0];
    const fileUrl = await uploadFile(newFile);
    console.log(fileUrl);
    const updatedFiles = [...formData.files];
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
            Edit
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
            >{`Add New`}</Typography>
          </Stack>
        </Paper>
      )}

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle style={{ background: 'rgba(145, 158, 101, 0.08)' }}>User Details</DialogTitle>

        <DialogContent style={{ background: 'rgba(145, 108, 101, 0.08)', padding: 10 }}>
          <Typography sx={{ mb: 3 }}>Add Deitails and upload required files</Typography>

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
          <Typography variant="caption"> TAX TYPE</Typography>
          <Select
            id="taxType"
            name="taxType"
            native
            fullWidth
            value={formData.taxType}
            onChange={handleChange}
            input={<InputBase sx={{ pl: 2 }} />}
            inputProps={{
              sx: { textTransform: 'capitalize', background: 'white', padding: 2 },
            }}
          >
            {customerTaxType.map((option, index) => (
              <option key={`${index}_${option}`} value={option}>
                {option}
              </option>
            ))}
          </Select>
          {formData.files.length === 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: 12 }}>
              <Button
                variant={'contained'}
                color="primary"
                startIcon={<Iconify icon="zondicons:add-outline" />}
                onClick={onClickSubmit}
                disabled={loading}
              >
                Add New User
              </Button>
            </div>
          )}
          {filesData
            .filter((file) => file.requiredFileDetails.uploadRequired)
            .map((selectedfile, index) => (
              <div key={`${index}_${selectedfile.name}12`}>
                {/* <Stack
                key={`${index}_111${selectedfile.name}12`}
                spacing={0}
                direction="row"
                alignItems="center"
                sx={{
                  color: 'black',
                  width: '100%',
                  height: 45,
                  padding: '0px 0px 0px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: 'lightgray',
                  borderRadius: '10px 10px 0px 0px',
                  marginTop: '20px',
                }}
              >
                <LabelView status={selectedfile.fileStatus} />
              </Stack> */}
                {uploadStatus}
                <Card sx={{ marginTop: 2, padding: 0, borderRadius: '10px 10px 10px 10px' }}>
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
                            {/* <Iconify
                            icon="mdi:file-outline"
                            width={30}
                            height={30}
                            sx={{ color: 'grey' }}
                          /> */}
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
                      </div>
                    </Stack>
                    <div
                      style={{
                        display: 'flex',
                        textAlign: 'end',
                        alignItems: 'end',
                        alignContent: 'end',
                        justifyContent: 'end',
                      }}
                    >
                      <Typography variant="caption">
                        {'File Uploaded: '}
                        {formData?.files[index]?.fileName || selectedfile?.fileName || 'None'}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
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
