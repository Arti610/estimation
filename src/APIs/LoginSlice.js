import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";

export const userLogin = createAsyncThunk("userLogin", async (userCredential) => {
  const request = await api.post("user/login", userCredential );
  const response = request.data.data;
  const token = request.data.token;
  console.log("login response", response);
  console.log("token response", token);
  console.log("status code", request.status);

  localStorage.setItem('Login', JSON.stringify(response));
  localStorage.setItem('Token', JSON.stringify(token));
});

const loginSlice = createSlice({
  name: "Login",
  initialState: {
    loading: null,
    login: null,
    error: null,
    token: null
  },
  reducers: {
    // Define other reducers here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.login = null;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.login = action.payload;
      state.token = action.payload.token
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
      state.login = null;
      state.error = "error";
    });
  },
});

export default loginSlice.reducer;
