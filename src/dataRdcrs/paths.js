// import MyGraph from "../classes/ChartObject";

export const GET_SENS_DATA = 'GET_SENS_DATA';
export const SET_ANI_PATH = 'SET_ANI_PATH';
// export const SET_PATH = 'SET_PATH';
// export const SET_RESIZE_PATHS = 'SET_RESIZE_PATHS';
export const SET_TEXT = 'SET_TEXT';

export const setText = (payload) => {
    return {
        type: SET_TEXT,
        payload,
    }
};

export const setAniPath = (payload) => {
    return {
        type: SET_ANI_PATH,
        payload,
    }
};

// export const setPath = (payload) => {
//     return {
//         type: SET_PATH,
//         payload,
//     }
// };

// export const setResizePaths = () => {
//     return {
//         type: SET_RESIZE_PATHS,
//     }
// };

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
    aniPaths: [],
    // staticPaths: [],
    // axis: {},
    text: { t1: 'text1', t2: 'text2' },
    // text: ['text1', 'text2'],
};

export const selAniPaths = (state) => state.paths.aniPaths;
// export const selStaticPaths = (state) => state.paths.staticPaths;
export const selText = (state) => state.paths.text;

export function pathRdcr(state = initialState, action) {
    console.log('pathRdcr', action);

    switch (action.type) {
        case SET_TEXT:
            // console.log('action.SET_ANI_PATH:', state.aniPaths);            
            return {
                ...state,
                text: { ...action.payload },
                // text: { ...state.text, ...action.payload },
            };

        case SET_ANI_PATH:
            // console.log('action.SET_ANI_PATH:', state.aniPaths);           
            return {
                ...state,
                aniPaths: [...state.aniPaths, action.payload.pathData],
            };

        // case SET_RESIZE_PATHS:
        //     const res = [];
        //     state.aniPaths.forEach((el) => { res.push(MyGraph.resizePaths(el)) });
        //     // console.log('res', res);
        //     return {
        //         ...state,
        //         aniPaths: [...res],
        //     };

        // case SET_PATH:
        //     state.staticPaths.push();
        //     return {
        //         ...state,
        //         staticPaths: [...state.staticPaths, action.payload.pathData],
        //     };

        default:
            return state;
    }
}