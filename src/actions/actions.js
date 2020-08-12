import * as types from '../constants/actionTypes';

export const addData = (data) => ({
    type: types.ADD_DATA,
    payload: data,
})
export const updateData = (data) => ({
    type: types.UPDATE_DATA,
    payload: data,
})