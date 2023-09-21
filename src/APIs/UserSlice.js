import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getUserData = createAsyncThunk("getUserData", async (token) => {
    try {
        const response = await api.get("/userlist", {
            headers: {
                Authorization: `token ${token}`,
           
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createUserData = createAsyncThunk("createUserData", async (payload) => {
    try {
        const response = await api.post("/createuser", payload.fData, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `token ${payload.token}`,
           
            }
        })
        return response.data
    } catch (error) {
        return error.msg
    }
})

export const deleteUserData = createAsyncThunk("deleteUserData", async ({id, token}) => {
    try {
        const response = await api.delete(`/user/delete/${id}`,
            {
                headers: {
                    Authorization: `token ${token}`,
                   
                }
            }
        )
        return response.data
    } catch (error) {
        throw error;
    }
})

export const updateUserData = createAsyncThunk("updateUserData", async (payload) => {

    try {
        const response = await api.put(`/updateuser/${payload.id}`, payload.fData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${payload.token}`,
             
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getupdateUserData = createAsyncThunk("getupdateUserData", async (payload) => {
    try {
        const response = await api.get(`/user/${payload.id}`,
            {
                headers: {
                    Authorization: `token ${payload.token}`,
                  
                },
            })
            
        return response.data


    } catch (error) {
        console.log(error)
    }
})
const UserSlice = createSlice({
    name: "User",
    initialState: {
        status: {
            get: null,
            create: null,
            update: null,
            updating: null,
            delete: null
        },
        UserData: null,
        error: null,
        updateUserData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.UserData = action.payload

        })
        builder.addCase(getUserData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(deleteUserData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(deleteUserData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(deleteUserData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(createUserData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(createUserData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(createUserData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(updateUserData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(updateUserData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(updateUserData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(getupdateUserData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(getupdateUserData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.updateUserData = action.payload

        })
        builder.addCase(getupdateUserData.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default UserSlice.reducer;