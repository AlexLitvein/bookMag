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

export const setAniPath = (path) => {// path as AniPath // if idx = -1 add new
    return {
        type: SET_ANI_PATH,
        path,
    }
};

export const setPath = (idx, path) => {// path as Path // if idx = -1 add new
    return {
        type: SET_PATH,
        idx,
        path,
    }
};

export const getSensData = (date, count, func) => {
    console.log('act getSensData');
    return {
        type: GET_SENS_DATA,
        date: date,
        count: count,
        func: func,
    }
};

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
                aniPaths: [...state.aniPaths, action.path],
            };



        case SET_PATH:
            state.staticPaths.push();
            return {
                ...state,
                staticPaths: [...state.staticPaths, action.path],
            };

        default:
            return state;
    }
}