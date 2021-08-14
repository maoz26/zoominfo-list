import * as types from '../types';
import {initialState} from '../initialState';

export function mainReducer(state = initialState, action) {
    switch (action.type) {
        case types.SUBMIT:
            return {
                ...state,
                loginSubmitted: action.payload
            }
        case types.SET_LIST_DATA:
            return {
                ...state,
                listData: action.payload
            }
        default:
            return state;
    }
}