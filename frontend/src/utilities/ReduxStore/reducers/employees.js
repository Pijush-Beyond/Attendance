import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urls } from "../../../config.json";
import { loading, notloading } from "./loading";


const companyReducer = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {
    setemployees: (state, action) => action.payload,
    addemployee: (state, action) => {
      console.log('kssk');
      state.push(action.payload)},
    removeemployee: (state, action) => state.splice(action.index, 1)
  }
})


export const remove_employee = (emplyoee, index) => (dispatch, getState) => {
  dispatch(loading());
  axios.put(urls.addemployee, { employee: emplyoee.Id, company: getState().company._id }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(data => {
      dispatch(removeemployee(index));
      dispatch(notloading());
    })
    .catch(err => {
      if (err.response && err.response.data.status !== 400) alert('Something wnet wrong!!');
      dispatch(notloading());
    })
}


export const { setemployees, addemployee, removeemployee } = companyReducer.actions;

export default companyReducer.reducer;