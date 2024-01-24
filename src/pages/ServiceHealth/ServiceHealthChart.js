import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CalendarService from 'src/api/CalendarService';
import { LoadingScreen } from 'src/components/loading-screen';
import { GlobalContext } from 'src/context/GlobalProvider';
import CalendarView from '../dashboard/calendar/calendar-view';
import ConfigService from 'src/api/ConfigService';
// sections
import { dataSeries } from '../dashboard/calendar/dateSeries';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

// ----------------------------------------------------------------------

export default function ServiceHealthChart({ serviceType, series }) {
  debugger;
  let country = serviceType === '0' ? 'Almanya' : serviceType === '5' ? 'İtalya' : 'Yunanistan';

  let prepareData = (d) => {
    let name = d.config.office;
    if (serviceType == '1') {
      name = d.config.dealerId;
      if (d.config.dealerId === '1') name = 'İstanbul';
      if (d.config.dealerId === '1013') name = 'Kuşadası';
      if (d.config.dealerId === '5') name = 'İzmir';
    }
    let out = d.data.reduce((x, y) => {
      x.push(new Date(y.date));
      return x;
    }, []);
    out.sort((x, y) => {
      return x[0] - y[0];
    });
    let now = new Date();
    let tenMinAgo = new Date();
    tenMinAgo.setMinutes(tenMinAgo.getMinutes() - 11, 0, 0);
    let diff = now.getTime() - tenMinAgo.getTime();

    let parsed = [];
    let parsedTest = [];
    let nodeStart = null;
    let nodeEnd = null;
    for (let a = 0; a < out.length; a++) {
      let current = out[a];
      if (nodeStart == null) nodeStart = current;
      if (nodeEnd == null) nodeEnd = current;

      if (current.getTime() - nodeEnd.getTime() < diff) {
        nodeEnd = current;
      } else {
        parsed.push({
          x: country,
          y: [nodeStart.getTime(), nodeEnd.getTime()],
        });
        parsedTest.push({
          x: country,
          y: [nodeStart, nodeEnd],
        });
        nodeStart = current;
        nodeEnd = current;
      }
    }
    parsed.push({
      x: country,
      y: [nodeStart.getTime(), nodeEnd.getTime()],
    });
    return {
      name: name,
      data: parsed,
    };
  };
  let chart = (d) => {
    let parsed = d.map((x, y) => prepareData(x));
    let state = {
      series: parsed,
      options: {
        chart: {
          height: 350,
          type: 'rangeBar',
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            var a = moment(val[0]);
            var b = moment(val[1]);
            var diff = b.diff(a, 'hours');
            var minutes = b.diff(a, 'minutes');
            return diff + ' saat' + ' (' + minutes + ' dakika)';
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        xaxis: {
          type: 'datetime',
        },
        legend: {
          position: 'top',
        },
      },
    };
    return state;
  };
  let state = chart(series);
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="rangeBar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
