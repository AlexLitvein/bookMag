import * as actions from "./acts"

const initialState = {
    sensData: [
        // {
        //     d:'',
        //     to:''
        // },
    ],    
};

// const payload =
//     {
//         d:'1',
//         to:'2'
//     };

// const initialState =[
//     {
//         d:'',
//         to:''
//     },
// ];

export default function sensDataRdcr(state = initialState, action) {
    // export default function sensDataRdcr(state = [], action) {
        console.log('sensDataRdcr',action);

    switch (action.type) {
        case action.SET_SENS_DATA:
            return {
                ...state, //???
                sensData: [...state.sensData, action.payload],
            };

            // return [...state, action.payload];

        default:
            return state;
    }
}