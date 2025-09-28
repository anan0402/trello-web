import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  themeMode: 'light',
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    changeThemeMode: (state, action) => {
      state.themeMode = action.payload
    },
  },
})


export const { changeThemeMode } = headerSlice.actions
export default headerSlice.reducer
