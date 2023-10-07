import axios from 'axios';

export default function ClientService() {
  const getClients = async (id, errorMsg) => {
    debugger;
    return axios
      .get(`Customer/sessionByCustomer?id=${id}`)
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

  const setClients = async (id, data, errorMsg) => {
    return axios
      .post(`Customer/updateCustomerSession?id=${id}`, data)
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

  return {
    getClients,
    setClients,
  };
}
