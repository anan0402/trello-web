import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/auth.service";

const initialState = {
  currentUser: null,
}

export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async ({ email, password }) => {
  const response = await login({ email, password })
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  //Nới xử lý bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },

});


//Export actions
//export const {} = userSlice.actions

//Selectors
export const selectCurrentUser = (state) => state.user.currentUser;


export const userReducer = userSlice.reducer;