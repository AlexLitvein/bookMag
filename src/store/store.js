import { createStore } from 'redux';
import sensDataRdcr from '../rdcrs/weatherData/rdcr';




  const MyStore = createStore(sensDataRdcr);

  export default MyStore;