import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getDepartmentData = createAsyncThunk("getDepartmentData", async (token) => {
    try {
        const response = await api.get("/department", {
            headers: {
                // Authorization: `token ${token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
                // Authorization: `arti`
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createDepartmentData = createAsyncThunk("createDepartmentData", async (payload) => {
    try {
        const response = await api.post("/department", payload.modalData, {
            headers: {
                "Content-Type": "multipart/form-data, application/json",
                // Authorization: `token ${payload.token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
                // Authorization: `arti`
            }
        })
        return response.data
    } catch (error) {
        return error.msg
    }
})

export const deleteDepartmentData = createAsyncThunk("deleteDepartmentData", async (id, token) => {
    try {
        const response = await api.delete(`/delete_department/${id}`,
            {
                headers: {
                    // Authorization: `token ${token}`,
                    Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
                    // Authorization: `arti`
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
                // Authorization: `token ${payload.token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
                // Authorization: `arti`
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
                    // Authorization: `token ${payload.token}`,
                    Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
                    // Authorization: `arti`
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
            state.status = "loading"
        })
        builder.addCase(getDepartmentData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.DepartmentData = action.payload   
            
        })
        builder.addCase(getDepartmentData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(deleteDepartmentData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(deleteDepartmentData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(deleteDepartmentData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(createDepartmentData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(createDepartmentData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(createDepartmentData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(updateDepartmentData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(updateDepartmentData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(updateDepartmentData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(getupdateDepartmentData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(getupdateDepartmentData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.updateDepartmentData = action.payload

        })
        builder.addCase(getupdateDepartmentData.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default DepartmentSlice.reducer;