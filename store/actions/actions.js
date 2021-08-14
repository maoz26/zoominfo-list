import * as types from '../types';

export const getDataFromDb = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/contacts').then((r) => {
      dispatch({type: types.SET_LIST_DATA, payload: r.data})
    })
  }
}