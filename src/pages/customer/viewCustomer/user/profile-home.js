import { useRef } from 'react';

import PropTypes from 'prop-types';
// _mock
import { _socials } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';

import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// @mui
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import dataf from '../../../client/DATA';

// ----------------------------------------------------------------------

const filesData = dataf.customers[0].files;

export default function ProfileHome({ info, posts }) {
  const fileRef = useRef(null);

  const handleAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const renderFollows = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {/* {fNumber(info.totalFollowers)} */}
          2024-01-01
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Planned Travel Date
          </Box>
        </Stack>

        <Stack width={1}>
          {'Spain'}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Country
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
              {info.country}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {info.email}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            Tourist
            {/* <Link variant="subtitle2" color="inherit">
              {info.company}
            </Link> */}
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderPostInput = (
    <Card sx={{ p: 3 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <Fab size="small" color="inherit" variant="softExtended" onClick={handleAttach}>
            <Iconify icon="solar:gallery-wide-bold" width={24} sx={{ color: 'success.main' }} />
            Image/Video
          </Fab>

          <Fab size="small" color="inherit" variant="softExtended">
            <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: 'error.main' }} />
            Streaming
          </Fab>
        </Stack>

        <Button variant="contained">Post</Button>
      </Stack>

      <input ref={fileRef} type="file" style={{ display: 'none' }} />
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
          {renderFollows}

          {renderAbout}

          {renderSocials}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          {/* {renderPostInput} */}
          {/* 
          {posts.map((post) => (
            <ProfilePostItem key={post.id} post={post} />
          ))} */}

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
                          justifyContent: 'start',
                          alignItems: 'center',
                        }}
                      >
                        <UploadBox
                          // file={formData.files[index]}
                          // onDrop={(e) => handleFileChange(e, index)}
                          id={index}
                          name={`file_${index}`}
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
                      {/* {formData?.files[index]?.fileName || 'None'} */}
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
