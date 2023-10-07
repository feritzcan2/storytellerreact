import { useContext } from 'react';
import { GlobalContext } from 'src/context/GlobalProvider';

// ----------------------------------------------------------------------

export function useConfigs(customer) {
  const { configs } = useContext(GlobalContext);
  debugger;
  return {
    taxType: configs.taxTypes.filter((data) => data.id === customer.taxType)[0],
    country: configs.countries.filter((data) => data.id === customer.country)[0],
    visaType: configs.visaTypes.filter((data) => data.id === customer.visaType)[0],
  };
}
