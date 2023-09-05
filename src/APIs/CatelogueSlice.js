import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getCatelogueData = createAsyncThunk("getCatelogueData", async (token) => {
    try {
        const response = await api.get("/catalogue", {
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


export const createCatelogueData = createAsyncThunk("createCatelogueData", async (payload) => {
    try {
        const response = await api.post("/catalogue", payload.fData, {
            headers: {
                'content-type': 'multipart/form-data',
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

export const deleteCatelogueData = createAsyncThunk("deleteCatelogueData", async (id, token) => {
    try {
        const response = await api.delete(`/delete_catalogue/${id}`,
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

export const updateCatelogueData = createAsyncThunk("updateCatelogueData", async (payload) => {

    try {
        const response = await api.put(`/catalogue/${payload.id}`, payload.fData, {
            headers: {
                "Content-Type": "multipart/form-data",
                // Authorization: `token ${payload.token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
                // Authorization: `arti`
            },
        });
        console.log("response.data catelogue", response);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getupdateCatelogueData = createAsyncThunk("getupdateCatelogueData", async (payload) => {
    try {
        const response = await api.get(`/catalogue/${payload.id}`,
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
const CatelogueSlice = createSlice({
    name: "Catelogue",
    initialState: {
        status: {
            get: null,
            create: null,
            update: null,
            updating: null,
            delete: null
        },
        CatelogueData: null,
        error: null,
        updateCatelogueData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCatelogueData.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getCatelogueData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.CatelogueData = action.payload

        })
        builder.addCase(getCatelogueData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(deleteCatelogueData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(deleteCatelogueData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(deleteCatelogueData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(createCatelogueData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(createCatelogueData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(createCatelogueData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(updateCatelogueData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(updateCatelogueData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(updateCatelogueData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(getupdateCatelogueData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(getupdateCatelogueData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.updateCatelogueData = action.payload
            console.log("catelogue action", action.payload);

        })
        builder.addCase(getupdateCatelogueData.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default CatelogueSlice.reducer;