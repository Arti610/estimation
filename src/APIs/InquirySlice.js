import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getInquiryData = createAsyncThunk("getInquiryData", async (token) => {
    try {
        const response = await api.get("/inquiry", {
            headers: {
                // Authorization: `token ${token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,

            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createInquiryData = createAsyncThunk("createInquiryData", async (payload) => {
    try {
        const response = await api.post("/inquiry", payload.fData, {
            headers: {
                'content-type': 'multipart/form-data',
                // Authorization: `token ${payload.token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,

            }
        })
        return response.data
    } catch (error) {
        return error.msg
    }
})

export const deleteInquiryData = createAsyncThunk("deleteInquiryData", async (id, token) => {
    try {
        const response = await api.delete(`/delete_inquiry/${id}`,
            {
                headers: {
                    // Authorization: `token ${token}`,
                    Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,

                }
            }
        )
        return response.data
    } catch (error) {
        throw error;
    }
})

export const updateInquiryData = createAsyncThunk("updateInquiryData", async (payload) => {

    try {
        const response = await api.put(`/inquiry/${payload.id}`, payload.fData, {
            headers: {
                "Content-Type": "application/json",
                // Authorization: `token ${payload.token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,

            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getupdateInquiryData = createAsyncThunk("getupdateInquiryData", async (payload) => {
    try {
        const response = await api.get(`/inquiry/${payload.id}`,
            {
                headers: {
                    // Authorization: `token ${payload.token}`,
                    Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,

                },
            })

        return response.data
    } catch (error) {
        console.log(error)
    }
})
const InquirySlice = createSlice({
    name: "Inquiry",
    initialState: {
        status: {
            get: null,
            create: null,
            update: null,
            updating: null,
            delete: null
        },
        InquiryData: null,
        error: null,
        updateInquiryData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getInquiryData.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getInquiryData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.InquiryData = action.payload

        })
        builder.addCase(getInquiryData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(deleteInquiryData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(deleteInquiryData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(deleteInquiryData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(createInquiryData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(createInquiryData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(createInquiryData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(updateInquiryData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(updateInquiryData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(updateInquiryData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(getupdateInquiryData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(getupdateInquiryData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.updateInquiryData = action.payload

        })
        builder.addCase(getupdateInquiryData.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default InquirySlice.reducer;