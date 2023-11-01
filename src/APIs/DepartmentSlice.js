import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getDepartmentData = createAsyncThunk("getDepartmentData", async (token) => {
    try {
        const response = await api.get("/department", {
            headers: {
                Authorization: `token ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createDepartmentData = createAsyncThunk("createDepartmentData", async (payload) => {
    console.log("payload", payload);
    try {
        const response = await api.post("/department", payload.modalData, {
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

export const deleteDepartmentData = createAsyncThunk("deleteDepartmentData", async (payload) => {
    try {
        const response = await api.delete(`/delete_department/${payload.id}`,
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

export const updateDepartmentData = createAsyncThunk("updateDepartmentData", async (payload) => {

    try {
        const response = await api.put(`/department/${payload.id}`, payload.updatedData, {
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
export const getupdateDepartmentData = createAsyncThunk("getupdateDepartmentData", async (payload) => {
    try {
        const response = await api.get(`/department/${payload.id}`,
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
const DepartmentSlice = createSlice({
    name: "Department",
    initialState: {
        status: {
            get : null,
            create : null,
            update : null,
            updating : null,
            delete: null
        },
        DepartmentData: null,
        error: null,
        updateDepartmentData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getDepartmentData.pending, (state) => {
            state.status.get = "loading"
        })
        builder.addCase(getDepartmentData.fulfilled, (state, action) => {
            state.status.get = "succeeded"
            state.DepartmentData = action.payload   
            
        })
        builder.addCase(getDepartmentData.rejected, (state) => {
            state.status.get = "failed"
        })
        builder.addCase(deleteDepartmentData.pending, (state) => {
            state.status.delete = "loading"
        })

        builder.addCase(deleteDepartmentData.fulfilled, (state) => {
            state.status.delete = "succeeded"

        })
        builder.addCase(deleteDepartmentData.rejected, (state) => {
            state.status.delete = "failed"
        })
        builder.addCase(createDepartmentData.pending, (state) => {
            state.status.create = "loading"
        })

        builder.addCase(createDepartmentData.fulfilled, (state) => {
            state.status.create = "succeeded"

        })
        builder.addCase(createDepartmentData.rejected, (state) => {
            state.status.create = "failed"
        })
        builder.addCase(updateDepartmentData.pending, (state) => {
            state.status.update = "loading"
        })

        builder.addCase(updateDepartmentData.fulfilled, (state) => {
            state.status.update = "succeeded"

        })
        builder.addCase(updateDepartmentData.rejected, (state) => {
            state.status.update = "failed"
        })
        builder.addCase(getupdateDepartmentData.pending, (state) => {
            state.status.updating = "loading"
        })

        builder.addCase(getupdateDepartmentData.fulfilled, (state, action) => {
            state.status.updating = "succeeded"
            state.updateDepartmentData = action.payload

        })
        builder.addCase(getupdateDepartmentData.rejected, (state) => {
            state.status.updating = "failed"
        })
    }
})

export default DepartmentSlice.reducer;