export const FETCH_SENS_DATA = 'FETCH_SENS_DATA';
export const ADD_SENS_DATA = 'ADD_SENS_DATA';

export const fetchSensData = (req) => {
    console.log('act fetchSensData');
    return {
        type: FETCH_SENS_DATA,
        payload: req
    }
};

export const addSensData = (data) => {
    console.log('act addSensData');
    return {
        type: ADD_SENS_DATA,
        payload: data
    }
};