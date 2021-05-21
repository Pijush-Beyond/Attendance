import { createSlice } from "@reduxjs/toolkit";


const profileChanegedSlice = createSlice({
  name: 'profileChanged',
  initialState: false,
  reducers: {
    setchanged: () => true,
    setunchanged: () => false,
  }
})

export const { setchanged, setunchanged } = profileChanegedSlice.actions;
export default profileChanegedSlice.reducer;