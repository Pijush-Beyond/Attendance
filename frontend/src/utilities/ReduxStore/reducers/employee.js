import { createSlice } from "@reduxjs/toolkit";

const companyReducer = createSlice({
  name: 'company',
  initialState: null,
  reducers: {
    selectemployee: (state, action) => action.payload,
    deselectemployee: (state, action) => null,
  }
})


export const { selectemployee, deselectemployee } = companyReducer.actions;

export default companyReducer.reducer;