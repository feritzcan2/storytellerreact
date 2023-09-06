import * as React from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// components
import { useSettingsContext } from 'src/components/settings';
import { useTheme } from '@emotion/react';
import { Card, CardHeader, Stack } from '@mui/material';
import { bgGradient } from 'src/theme/css';
import EmailListTable from './NotificationSettingsView';
import ComponentBlock from 'src/pages/component-block';

// ----------------------------------------------------------------------

export default function AvailableDatesView(props) {
  const settings = useSettingsContext();
  const [value, setValue] = React.useState(0);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { country } = props;
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4">
        {' '}
        {country.charAt(0).toLocaleUpperCase('tr-TR') + country.slice(1)} için uygun tarihler{' '}
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Stack spacing={10}>
            <DateRow />
            <Card sx={{ width: 1 }}>
              <CardHeader title="Basic Table" />
              <EmailListTable />
            </Card>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </Container>
  );
}

function DateRow({ title, total, icon, color = 'primary', sx, ...other }) {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.2),
          endColor: alpha(theme.palette[color].main, 0.2),
        }),
        py: 3,
        borderRadius: 2,
        textAlign: 'center',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64, mb: 1 }}>{icon}</Box>}

      <Typography variant="h3">15 Mayıs 2023</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
        15 dakika önce güncellendi
      </Typography>
    </Stack>
  );
}
