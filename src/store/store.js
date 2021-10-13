import sensDataRdcr from '../rdcrs/weatherData/rdcr';
import statusRdcr from '../rdcrs/status/rdcr';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import MySaga from './my_saga';


const rootReducer = combineReducers({
  sensData: sensDataRdcr,
  status: statusRdcr
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const MyStore = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(MySaga);

export default MyStore;