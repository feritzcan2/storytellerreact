import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// utils
import { fDateTime } from 'src/utils/format-time';
// api
// components
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
// ----------------------------------------------------------------------
import dayjs from 'dayjs';
import CalendarService from 'src/api/CalendarService';

export default function CalendarForm({ currentEvent, colorOptions, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const { addCalendarEntry, removeCalendarEntry } = CalendarService();

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Başlık gerekli'),
    description: Yup.string().max(5000, 'Açıklama en fazla 5000 harf olabilir'),
    // not required
    color: Yup.string(),
    start: Yup.mixed(),
  });
  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: currentEvent,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const dateError = false;

  const onSubmit = handleSubmit(async (data) => {
    const eventData = {
      id: currentEvent?.id === '' ? undefined : currentEvent?.id,
      color: data?.color,
      title: data?.title,
      description: data?.description,
      date: data?.start.toISOString(),
    };
    try {
      if (!dateError) {
        await addCalendarEntry(eventData);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onDelete = useCallback(async () => {
    try {
      if (currentEvent.editable === true) await removeCalendarEntry(`${currentEvent?.id}`);
      enqueueSnackbar('Delete success!');
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [currentEvent?.id, enqueueSnackbar, onClose]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="title" label="Başlık" />

        <RHFTextField name="description" label="Not açıklaması" multiline rows={3} />

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
              <MobileDateTimePicker
                {...field}
                value={dayjs(field.value)}
                onChange={(newValue) => {
                  if (newValue) {
                    console.log(fDateTime(newValue));
                    field.onChange(newValue);
                  }
                }}
                label="Gün"
                format="dd/MM/yyyy hh:mm a"
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker
              selected={field.value}
              onSelectColor={(color) => field.onChange(color)}
              colors={colorOptions}
            />
          )}
        />
      </Stack>

      <DialogActions>
        {!!currentEvent?.id && (
          <Tooltip title="Delete Event">
            <IconButton onClick={onDelete}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onClose}>
          İptal
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={dateError}
        >
          Kaydet
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}

CalendarForm.propTypes = {
  colorOptions: PropTypes.arrayOf(PropTypes.string),
  currentEvent: PropTypes.object,
  onClose: PropTypes.func,
};
