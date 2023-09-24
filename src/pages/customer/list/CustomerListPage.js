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
      <UserListView tableData={customerList} />
    </>
  );
}
