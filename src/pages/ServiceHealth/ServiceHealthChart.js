import { Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CalendarService from 'src/api/CalendarService';
import { LoadingScreen } from 'src/components/loading-screen';
import { GlobalContext } from 'src/context/GlobalProvider';
import CalendarView from '../dashboard/calendar/calendar-view';
import ConfigService from 'src/api/ConfigService';
// sections
import { dataSeries } from "../dashboard/calendar/dateSeries";
import ReactApexChart from 'react-apexcharts';

// ----------------------------------------------------------------------

export default function ServiceHealthChart({
  serviceType,
data
}) {
  const { getPings } = ConfigService();
  const { servicePings } = useContext(GlobalContext);
  function findMissingDatesLastMonth(timestamps) {
  // Convert input timestamps to Date objects
  const actualDates = timestamps.map(timestamp => new Date(timestamp.date));

  // Function to generate expected timestamps for every 10 minutes within the last month
  const generateExpectedDatesLastMonth = (data) => {
    
    const expectedDates = [];
    const currentDate = new Date();
    
    currentDate.setDate(currentDate.getDate() - 3);

   const roundedMinutes = Math.floor(currentDate.getMinutes() / 10) * 10;
    currentDate.setMinutes(roundedMinutes, 0, 0);
        currentDate.setSeconds(0, 0); // Clear seconds and milliseconds

    while (currentDate <= new Date()) {
      expectedDates.push(new Date(currentDate));
      currentDate.setMinutes(currentDate.getMinutes() + 10);
    }

    return expectedDates;
  };

  // Generate expected timestamps for the last month
  const expectedDatesLastMonth = generateExpectedDatesLastMonth();

  const actualStr = actualDates.map(x=>x.toISOString())
  // Compare actual and expected dates to find the miss ing ones
  const missingDateStrings = expectedDatesLastMonth.map(x=>x.toISOString()).filter(date => !actualStr.includes(date));

  // Convert missing dates back to ISO string format

  return missingDateStrings;
}


  const chart =(d)=>{
    
    let text = "Text"
    if(d.config.serviceType ===1) text = d.config.city
    
        let missing = findMissingDatesLastMonth(d.data)
            let out = d.data.reduce((x,y)=>{
                x.push( [new Date(y.date).getTime(),1])
                  return x 

            },[])
            out = out.concat(missing.map(x=>[new Date(x).getTime(),0]))
            out.sort((x,y)=>{
               return x[0]-y[0]
            })
            let dates =[]
            let lastDate 
            let lastVal
            
            for(let a=0;a<out.length;a++){
                let date = out[a][0]
                let val = out[a][1]
                if(lastDate === undefined){
                    lastDate = date
                    lastVal = val
                }
                if(val!==lastVal){
                    dates.push([lastDate,lastVal])
                    dates.push([date- (10 * 60 * 1000),lastVal])
                    lastDate = date
                    lastVal = val
                }
            }
            if(dates.length>0 && lastVal !== dates[dates.length-1][1]){
                                    dates.push([lastDate,lastVal])

            }


    return { series: [
      {
        name: "XYZ MOTORS",
        data: dates
      }
    ],
    options: {
        animations:{
            enabled:false
        },
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: text,
        align: "left"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        max:1,
        min:0,
        labels: {
          formatter: function (val) {
            return val;
          }
        },
        title: {
          text: "Online"
        }
      },
      xaxis: {
        type: "datetime"
      },
      
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val;
          }
        }
      }
    }}
  }
  if(data ===null || data===undefined) return <LoadingScreen></LoadingScreen>
  
  return (
    <>
      <Helmet>
        <title> Takvim</title>
      </Helmet>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Takvim
      </Typography>
      <div>
              <div id="chart">
                  {data.map((dat) => {
                let c1 = chart(dat)
        return                 <ReactApexChart options={c1.options} series={c1.series} type="area" height={350} />

 
      })}
              </div>
              <div id="html-dist"></div>
            </div>
    </>
  );
}
