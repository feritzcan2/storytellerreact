import isEqual from 'lodash/isEqual';
import { useCallback, useContext, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { useRouter } from 'src/routes/hooks';
// _mock
import { _roles, _userList } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
//
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TableCell,
} from '@mui/material';
import { useMemo } from 'react';
import CountryService from 'src/api/CountryService';
import EmptyContent from 'src/components/empty-content/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import { GlobalContext } from 'src/context/GlobalProvider';
import { default as UserTableRow, default as UserTableToolbar } from './components/user-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Kişi' },
  { id: 'company', label: 'Mail', width: 220 },
  { id: '', width: 88 },
];

const defaultFilters = {
  name: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function EmailList() {
  const { addMail, deleteMail } = CountryService();
  const context = useContext(GlobalContext);
  if (!context.userData || !context.userData.mailList) return <LoadingScreen />;
  const remove = (mail) => {
    deleteMail({ email: mail })
      .then((result) => {})
      .catch((error) => console.log('error', error));
  };
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Lütfen isim girin'),
    email: Yup.string().required('Lütfen email girin').email('Email adresi geçersiz'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();
  const dialogOpen = useBoolean();

  const [tableData, setTableData] = useState(_userList);

  const [filters, setFilters] = useState(defaultFilters);

  const dataInPage = tableData.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!tableData.length && canReset) || !tableData.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );
  const onSubmit = handleSubmit(async (data) => {
    try {
      await addMail({ mail: data.email, name: data.name });
      reset();
      dialogOpen.onFalse();
    } catch (error) {
      console.error(error);
    }
  });

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: tableData.length,
    });
  }, [tableData.length, dataInPage.length, table, tableData]);

  return (
    <>
      <Grid sx={{ minHeight: 560 }}>
        <Dialog fullWidth open={dialogOpen.value}>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <DialogTitle sx={{ pb: 2 }}>Email Ekle</DialogTitle>

            {
              <DialogContent sx={{ typography: 'body2' }}>
                <RHFTextField name="name" label="Kişinin ismi" />
                <Divider variant="fullWidth" sx={{ marginTop: 4, marginBottom: 4 }} />
                <RHFTextField name="email" label="Mail Adresi" />
              </DialogContent>
            }

            <DialogActions>
              <Button onClick={dialogOpen.onFalse} variant="outlined" color="inherit">
                Vazgeç
              </Button>

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Kaydet
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        </Dialog>
        <Card>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 5,
              pr: 0,
              mr: 0,
              pt: 3,
            }}
          >
            <Button
              sx={{ alignSelf: 'flex-end' }}
              variant="contained"
              onClick={dialogOpen.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Yeni Kişi Ekle
            </Button>
          </Container>
          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Sil">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{}}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {context.userData.mailList
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => remove(row.mail)}
                      />
                    ))}
                  {context.userData.mailList.length === 0 && (
                    <TableCell colSpan={12}>
                      <EmptyContent
                        filled
                        title="Mail listesi boş"
                        sx={{
                          py: 10,
                        }}
                      />
                    </TableCell>
                  )}

                  <TableEmptyRows height={denseHeight} />
                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={tableData.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Grid>
    </>
  );
}

// ----------------------------------------------------------------------
