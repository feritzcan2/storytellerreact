import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
// _mock
// assets
// components
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CustomerService from 'src/api/CustomerService';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { GlobalContext } from 'src/context/GlobalProvider';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const { addCustomer } = CustomerService();
  debugger;
  const { configs } = useContext(GlobalContext);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('İsim gerekli'),
    surname: Yup.string().required('İsim gerekli'),
    city: Yup.number().required('Şehir gerekli'),
    email: Yup.string().email('Email  gerekli'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.number().required('Country is required'),
    visaType: Yup.number().required('Country is required'),
    taxType: Yup.number().required('Country is required'),
    plannedTravelDate: Yup.date().required(),
    appointmentDate: Yup.object().notRequired(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      surname: currentUser?.surname || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phone || '',
      country: currentUser?.country,
      city: currentUser?.city,
      taxType: currentUser?.taxType,
      visaType: currentUser?.visaType,
      status: currentUser?.status,
      appointmentDate: dayjs(currentUser?.appointmentDate) || undefined,
      plannedTravelDate: dayjs(currentUser?.plannedTravelDate) || undefined,
    }),
    [currentUser]
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      let user = { ...currentUser };
      Object.keys(data).forEach((key) => {
        user[key] = data[key];
      });
      addCustomer(user).then(() => {
        reset();
        onClose();
        enqueueSnackbar('Update success!');
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Düzenle</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Kişiyi düzenle
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFSelect name="status" label="Durum">
              {configs.customerStatuses.map((status) => (
                <MenuItem key={status.value} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="visaType" label="Vize Türü">
              {configs.visaTypes.map((status) => (
                <MenuItem key={status.value} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="name" label="İsim" />
            <RHFTextField name="surname" label="Soyisim" />
            <RHFTextField name="email" label="Email adresi" />
            <RHFTextField name="phoneNumber" label="Telefon numarası" />
            <RHFSelect name="city" label="Şehir">
              {configs.cities.map((status) => (
                <MenuItem key={status.value} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFSelect name="taxType" label="Vergi Türü">
              {configs.taxTypes.map((status) => (
                <MenuItem key={status.value} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </RHFSelect>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
              <Controller
                control={control}
                name="plannedTravelDate"
                defaultValue={undefined}
                render={({ field }) => (
                  <DatePicker
                    value={field.value || null}
                    label="Planlanan Gidiş Tarihi "
                    ampm={false}
                    onChange={(value, cont) => {
                      if (cont.validationError === null) {
                        field.onChange(value);
                      }
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                defaultValue={undefined}
                name="appointmentDate"
                render={({ field }) => (
                  <DateTimePicker
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: field.value === null,
                        helperText: '',
                      },
                    }}
                    label="Vize Randevu Tarihi "
                    value={field.value || null}
                    ampm={false}
                    onChange={(value, cont) => {
                      if (cont.validationError === null) {
                        field.onChange(value);
                      } else {
                        field.onChange(null);
                      }
                    }}
                    onAccept={() => {}}
                  />
                )}
              />
            </LocalizationProvider>
            <RHFSelect name="country" label="Başvuru yapılacak ülke">
              {configs.countries.map((status) => (
                <MenuItem key={status.value} value={status.id}>
                  <li key={status.id}>
                    <Iconify
                      key={name}
                      icon={`circle-flags:${status.code.toLowerCase()}`}
                      width={28}
                      sx={{ mr: 1 }}
                    />
                    {status.name} ({status.code})
                  </li>
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

UserQuickEditForm.propTypes = {
  currentUser: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
