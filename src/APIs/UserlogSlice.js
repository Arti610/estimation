import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";

export const getUserLog = createAsyncThunk("getUserLog", async (token)=>{
    try {
        const response = await api.get("/userlog",{
            headers: {
                Authorization: `token ${token}`,
            },
        })
        console.log("response", response);
        return {data : response.data, status : response.status, statusText: response.statusText}
    } catch (error) {
      throw error
    }
})

const UserlogSlice = createSlice({
    name: 'Userlog',
    initialState:{
        status: {
            get: null,
        },
        UserlogData: null,
        error: null,
       
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUserLog.pending, (state) => {
            state.status.get = "loading"
        })
        builder.addCase(getUserLog.fulfilled, (state,action) => {
            state.status.get = "succeeded"
            state.UserlogData = action.payload
        })
        builder.addCase(getUserLog.rejected, (state) => {
            state.status.get = "failed"
        })
}})

export default UserlogSlice.reducer;