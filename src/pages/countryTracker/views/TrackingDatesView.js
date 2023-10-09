import * as React from 'react';
// @mui
import Typography from '@mui/material/Typography';
import 'moment/locale/tr';
// components
import { Button, Stack, Switch, colors } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import moment from 'moment';
import 'moment/locale/de';
import { useState } from 'react';
import CountryService from 'src/api/CountryService';
import { LoadingScreen } from 'src/components/loading-screen';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function TrackingDatesView(props) {
  if (props.countryData === undefined) return <LoadingScreen />;

  const settings = useSettingsContext();
  const [value, setValue] = useState(0);
  const { updateTrackingRange } = CountryService();
  const [startDate, setStartDate] = useState(dayjs(props.countryData.trackingStartDate));
  console.log(props.data);
  const [endDate, setEndDate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isNotifUpdated, setNotifUpdated] = useState(false);
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(
    props.countryData.notificationsEnabled
  );
  const toggleCheckbox = () => {
    let newVal = !isNotificationsEnabled;
    setNotificationsEnabled(!isNotificationsEnabled);
    setNotifUpdated(props.countryData.notificationsEnabled !== newVal);
  };
  React.useEffect(() => {
    if (isUpdated === false) {
      setStartDate(dayjs(props.countryData.trackingStartDate));
      setEndDate(dayjs(props.countryData.trackingEndDate));
    }
    if (isNotifUpdated === false) {
      setNotificationsEnabled(props.countryData.notificationsEnabled);
    }
  }, [props.countryData]);

  const handleChange = (start, end) => {
    start = start || startDate;
    end = end || endDate;
    if (moment(start).isAfter(moment(end))) {
      end = start;
    }
    setIsUpdated(true);
    setStartDate(start);
    setEndDate(end);
  };
  const updateDate = () => {
    updateTrackingRange({
      serviceType: props.countryData.serviceType,
      startDate,
      endDate,
      isNotificationsEnabled,
    })
      .then((response) => {
        if (response !== true) {
          setStartDate(new Date(props.data.trackingStartDate));
          setEndDate(new Date(props.data.trackingEndDate));
          setNotificationsEnabled(props.data.notificationsEnabled);
        }
        setIsUpdated(false);
        setNotifUpdated(false);
      })
      .then((result) => {
        setIsUpdated(false);
        setNotifUpdated(false);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <Typography sx={{ marginTop: 5 }} color={colors.brown[400]} variant="h6">
        Takip aralığı
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Bu ülke için bildirim almak istediğiniz zaman aralığını seçiniz.
      </Typography>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack>
          <Typography variant="subtitle2">Başlangıç tarihi</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
            <DatePicker value={startDate} onChange={(date) => handleChange(date, undefined)} />
          </LocalizationProvider>
          <Typography variant="subtitle2">Bitiş tarihi</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
            <DatePicker value={endDate} onChange={(date) => handleChange(undefined, date)} />
          </LocalizationProvider>
          <Stack direction={'row'} alignItems={'center'} marginTop={5}>
            <Switch
              checked={isNotificationsEnabled}
              onChange={() => {
                toggleCheckbox();
              }}
            />
            <span>Bu ülke için bildirim gönder.</span>
          </Stack>
        </Stack>
      </Stack>
      <Button
        disabled={!isUpdated && !isNotifUpdated}
        size="large"
        color="success"
        onClick={updateDate}
        variant="contained"
      >
        Kaydet
      </Button>
    </>
  );
}
