import * as React from 'react';
// @mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

// components
import { useTheme } from '@emotion/react';
import { Stack, colors } from '@mui/material';
import { LoadingScreen } from 'src/components/loading-screen';
import { useSettingsContext } from 'src/components/settings';
import { bgGradient } from 'src/theme/css';

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

  if (props.countryData === undefined) return <LoadingScreen />;
  return (
    <>
      <Typography color={colors.brown[400]} variant="h6">
        {props.countryData.name.charAt(0).toLocaleUpperCase('tr-TR') +
          props.countryData.name.slice(1)}{' '}
        için uygun tarihler
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {props.countryData.officeData
              .sort((a, b) => {
                // Compare the minimum available dates
                const minDateA = Math.min(...a.dates.map((date) => new Date(date)));
                const minDateB = Math.min(...b.dates.map((date) => new Date(date)));
                return minDateA - minDateB; // Sort in ascending order
              })
              .map((popover, i) => {
                return <Tab label={popover.officeName} />;
              })}
          </Tabs>
        </Box>
        {props.countryData.officeData
          .sort((a, b) => {
            // Compare the minimum available dates
            const minDateA = Math.min(...a.dates.map((date) => new Date(date)));
            const minDateB = Math.min(...b.dates.map((date) => new Date(date)));
            return minDateA - minDateB; // Sort in ascending order
          })
          .map((popover, i) => {
            let updateMinutes = getMinuteDifference(popover);
            return (
              <CustomTabPanel value={value} index={i}>
                {popover.dates.length != 0 && (
                  <Stack spacing={1}>
                    {popover.dates.map((date, i) => {
                      if (i < 3)
                        return (
                          <DateRow
                            key={popover.officeName + 'i'}
                            updateMinutes={updateMinutes}
                            date={date.split('T')[0]}
                          />
                        );
                    })}
                  </Stack>
                )}
                {popover.dates.length == 0 && updateMinutes < 15 && (
                  <DateRow
                    key={popover.officeName + 'i'}
                    updateMinutes={updateMinutes}
                    color="error"
                  />
                )}
                {popover.dates.length == 0 && updateMinutes >= 15 && (
                  <DateRow
                    key={popover.officeName + 'i'}
                    updateMinutes={updateMinutes}
                    color="warning"
                  />
                )}
              </CustomTabPanel>
            );
          })}
      </Box>
    </>
  );
}

function DateRow({ updateMinutes, date, title, total, icon, color = 'primary', sx, ...other }) {
  const theme = useTheme();

  return (
    <Stack
      component="span"
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

      <Typography component={'span'} variant="h3">
        {color === 'error' ? 'Uygun Tarih Yok' : color === 'warning' ? 'Güncellenmedi' : date}
      </Typography>

      <Typography component={'span'} variant="subtitle2" sx={{ opacity: 0.64 }}>
        {color === 'warning'
          ? 'Sistemden veri alınamadı. Lütfen kendiniz kontrol edin.'
          : updateMinutes + '  dakika önce güncellendi.'}
      </Typography>
    </Stack>
  );
}
const getMinuteDifference = (data) => {
  let date1 = new Date();
  let date2 = new Date(data.updateDate);
  const diffInMilliseconds = Math.abs(date2 - date1);
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  return diffInMinutes;
};
