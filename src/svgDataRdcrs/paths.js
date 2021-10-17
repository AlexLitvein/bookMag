export const GET_SENS_DATA = 'GET_SENS_DATA';
export const SET_ANI_PATH = 'SET_ANI_PATH';
export const SET_PATH = 'SET_PATH';

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

export const setAniPath = (idx, path) => {// path as AniPath // if idx = -1 add new
    return {
        type: SET_ANI_PATH,
        idx,
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

export const getSensData = (date, count) => {
    console.log('act getSensData');
    return {
        type: GET_SENS_DATA,
        date: date,
        count: count,
    }
};

const initialState = {
    aniPaths: [], // AniPath
    staticPaths: [], // Path
};

export const selAniPaths = (state) => state.paths.aniPaths;
export const selStaticPaths = (state) => state.paths.staticPaths;

export function pathRdcr(state = initialState, action) {
    console.log('pathRdcr',action);

    switch (action.type) {
        case SET_ANI_PATH: 
            console.log('action.SET_ANI_PATH:', state.aniPaths);

            if (action.idx === -1) {
                state.aniPaths.push();
            } else {
                state.aniPaths[action.idx] = action.path;
            }           

            return {
                ...state,
                aniPaths: [...state.aniPaths, action.path],
            };
        
            

        case SET_PATH:
            if (action.idx === -1) {
                state.staticPaths.push();
            } else {
                state.staticPaths[action.idx] = action.path;
            }
            return {
                ...state,
                staticPaths: [...state.staticPaths, action.path],
            };

        default:
            return state;
    }
}