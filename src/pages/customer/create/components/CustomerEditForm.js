import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useCallback, useContext, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

// utils
// routes
import { useRouter } from 'src/routes/hooks';
// assets
// components
import { MenuItem } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router';
import CustomerService from 'src/api/CustomerService';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import { GlobalContext } from 'src/context/GlobalProvider';

// ----------------------------------------------------------------------
export const INVOICE_SERVICE_OPTIONS = [
  {
    id: 0,
    name: 'Öğrenci',
  },
  {
    id: 1,
    name: 'Çalışan',
  },
  {
    id: 2,
    name: 'Bebek',
  },
];

export default function CustomerEditForm({ currentUser, configs }) {
  const router = useRouter();
  const nav = useNavigate();
  const { addCustomer } = CustomerService();
  if (configs === undefined) {
    configs = useContext(GlobalContext).configs;
  }
  let isEdit = currentUser != undefined && currentUser?.id !== undefined && currentUser?.id > 0;
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('İsim gerekli'),
    surname: Yup.string().required('İsim gerekli'),
    city: Yup.number().required('Şehir gerekli'),
    email: Yup.string().email('Email  gerekli'),
    phoneNumber: Yup.string().required('Telefon numarası gerekli'),
    country: Yup.number().required('Country is required'),
    visaType: Yup.number().required('Vize türü gerekli'),
    taxType: Yup.number().required('Vergi türü gerekli'),
    plannedTravelDate: Yup.date().notRequired(),
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
      status: currentUser?.status || 0,
      appointmentDate: undefined,
      plannedTravelDate: undefined,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    var data2 = {
      country: data.country,
      city: data.city,
      taxType: data.taxType,
      visaType: data.visaType,
      name: data.name,
      status: data.status,
      surname: data.surname,
      appointmentDate: data.appointmentDate,
      plannedTravelDate: data.plannedTravelDate,
      phone: data.phoneNumber,
      email: data.email,
    };
    try {
      addCustomer(data2).then((res) => {
        if (res != undefined && res.id > 0 && isEdit === false) {
          nav('/musteri/' + res.id);
        }
        reset();
        enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      });
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Stack sx={{ mb: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                sx={{ width: 150, height: 150 }}
                src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br />
                  </Typography>
                }
              />
            </Stack>
            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Hoşgeldin mesajı
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Kullanıcıya hoşgeldin mesajı gönderilsin.
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
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
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: field.value === null,
                          helperText: '',
                        },
                      }}
                      value={field.value || null}
                      label="Planlanan Gidiş Tarihi "
                      ampm={false}
                      onChange={(value, cont) => {
                        if (cont.validationError === null) {
                          field.onChange(value);
                        } else {
                          field.onChange(null);
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
              {/* <RHFSelect name={`gfdgfd`} label="Service" sx={{}}>
                {INVOICE_SERVICE_OPTIONS.map((service) => (
                  <MenuItem key={service.id} value={service.name}>
                    {service.name}
                  </MenuItem>
                ))}
              </RHFSelect> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Oluştur' : 'Kaydet'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CustomerEditForm.propTypes = {
  currentUser: PropTypes.object,
};
