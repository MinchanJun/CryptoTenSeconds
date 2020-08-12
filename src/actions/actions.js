import * as types from '../constants/actionTypes';

export const addData = (data) => ({
    type: types.ADD_DATA,
    payload: data,
})