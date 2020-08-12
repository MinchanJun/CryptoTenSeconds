import * as types from '../constants/actionTypes';
console.log('I am in reducer')
const initialState = {
    coinData: []
};

const coinReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_DATA: 
            const newData = state.coinData.slice()
            newData.push(action.payload)
            return {
                ...state,
                coinData: newData
            }
        case types.UPDATE_DATA: 
            const newDatas = state.coinData.map((dataObj) => {
                if(dataObj.name === action.payload.name) {
                    dataObj.price = action.payload.price
                }
                return dataObj;
            });
            return {
                ...state,
                coinData: newDatas
            }
        default: 
            return state;
    }
};

export default coinReducer;