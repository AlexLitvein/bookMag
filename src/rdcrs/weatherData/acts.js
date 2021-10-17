export const GET_SENS_DATA = 'GET_SENS_DATA';
export const SET_SENS_DATA = 'SET_SENS_DATA';

export const setSensData = (data) => {
    console.log('act setSensData');
    return {
        type: SET_SENS_DATA,
        payload: data,
    }
};

export const getSensData = (date, count) => {
    console.log('act getSensData');
    return {
        type: GET_SENS_DATA,
        date: date,
        count: count,
    }
};
