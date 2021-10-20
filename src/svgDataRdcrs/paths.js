import MyGraph from "../classes/ChartObject";

export const GET_SENS_DATA = 'GET_SENS_DATA';
export const SET_ANI_PATH = 'SET_ANI_PATH';
export const SET_PATH = 'SET_PATH';
export const SET_RESIZE_PATHS = 'SET_RESIZE_PATHS';

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

export const setResizePaths = () => {
    return {
        type: SET_RESIZE_PATHS,
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
//         { d: ['2021-11-05', ...], do: '', to: '' },
//         { t: [21.2, ...], do: '', to: '' },
//         { p: [36.9 ...], do: '', to: '' },
//         { h: [12.5 ...], do: '', to: '' },
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
    aniPaths: [],
    staticPaths: [],
    // axis: {},
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

        case SET_RESIZE_PATHS:
            const res = [];
            state.aniPaths.forEach((el) => { res.push(MyGraph.resizePaths(el)) });
            // console.log('res', res);
            return {
                ...state,
                aniPaths: [...res],
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