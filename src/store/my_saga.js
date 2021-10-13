// import firebase from "firebase";
// import { addMsg, CHATS_ADD_CHAT, CHATS_ADD_MSG, CHATS_DEL_CHAT } from './reducerChats/actions';
// import { PROFILE_SET_NAME, PROFILE_SHOW_NAME } from "./reducerProfile/actions";

import { setError, setLoaded, setLoading } from '../rdcrs/status/act';
import { addSensData, ADD_SENS_DATA, FETCH_SENS_DATA } from '../rdcrs/weatherData/acts';

// import { GISTS_SET_LOADING, setGistsSuccess, setGistsFailure } from './reduserGists/actions';
const { put, takeLatest, delay } = require('redux-saga/effects');

const data1 = [
    { "_id": "2021-01-04T12:00:00.032Z", "t": -24.2, "p": 779.7, "h": 62.3 },
    { "_id": "2021-01-04T13:00:00.033Z", "t": -23.9, "p": 779.8, "h": 62.8 },
    { "_id": "2021-01-04T14:00:00.034Z", "t": -23.7, "p": 779.8, "h": 62.7 },
    { "_id": "2021-01-04T15:00:00.034Z", "t": -23.4, "p": 779.9, "h": 62.3 },
    { "_id": "2021-01-04T16:00:00.033Z", "t": -23.6, "p": 779.7, "h": 63.1 },
    { "_id": "2021-01-04T17:00:00.032Z", "t": -23.7, "p": 779.6, "h": 63.3 },
    { "_id": "2021-01-04T18:00:00.032Z", "t": -23.9, "p": 779.6, "h": 62.4 },
    { "_id": "2021-01-04T19:00:00.033Z", "t": -23.9, "p": 779.7, "h": 61.7 },
    { "_id": "2021-01-04T20:00:00.033Z", "t": -23.9, "p": 779.6, "h": 61 },
    { "_id": "2021-01-04T21:00:00.033Z", "t": -23.9, "p": 779.7, "h": 60.6 },
];
const data2 = [
    { "_id": "2021-01-04T22:00:00.033Z", "t": -23.7, "p": 779.8, "h": 60.7 },
    { "_id": "2021-01-04T23:00:00.032Z", "t": -23.9, "p": 779.9, "h": 60.8 },
    { "_id": "2021-01-05T00:00:00.031Z", "t": -23.7, "p": 779.7, "h": 61 },
    { "_id": "2021-01-05T01:00:00.032Z", "t": -23.3, "p": 779.7, "h": 60.5 },
    { "_id": "2021-01-05T02:00:00.032Z", "t": -23.1, "p": 779.8, "h": 60.7 },
    { "_id": "2021-01-05T03:00:00.032Z", "t": -23.8, "p": 779.9, "h": 62 },
    { "_id": "2021-01-05T04:00:00.033Z", "t": -24, "p": 779.9, "h": 61.8 },
    { "_id": "2021-01-05T05:00:00.033Z", "t": -22.9, "p": 779.9, "h": 60.3 },
    { "_id": "2021-01-05T06:00:00.032Z", "t": -22.2, "p": 779.8, "h": 58.1 },
    { "_id": "2021-01-05T07:00:00.032Z", "t": -21, "p": 779.6, "h": 55 },
];
const data3 = [
    { "_id": "2021-01-05T08:00:00.031Z", "t": -20.3, "p": 779.7, "h": 52.8 },
    { "_id": "2021-01-05T09:00:00.032Z", "t": -7.5, "p": 779.5, "h": 27.1 },
    { "_id": "2021-01-05T11:00:00.033Z", "t": -23, "p": 779.8, "h": 69.2 },
    { "_id": "2021-01-05T12:00:00.032Z", "t": -23.6, "p": 779.7, "h": 70.5 },
    { "_id": "2021-01-05T10:00:00Z", "t": -21.5, "p": 779.7, "h": 58.3 },
    { "_id": "2021-01-05T13:00:00.035Z", "t": -24, "p": 779.4, "h": 71.2 },
    { "_id": "2021-01-05T14:00:00.033Z", "t": -25.1, "p": 779.2, "h": 70.4 },
    { "_id": "2021-01-05T15:00:00.032Z", "t": -26.6, "p": 778.9, "h": 68.9 },
    { "_id": "2021-01-05T16:00:00.033Z", "t": -25.5, "p": 778.6, "h": 71 },
    { "_id": "2021-01-05T17:00:00.032Z", "t": -24.7, "p": 778.3, "h": 70 }
];

function splitArrBy(params) {

}

const remote_data = [data1, data2, data3]; //

function* fetchSensData(act) {
    try {
        yield put(setLoading());
        yield put(addSensData(remote_data[0]));
        yield put(setLoaded());
    } catch (e) {
        yield put(setError(e.message));
    }
};

export default function* MySaga() {
    yield takeLatest(FETCH_SENS_DATA, fetchSensData);
}