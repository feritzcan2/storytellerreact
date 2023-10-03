import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useContext, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// _mock
import { USER_STATUS_OPTIONS } from 'src/_mock';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GlobalContext } from 'src/context/GlobalProvider';
import CustomerService from 'src/api/CustomerService';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const { addCustomer } = CustomerService();

  const { configs } = useContext(GlobalContext);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('İsim gerekli'),
    city: Yup.number().required('Şehir gerekli'),
    email: Yup.string().email('Email  gerekli'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.number().required('Country is required'),
    visaType: Yup.number().required('Country is required'),
    taxType: Yup.number().required('Country is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.fullName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phone || '',
      country: currentUser?.country,
      city: currentUser?.city,
      taxType: currentUser?.taxType,
      visaType: currentUser?.visaType,
      status: currentUser?.status,
      appointmentDate: currentUser?.appointmentDate || undefined,
      plannedTravelDate: currentUser?.plannedTravelDate || undefined,
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
      debugger;
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
            Account is waiting for confirmation
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
            <RHFSelect name="status" label="Status">
              {configs.customerStatuses.map((status) => (
                <MenuItem key={status.value} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="name" label="İsim" />
            <RHFTextField name="email" label="Email adresi" />
            <RHFTextField name="phoneNumber" label="Telefon numarası" />
            <RHFSelect name="city" label="Şehir">
              {configs.cities.map((status) => (
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
            <RHFSelect name="taxType" label="Vergi Türü">
              {configs.taxTypes.map((status) => (
                <MenuItem key={status.value} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </RHFSelect>
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

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
              <Controller
                control={control}
                name="appointmentDate"
                render={({ field }) => (
                  <DateTimePicker
                    label="Vize Randevu Tarihi "
                    value={field.value}
                    ampm={false}
                    onChange={(value, cont) => {
                      if (cont.validationError === null) {
                        field.onChange(value);
                      } else {
                        defaultValues.appointmentDate = null;
                      }
                    }}
                    onAccept={() => {}}
                  />
                )}
              />
              <Controller
                control={control}
                name="plannedTravelDate"
                render={({ field }) => (
                  <DateTimePicker
                    label="Planlanan Gidiş Tarihi "
                    value={field.value}
                    ampm={false}
                    onChange={(value, cont) => {
                      if (cont.validationError === null) {
                        field.onChange(value);
                      } else {
                        defaultValues.appointmentDate = null;
                      }
                    }}
                  />
                )}
              />
            </LocalizationProvider>
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
