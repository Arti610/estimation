import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getEmployerData = createAsyncThunk("getEmployerData", async (token) => {
    try {
        const response = await api.get("/employer", {
            headers: {
                Authorization: `token ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createEmployerData = createAsyncThunk("createEmployerData", async (payload) => {
    try {
        const response = await api.post("/employer", payload.modalData, {
            headers: {
                "Content-Type": "multipart/form-data, application/json",
                Authorization: `token ${payload.token}`,
            }
        })
        return response.data
    } catch (error) {
        return error.msg
    }
})

export const deleteEmployerData = createAsyncThunk("deleteEmployerData", async (payload) => {
    try {
        const response = await api.delete(`/delete_employer/${payload.id}`,
            {
                headers: {
                    Authorization: `token ${payload.token}`,
                }
            }
        )
        return response.data
    } catch (error) {
        throw error;
    }
})

export const updateEmployerData = createAsyncThunk("updateEmployerData", async (payload) => {

    try {
        const response = await api.put(`/employer/${payload.id}`, payload.updatedData, {
            headers: {
                "Content-Type": "multipart/form-data, application/json",
                Authorization: `token ${payload.token}`,
        
            },
        });
        return response.data;
    } catch (error) {
               throw error;
    }
});
export const getupdateEmployerData = createAsyncThunk("getupdateEmployerData", async (payload) => {
    try {
        const response = await api.get(`/employer/${payload.id}`,
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
const EmployerSlice = createSlice({
    name: "Employer",
    initialState: {
        status: {
            get : null,
            create : null,
            update : null, 
            updating : null,
            delete: null
        },
        EmployerData: null,
        error: null,
        updateEmployerData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getEmployerData.pending, (state) => {
            state.status.get = "loading"
        })
        builder.addCase(getEmployerData.fulfilled, (state, action) => {
            state.status.get = "succeeded"
            state.EmployerData = action.payload   
           
        })
        builder.addCase(getEmployerData.rejected, (state) => {
            state.status.get = "failed"
        })
        builder.addCase(deleteEmployerData.pending, (state) => {
            state.status.delete = "loading"
        })

        builder.addCase(deleteEmployerData.fulfilled, (state) => {
            state.status.delete = "succeeded"

        })
        builder.addCase(deleteEmployerData.rejected, (state) => {
            state.status.delete = "failed"
        })
        builder.addCase(createEmployerData.pending, (state) => {
            state.status.create = "loading"
        })

        builder.addCase(createEmployerData.fulfilled, (state) => {
            state.status.create = "succeeded"

        })
        builder.addCase(createEmployerData.rejected, (state) => {
            state.status.create = "failed"
        })
        builder.addCase(updateEmployerData.pending, (state) => {
            state.status.update = "loading"
        })

        builder.addCase(updateEmployerData.fulfilled, (state) => {
            state.status.update = "succeeded"

        })
        builder.addCase(updateEmployerData.rejected, (state) => {
            state.status.update = "failed"
        })
        builder.addCase(getupdateEmployerData.pending, (state) => {
            state.status.updating = "loading"
        })

        builder.addCase(getupdateEmployerData.fulfilled, (state, action) => {
            state.status.updating = "succeeded"
            state.updateEmployerData = action.payload

        })
        builder.addCase(getupdateEmployerData.rejected, (state) => {
            state.status.updating = "failed"
        })
    }
})

export default EmployerSlice.reducer;