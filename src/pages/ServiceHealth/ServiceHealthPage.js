import { Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CalendarService from 'src/api/CalendarService';
import { LoadingScreen } from 'src/components/loading-screen';
import { GlobalContext } from 'src/context/GlobalProvider';
import CalendarView from '../dashboard/calendar/calendar-view';
import ConfigService from 'src/api/ConfigService';
// sections
import { dataSeries } from '../dashboard/calendar/dateSeries';
import ReactApexChart from 'react-apexcharts';
import ServiceHealthChart from './ServiceHealthChart';

// ----------------------------------------------------------------------

export default function ServiceHealthPage() {
  const { getPings } = ConfigService();
  const { servicePings, configs } = useContext(GlobalContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    getPings().then((out) => {
      if (out != null) {
        let dat = Object.entries(out).reduce((output, entry) => {
          let configId = entry[0];
          let data = entry[1];
          let config = configs.searchConfigs.find((x) => x.id == configId);
          if (output['' + config.serviceType] === undefined)
            output['' + config.serviceType] = [{ config: config, data: data }];
          else output['' + config.serviceType].push({ config: config, data: data });
          return output;
        }, {});

        setData(dat);
      }
    });
  }, []);
  if (data === null || data === undefined) return <LoadingScreen></LoadingScreen>;
  return (
    <>
      <Helmet>
        <title> Takvim</title>
      </Helmet>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Takvim
      </Typography>
      {Object.entries(data).map((dat) => {
        return <ServiceHealthChart key={dat[0]} serviceType={dat[0]} series={dat[1]} />;
      })}
    </>
  );
}
