export const GET_SENS_DATA = 'GET_SENS_DATA';
export const SET_DATA_SET = 'SET_DATA_SET';
export const SET_STATUS = 'SET_STATUS';
export const STATUS = {
    EMPTY: 0,
    LOADING: 1,
    LOADED: 2,
    ERROR: 3,
};

export const setStatus = (payload) => {
    return {
        type: SET_STATUS,
        payload,
    }
};

export const setDataSet = (payload) => {
    return {
        type: SET_DATA_SET,
        payload,
    }
};

export const getSensData = (payload,) => { // date, count, func
    console.log('act getSensData');
    return {
        type: GET_SENS_DATA,
        payload,
    }
};

// набор данных: 
// [
//      { 
//           _id: ['2021-11-05', ...], 
//           t:   [21.2, ...],
//           p:   [36.9 ...],
//           h:   [12.5 ...]
//      },
//      ...
// ]
const initialState = {
    dataSets: [],
    status: STATUS.EMPTY,
};

export const selDataSets = (state) => state.chartData.dataSets;
// export const selText = (state) => state.chartData.text;
export const selStatus= (state) => state.chartData.status;

export function dataSetsRdcr(state = initialState, action) {
    // console.log('pathRdcr', action);

    switch (action.type) {

        case SET_STATUS:       
            return {
                ...state,
                status:  action.payload,
            };

        case SET_DATA_SET:       
            return {
                ...state,
                dataSets: [action.payload],
            };

        default:
            return state;
    }
}