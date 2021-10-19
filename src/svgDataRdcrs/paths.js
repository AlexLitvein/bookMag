export const GET_SENS_DATA = 'GET_SENS_DATA';
export const SET_ANI_PATH = 'SET_ANI_PATH';
export const SET_PATH = 'SET_PATH';
export const DO_RESIZE = 'DO_RESIZE';

export function AniPath(id, cls, d, to) {
    return {
        ...arguments
    };
}

export function StaticPath(id, cls, d) {
    return {
        ...arguments
    };
}

export const setAniPath = (payload) => {
    return {
        type: SET_ANI_PATH,
        payload,
    }
};

export const setPath = (payload) => {
    return {
        type: SET_PATH,
        payload,
    }
};

export const getSensData = (payload,) => { // date, count, func
    console.log('act getSensData');
    return {
        type: GET_SENS_DATA,
        payload,
        // date: date,
        // count: count,
        // func: func,
    }
};



// набор данных: 
// [
//     {
//         d: { rawData: ['2021-11-05', ...], pathD: '', pathTo: '' },
//         t: { rawData: [21.2, ...], pathD: '', pathTo: '' },
//         p: { rawData: [36.9 ...], pathD: '', pathTo: '' },
//         h: { rawData: [12.5 ...], pathD: '', pathTo: '' },
//     },
// ]

// other variant CURRENT
// [
//     [
//         { d: ['2021-11-05', ...], pathD: '', pathTo: '' },
//         { t: [21.2, ...], pathD: '', pathTo: '' },
//         { p: [36.9 ...], pathD: '', pathTo: '' },
//         { h: [12.5 ...], pathD: '', pathTo: '' },
//     ],
// ]

// other variant
// [
//     {
//         '2021-11-05+7': { // key 
//             d: { rawData: ['2021-11-05', ...], pathD: '', pathTo: ''},
//             t: { rawData: [21.2, ...], pathD: '', pathTo: ''},
//             p: { rawData: [36.9 ...], pathD: '', pathTo: ''},
//             h: { rawData: [12.5 ...], pathD: '', pathTo: ''},
//         }
//     },

// ]



const initialState = {
    aniPaths: [], // AniPath
    staticPaths: [], // Path
};

export const selAniPaths = (state) => state.paths.aniPaths;
export const selStaticPaths = (state) => state.paths.staticPaths;

export function pathRdcr(state = initialState, action) {
    console.log('pathRdcr', action);

    switch (action.type) {
        case SET_ANI_PATH:
            // console.log('action.SET_ANI_PATH:', state.aniPaths);
            state.aniPaths.push();
            return {
                ...state,
                aniPaths: [...state.aniPaths, action.payload.pathData],
            };



        case SET_PATH:
            state.staticPaths.push();
            return {
                ...state,
                staticPaths: [...state.staticPaths, action.payload.pathData],
            };

        default:
            return state;
    }
}