import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useContext, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFSelect,
} from 'src/components/hook-form';
import { Divider, MenuItem } from '@mui/material';
import ConfigService from 'src/api/ConfigService';
import { GlobalContext } from 'src/context/GlobalProvider';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomerService from 'src/api/CustomerService';

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
  const { addCustomer } = CustomerService();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('İsim gerekli'),
    city: Yup.string().required('Şehir gerekli'),
    email: Yup.string().email('Email  gerekli'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    visaType: Yup.string().required('Country is required'),
    taxType: Yup.string().required('Country is required'),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      visaType: currentUser?.visaType || '',
      email: currentUser?.email || '',
      city: currentUser?.city || '',
      country: currentUser?.country || '',
      taxType: currentUser?.taxType || '',
      phoneNumber: currentUser?.phoneNumber || '',
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
      country: configs.countries.filter((country) => country.name === data.country)[0].id,
      city: configs.cities.filter((city) => city.name === data.city)[0].id,
      taxType: configs.taxTypes.filter((tax) => tax.name === data.taxType)[0].id,
      visaType: configs.visaTypes.filter((tax) => tax.name === data.visaType)[0].id,
      name: data.name,
      phone: data.phoneNumber,
      email: data.email,
    };
    try {
      addCustomer(data2).then(() => {
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

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
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
                    Formatlar *.jpeg, *.jpg, *.png, *.gif
                    <br /> En büyük {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

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
              <RHFTextField name="name" label="İsim" />
              <RHFTextField name="email" label="Email adresi" />
              <RHFTextField name="phoneNumber" label="Telefon numarası" />
              <RHFAutocomplete
                name="city"
                label="Başvuru şehri"
                options={configs.cities.map((country) => {
                  return country.name;
                })}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { name, id } = configs.cities.filter(
                    (country) => country.name === option
                  )[0];

                  if (!name) {
                    return null;
                  }

                  return (
                    <li {...props} key={id}>
                      {name}
                    </li>
                  );
                }}
              />
              <RHFAutocomplete
                name="visaType"
                label="Vize Türü"
                options={configs.visaTypes.map((country) => {
                  return country.name;
                })}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { name, id } = configs.visaTypes.filter(
                    (country) => country.name === option
                  )[0];

                  if (!name) {
                    return null;
                  }

                  return (
                    <li {...props} key={id}>
                      {name}
                    </li>
                  );
                }}
              />
              <RHFAutocomplete
                name="taxType"
                label="Vergi Türü"
                options={configs.taxTypes.map((country) => {
                  return country.name;
                })}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { name, id } = configs.taxTypes.filter(
                    (country) => country.name === option
                  )[0];

                  if (!name) {
                    return null;
                  }

                  return (
                    <li {...props} key={id}>
                      {name}
                    </li>
                  );
                }}
              />
              <RHFAutocomplete
                name="country"
                label="Başvuru yapılacak ülke"
                options={configs.countries.map((country) => {
                  return country.name;
                })}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, name, id } = configs.countries.filter(
                    (country) => country.name === option
                  )[0];

                  if (!name) {
                    return null;
                  }

                  return (
                    <li {...props} key={id}>
                      <Iconify
                        key={name}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {name} ({code})
                    </li>
                  );
                }}
              />
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
