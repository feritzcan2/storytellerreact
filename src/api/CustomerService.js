import api from './api';
import { useContext, useReducer } from 'react';
import { GlobalContext } from '../context/GlobalProvider';

export default function CustomerService() {
  let { setCustomers, customerList } = useContext(GlobalContext);

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
        let customers2 = [...customers];
        if (data.id !== 0 && data.id !== undefined && data.id !== null)
          customers2 = customers2.filter((customer) => customer.id !== data.id);
        customers2.push(result.data);
        setCustomers(customers2);
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
  };
}
