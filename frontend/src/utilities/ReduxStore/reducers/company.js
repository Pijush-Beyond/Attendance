import { createSlice } from "@reduxjs/toolkit";


const timeSlot = ['mroring', 'regular', 'afternoon'];

const companyReducer = createSlice({
  name: 'company',
  initialState: {},
  reducers: {
    setcompany: (state, action) => ({ ...action.payload, timeSlot}),
    addemployee: (state, action) => state.users.push(action.payload),
    removeemployee: (state, action) => state.splice(action.index,1)
  }
})


export const { setcompany, addemployee, removeemployee } = companyReducer.actions;

export default companyReducer.reducer;