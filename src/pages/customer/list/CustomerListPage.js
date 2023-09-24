import { Helmet } from 'react-helmet-async';
// sections
import UserListView from './user-list-view';
import { GlobalContext } from 'src/context/GlobalProvider';
import { useContext, useEffect, useState } from 'react';
import CustomerService from 'src/api/CustomerService';
import { Route, Routes } from 'react-router';
import { Switch } from '@mui/material';

// ----------------------------------------------------------------------

export default function CustomerListPage(page) {
  const { customerList } = useContext(GlobalContext);
  const { getCustomers } = CustomerService();

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: Five</title>
      </Helmet>
      <UserListView tableData={customers} />
    </>
  );
}
const customers = {
  customers: [
    {
      name: 'feritss',
      fullName: 'feritss ozcan',
      email: 'feritzcan93@gmail.com',
      surname: 'ozcan',
      phone: '+905325596676',
      appointmentDate: null,
      taxType: 0,
      taxTypeStr: 'HATALI',
      dateStr: 'Randevu Yok',
      files: null,
      id: 2,
    },
    {
      name: 'feritss22',
      fullName: 'feritss22 ozcan',
      email: 'feritzcan93@gmail.com',
      surname: 'ozcan',
      phone: '+905325596676',
      appointmentDate: null,
      taxType: 0,
      taxTypeStr: 'HATALI',
      dateStr: 'Randevu Yok',
      files: null,
      id: 4,
    },
    {
      name: 'ferit',
      fullName: 'ferit ozcan',
      email: 'feritzcan93@gmail.com',
      surname: 'ozcan',
      phone: '5325596676',
      appointmentDate: null,
      taxType: 1,
      taxTypeStr: 'Öğrenci',
      dateStr: 'Randevu Yok',
      files: null,
      id: 5,
    },
    {
      name: 'ferit',
      fullName: 'ferit ozcan',
      email: 'feritzcan93@gmail.com',
      surname: 'ozcan',
      phone: '5325596676',
      appointmentDate: null,
      taxType: 1,
      taxTypeStr: 'Öğrenci',
      dateStr: 'Randevu Yok',
      files: null,
      id: 6,
    },
    {
      name: 'ferit',
      fullName: 'ferit ozcan',
      email: 'feritzcan93@gmail.com',
      surname: 'ozcan',
      phone: '5325596676',
      appointmentDate: null,
      taxType: 1,
      taxTypeStr: 'Öğrenci',
      dateStr: 'Randevu Yok',
      files: null,
      id: 7,
    },
    {
      name: 'ferit',
      fullName: 'ferit ',
      email: null,
      surname: null,
      phone: null,
      appointmentDate: null,
      taxType: 0,
      taxTypeStr: 'HATALI',
      dateStr: 'Randevu Yok',
      files: null,
      id: 8,
    },
  ],
  columns: [
    {
      id: 0,
      columnName: 'İsim',
      key: 'fullName',
      subKey: null,
      isLabel: false,
      filter: null,
      labelColor: null,
    },
    {
      id: 1,
      columnName: 'İletişim',
      key: 'email',
      subKey: 'phone',
      isLabel: false,
      filter: null,
      labelColor: null,
    },
    {
      id: 2,
      columnName: 'Vergi Türü',
      key: 'taxTypeStr',
      subKey: null,
      isLabel: true,
      filter: {
        options: [
          {
            value: 'all',
            label: 'Hepsi',
          },
          {
            value: 'Emekli',
            label: 'Emekli',
          },
          {
            value: 'Öğrenci',
            label: 'Öğrenci',
          },
          {
            value: 'Çalışan',
            label: 'Çalışan',
          },
        ],
        isNullFilter: false,
      },
      labelColor: 'info',
    },
    {
      id: 3,
      columnName: 'Randevu Tarihi',
      key: 'dateStr',
      subKey: null,
      isLabel: true,
      filter: {
        options: [],
        isNullFilter: true,
      },
      labelColor: null,
    },
  ],
  error: null,
};
