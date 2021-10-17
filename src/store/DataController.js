import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
// import sensDataRdcr from '../rdcrs/weatherData/rdcr';
import statusRdcr from '../rdcrs/status/rdcr';
import MyGraph from '../classes/ChartObject';
import { setError, setLoaded, setLoading } from '../rdcrs/status/acts';
// import { setSensData, GET_SENS_DATA } from '../rdcrs/weatherData/acts';
import { remote_data } from './remoteData';
import { GET_SENS_DATA, pathRdcr, setAniPath, setPath } from '../svgDataRdcrs/paths';
// import SvgHelpers from '../classes/svgHelpers';
const { call, put, takeLatest, delay } = require('redux-saga/effects');

const rootReducer = combineReducers({
    paths: pathRdcr,
    status: statusRdcr
});
// const rootReducer = combineReducers({
//     sensDataRdcr,
//     statusRdcr
// });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const MyStore = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));


function splitObjDataToArr(arrObjects) {
    const out = {};
    if (arrObjects.length !== 0) {
        let o = arrObjects[0];
        for (const key in o) {
            out[key] = [];
        }

        arrObjects.forEach(el => {
            for (const key in el) {
                out[key].push(el[key]);
            }
        });
    }
    return out;
}

function* fetchSensData(act) {
    console.log('fetchSensData', act);
    // try {
    //     yield put(setLoading());
    //     const o = yield call(splitObjDataToArr(remote_data[0]));
    //     act.payload = yield call(MyGraph.buildPathObj(0, 100, o.h));
    //     yield put(setSensData(act));
    //     yield put(setLoaded());
    // } catch (e) {
    //     yield put(setError(e.message));
    // }

    try {
        yield put(setLoading());
        const o = yield call(splitObjDataToArr, remote_data[0]);
        // const data = yield call(MyGraph.buildPathObj, 0, 100, o.h);
        const data = yield call(()=>{ return MyGraph.buildPathObj(0, 100, o.h)});

        // yield call(console.log, 'act.payload', act.payload);
       
        yield put(setAniPath(-1, data));
        yield put(setLoaded());
    } catch (e) {
        yield put(setError(e.message));
    }
};

function* sagaWatcher() {
    console.log('proc');
    yield takeLatest(GET_SENS_DATA, fetchSensData);
}


sagaMiddleware.run(sagaWatcher);
export default MyStore;

