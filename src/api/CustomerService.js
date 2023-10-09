import { useContext } from 'react';

import { GlobalContext } from '../context/GlobalProvider';
import api from './api';

export default function CustomerService() {
  let { setCustomers, customerList, setCustomerNames } = useContext(GlobalContext);

  const getCustomers = async (data, errorMsg) => {
    return api
      .get('customer/customer')
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          console.log(result.data);
          setCustomers(result.data);
          return result.data;
        } else {
          if (errorMsg !== undefined) errorMsg(result.data.error.message);
        }
      })
      .catch((err) => {
        if (errorMsg !== undefined)
          errorMsg(
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };

  const getCustomer = async (id, errorMsg) => {
    return api
      .get(`customer/sessionByCustomer?id=${id.id === undefined ? parseInt(id) : id.id}`)
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          console.log(result.data);
          return result.data;
        } else {
          console.C;
          if (errorMsg !== undefined) errorMsg(result.data.error.message);
        }
      })
      .catch((err) => {
        if (errorMsg !== undefined)
          errorMsg(
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };
  const setClients = async (id, data, errorMsg) => {
    return api
      .post(`customer/updateCustomerSession?id=${parseInt(id)}`, data)
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          console.log(result.data);
          return result.data;
        } else {
          if (errorMsg !== undefined) errorMsg(result.data.error.message);
        }
      })
      .catch((err) => {
        if (errorMsg !== undefined)
          errorMsg(
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };
  const getCustomerNames = async (id, errorMsg) => {
    return api
      .get(`Customer/names`)
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          setCustomerNames(result.data);
          return result.data;
        } else {
          if (errorMsg !== undefined) errorMsg(result.data.error.message);
        }
      })
      .catch((err) => {
        if (errorMsg !== undefined)
          errorMsg(
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };

  const addCustomer = async (data, errorMsg) => {
    return api

      .post('customer', data)
      .then(async (result) => {
        let customerData = { ...customerList };
        let customers2 = [...customerList.customers];
        if (data.id !== 0 && data.id !== undefined && data.id !== null)
          customers2 = customers2.filter((customer) => customer.id !== data.id);
        customers2.push(result.data);
        customerData.customers = customers2;

        setCustomers(customerData);
        return result.data;
      })
      .catch((err) => {
        if (errorMsg !== undefined)
          errorMsg(
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };

  const deleteCustomer = async (id, errorMsg) => {
    return api

      .delete('customer?customerId=' + id)
      .then(() => {
        let customers = customerList.filter((customer) => customer.id !== id);
        setCustomers(customers);
      })
      .catch((err) => {
        if (errorMsg !== undefined)
          errorMsg(
            'Sistemsel bir hata var. Lütfen yetkiliye başvurun.İletişim: feritzcan93@gmail.com',
            'danger'
          );
      });
  };

  return {
    getCustomers,
    addCustomer,
    deleteCustomer,
    getCustomer,
    getCustomerNames,
    setClients,
  };
}
