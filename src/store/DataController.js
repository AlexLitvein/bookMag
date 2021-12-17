import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
// import statusRdcr from '../rdcrs/status/rdcr';
// import { setError, setLoaded, setLoading } from '../rdcrs/status/acts';
import { remote_data } from './remoteData';
import { GET_SENS_DATA, dataSetsRdcr, setDataSet, setStatus, STATUS } from '../dataRdcrs/paths';
const { call, put, takeLatest, delay } = require('redux-saga/effects');

const rootReducer = combineReducers({
    chartData: dataSetsRdcr,
    // status: statusRdcr
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const MyStore = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

function* fetchSensData(act) { // act = { date, count, func }
    // console.log('fetchSensData', act);
    try {

        // yield put(setStatus(STATUS.LOADING));
        const idx = act.payload.date.getDate();
        const receivedData = yield remote_data[0].slice(idx, idx + act.payload.range).filter((el, i) => {
            return (i % act.payload.stride) === 0;
        });
        // console.log('receivedData', receivedData);
        const data = yield call(act.payload.func, receivedData);
        yield delay(2000);
        yield put(setDataSet(data)); //{ data }

        // yield put(setStatus(STATUS.LOADED));
    } catch (e) {
        // yield put(setStatus(STATUS.ERROR));
    }
};

function* sagaWatcher() {
    console.log('sagaWatcher');
    yield takeLatest(GET_SENS_DATA, fetchSensData);
}

sagaMiddleware.run(sagaWatcher);
export default MyStore;

