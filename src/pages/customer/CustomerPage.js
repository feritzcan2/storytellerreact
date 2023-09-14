import { Helmet } from 'react-helmet-async';
// sections
import UserListView from './userList/user-list-view';
import { GlobalContext } from 'src/context/GlobalProvider';
import { useContext, useEffect, useState } from 'react';
import CustomerService from 'src/api/CustomerService';

// ----------------------------------------------------------------------

export default function CustomerPage() {
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

      <UserListView customers={customerList} />
    </>
  );
}
