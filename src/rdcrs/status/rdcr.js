import * as actions from "./act"

export const STATUS = {
    EMPTY: 0,
    LOADING: 1,
    LOADED: 2,
    ERROR: 3,
};

const initialState = {
    status: STATUS.EMPTY,
    error: null,
};

export default function statusRdcr(state = initialState, action) {
    switch (action.type) {
        case actions.SET_EMPTY_STATUS:
            return {
                ...state,
                status: STATUS.EMPTY,
            };

        case actions.SET_LOADING_STATUS:
            return {
                ...state,
                status: STATUS.LOADING,
            };

        case actions.SET_LOADED_STATUS:
            return {
                ...state,
                status: STATUS.LOADED,
            };

        case actions.SET_ERROR_STATUS:
            return {
                ...state,
                status: STATUS.ERROR,
                error: actions.payload
            };

        default:
            return state;
    }
}
