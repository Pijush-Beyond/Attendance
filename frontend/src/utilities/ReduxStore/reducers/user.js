import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {urls} from "../../../config.json";
import { setcompany } from "./company";
import { setemployees } from "./employees";

const reducer =  createSlice({
  name: 'user',
  initialState: {fetched: false,a: new Date().toLocaleDateString()},
  reducers: {
    setuser: (state, action) => ({ ...state, data: action.payload, fetched: true}),
    setprofile: (state, action) => { state.data.profile = action.payload},
    logout: (state) => ({ fetched: true }),
    just: () => ({ fetched: true }),
    accepetSlot: (state, action) => {
      const date = new Date(action.payload);
      state.data.profile.timeLine[date.getFullYear()][date.getMonth()][date.getDate()].status = true;
      // return { fetched: false, data: { ...state, profile: { ...state.data.profile, timeLine: state.data.profile.timeLine[date.getFullYear()][date.getMonth()][date.getDate()].status = true } } };
      // state.a = new Date().toLocaleDateString();
      // return {}
    },
    denieSlot: (state, action) => {
      const date = new Date(action.payload);
      delete state.data.profile.timeLine[date.getFullYear()][date.getMonth()][date.getDate()];
      state.data.fetched = true;
    }
    // setunchanged: (state) => {state.changed=false},
  },
})

export const autologin = () => dispatch =>{
  axios.get(urls.autologin, { withCredentials: true })
    .then(data => {
      if (data.data.data.superUser) {
        dispatch(setemployees(data.data.data.company.employees));
        delete data.data.data.company.employees;
      }
      dispatch(setcompany(data.data.data.company));
      delete data.data.data.company;
      dispatch(setuser(data.data.data));
    })
    .catch(e => {
      if (e.reponse && e.reponse.status !== 400) alert("Something went wrong!!");
      dispatch(logout(true));
    })
}
export const { setuser, logout, setprofile, setunchanged, denieSlot, accepetSlot} =  reducer.actions;
export default reducer.reducer;
