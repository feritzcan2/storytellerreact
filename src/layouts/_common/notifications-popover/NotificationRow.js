import FileThumbnail from 'src/components/file-thumbnail';
// components
import Label from 'src/components/label';
// utils
import { fDateTime, fToNow } from 'src/utils/format-time';

import Avatar from '@mui/material/Avatar';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function NotificationRow({ notification }) {
  let title = '';
  let category = '';
  if (notification.notificationType == 1) {
    category = 'Randevu';
    title =
      ' <p> <strong>' +
      notification.customerName +
      '</strong>' +
      '  için  <strong>' +
      fDateTime(notification.targetDate) +
      '</strong> tarihine randevu atandı.</p>';
  }
  if (notification.notificationType == 0) {
    category = 'Dosya Yüklendi';
    title = ' <p><strong>' + notification.customerName + '</strong> yeni bir dosya yükledi.</p>';
  }
  if (notification.notificationType == 2) {
    category = 'Yeni Müşteri';
    title = ' <p><strong>' + notification.customerName + '</strong> sisteme eklendi.</p>';
  }
  if (notification.notificationType == 3) {
    category = 'Yeni Kayıt';
    title = ' <p><strong>' + notification.customerName + '</strong> sisteme eklendi.</p>';
  } else {
  }
  const renderAvatar = (
    <ListItemAvatar>
      {notification.avatarUrl ? (
        <Avatar src={notification.avatarUrl} sx={{ bgcolor: 'background.neutral' }} />
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: 'background.neutral',
          }}
        >
          <Box
            component="img"
            src={`/assets/icons/notification/ic_order.svg`}
            sx={{ width: 24, height: 24 }}
          />
        </Stack>
      )}
    </ListItemAvatar>
  );

  const renderText = (
    <ListItemText
      disableTypography
      primary={reader(title)}
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 5,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          <Label variant="soft">{category}</Label>
          {fToNow(notification.date)}
        </Stack>
      }
    />
  );

  const renderUnReadBadge = notification.isUnRead && (
    <Box
      sx={{
        top: 26,
        width: 8,
        height: 8,
        right: 20,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  );

  const friendAction = (
    <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
      <Button size="small" variant="contained">
        Accept
      </Button>
      <Button size="small" variant="outlined">
        Decline
      </Button>
    </Stack>
  );

  const projectAction = (
    <Stack alignItems="flex-start">
      <Box
        sx={{
          p: 1.5,
          my: 1.5,
          borderRadius: 1.5,
          color: 'text.secondary',
          bgcolor: 'background.neutral',
        }}
      >
        {reader(
          `<p><strong>@Jaydon Frankie</strong> feedback by asking questions or just leave a note of appreciation.</p>`
        )}
      </Box>

      <Button size="small" variant="contained">
        Reply
      </Button>
    </Stack>
  );

  const fileAction = (
    <Stack
      spacing={1}
      direction="column"
      sx={{
        pl: 1,
        p: 1.5,
        mt: 1.5,
        borderRadius: 1.5,
        bgcolor: 'background.neutral',
      }}
    >
      <Stack spacing={1} direction="row" sx={{}}>
        <Stack
          spacing={1}
          direction={{ xs: 'column', sm: 'row' }}
          flexGrow={1}
          sx={{ minWidth: 0, alignItems: 'center' }}
        >
          <FileThumbnail
            file="http://localhost:8080/httpsdesign-suriname-2015.mp3"
            sx={{ width: 40, height: 40 }}
          />
          <ListItemText
            disableTypography
            primary={
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ color: 'text.secondary' }}
                noWrap
              >
                design-suriname-2015.mp3
              </Typography>
            }
            secondary={
              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: 'caption', color: 'text.disabled' }}
                divider={
                  <Box
                    sx={{
                      mx: 0.5,
                      width: 2,
                      height: 2,
                      borderRadius: '50%',
                      bgcolor: 'currentColor',
                    }}
                  />
                }
              >
                <span>2.3 GB</span>
                <span>30 min ago</span>
              </Stack>
            }
          />
        </Stack>
        <Stack spacing={0.5}>
          <Button size="small" variant="outlined">
            İndir
          </Button>
          <Button size="small" variant="outlined">
            Onayla
          </Button>
          <Button size="small" variant="outlined">
            Reddet
          </Button>
        </Stack>
      </Stack>
      <Typography
        variant="subtitle2"
        component="div"
        sx={{ color: 'text.primary', textAlign: 'center' }}
        noWrap
      >
        {notification.fileDescription}
      </Typography>
    </Stack>
  );

  return (
    <ListItemButton
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      {renderUnReadBadge}
      {renderAvatar}
      <Stack sx={{ flexGrow: 1 }}>
        {reader(title)}
        {notification.notificationType === 0 && fileAction}
        {notification.type === 'file' && fileAction}
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 5,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          <Box sx={{ mt: 1 }}>
            <Label variant="soft">{category}</Label>
            {'  -  '}
            {fToNow(notification.date)}
          </Box>
        </Stack>
      </Stack>
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function reader(data) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
