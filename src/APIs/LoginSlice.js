import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";

export const userLogin = createAsyncThunk("userLogin", async (userCredential) => {
  const request = await api.post("user/login", userCredential);
  const response = request.data.data;
  const token = request.data.token;

  // Set the token in local storage
  // localStorage.setItem('Login', response);
  localStorage.setItem('Token', token);

  return response; // You might want to return some data here if needed
});

export const userLogout = createAsyncThunk("userLogout", async (token, { rejectWithValue }) => {
  try {
    const response = await api.post(
      `user/logout`,
      { key: token },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );

    // Check if the response status is 200 or a success status code.
    if (response.status === 200) {
      // Successful logout, you can perform additional actions if needed.
      localStorage.removeItem('Token');
  
      return response.data; // This will be the data returned by the API on successful logout.
    } else {
      // Handle the case where the logout was not successful.

      return rejectWithValue(response.data);
    }
  } catch (error) {
    // Handle any other errors that occurred during the API call.
 
    return rejectWithValue(error.response.data);
  }
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
      console.log("action.payload", action.payload);
      // state.token = action.payload.token
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
      state.login = null;
      state.error = "error";
    });


    builder.addCase(userLogout.fulfilled, (state) => {
      state.token = null;
    });
  },
});

export default loginSlice.reducer;
