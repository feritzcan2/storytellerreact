import api from './api';
import { useContext, useReducer } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
const pako = require('pako');

export default function ConfigService() {
  let { setConfigs,setPings,configs} = useContext(GlobalContext);

  const getConfigs = async (data, errorMsg) => {
    return api
      .get('config')
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          console.log(result.data);
          setConfigs(result.data);
          return result.data
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
  const getPings = async (data, errorMsg) => {

    let lastUpdateDate = localStorage.getItem('lastPingUpdateDate');
    var route= 'admin/pings'
    if(lastUpdateDate !== undefined && lastUpdateDate !== null){
      route+='?date='+lastUpdateDate
    }
    let output = {}
          

    return api
      .get(route)
      .then(async (result) => {
        if (
          result !== undefined &&
          (result.data.error === null || result.data.error === undefined)
        ) {
          try{

          const updatesByConfigId = result.data.reduce((acc, update) => {

            const { id } = update;
            if (!acc[id]) {
              acc[id] = [];
            }
            acc[id].push(update);
            return acc;
          }, {});
          const entries = Object.entries(updatesByConfigId);
          let cnfg = configs
          if(configs == null || configs === undefined)
          cnfg = await getConfigs()
        
          for( let a=0; a<cnfg.searchConfigs.length;a++){
            
            let search = cnfg.searchConfigs[a].id
            let index = entries.findIndex(x=>x[0]==""+search)
            if(index<0) entries.push([search,[]])
          }
          
          for (const [index, arr] of Object.entries(entries)) {
            let key = arr[0]
            let value=arr[1]
            output[key] = []
            const storedCompressedData = localStorage.getItem('ping'+key);
            
            if(storedCompressedData !==null && storedCompressedData !==undefined){
              const storedArrayOfObjects = JSON.parse(storedCompressedData);
              output[key] = storedArrayOfObjects
            }
            output[key] = output[key].concat(value)
            const jsonString = JSON.stringify(output[key]);
            // const compressedData = pako.deflate(jsonString, { to: 'string' });
            // const textDecoder = new TextDecoder('utf-8');
            //const compressedDataString = textDecoder.decode(compressedData);

            localStorage.setItem('ping'+key, jsonString);
          }
          lastUpdateDate = new Date().toISOString()
           localStorage.setItem('lastPingUpdateDate', lastUpdateDate);
          setPings(output);
          return output
          }catch(error){
            debugger
            console.log(error)
          }
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
    getConfigs,
    getPings
  };
}
