// export const FETCH_SENS_DATA = 'FETCH_SENS_DATA';
export const SET_SENS_DATA = 'SET_SENS_DATA';

export const setSensData = (date, count) => {
    console.log('act setSensData');
    return {
        type: SET_SENS_DATA,
        date: date,
        count: count
    }
};
