import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getSourceOfInquiryData = createAsyncThunk("getSourceOfInquiryData", async (token) => {
    try {
        const response = await api.get("/sourceofinquiry", {
            headers: {
                Authorization: `token ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createSourceOfInquiryData = createAsyncThunk("createSourceOfInquiryData", async (payload) => {
    try {
        const response = await api.post("/sourceofinquiry", payload.modalData, {
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

export const deleteSourceOfInquiryData = createAsyncThunk("deleteSourceOfInquiryData", async ({id, token}) => {
    try {
        const response = await api.delete(`/delete_soi/${id}`,
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

export const updateSourceOfInquiryData = createAsyncThunk("updateSourceOfInquiryData", async (payload) => {

    try {
        const response = await api.put(`/sourceofinquiry/${payload.id}`, payload.updatedData, {
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
export const getupdateSourceOfInquiryData = createAsyncThunk("getupdateSourceOfInquiryData", async (payload) => {
    try {
        const response = await api.get(`/sourceofinquiry/${payload.id}`,
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
const SourceOfInquirySlice = createSlice({
    name: "SourceOfInquiry",
    initialState: {
        status: {
            get: null,
            create: null,
            update: null,
            updating: null,
            delete: null
        },
        SourceOfInquiryData: null,
        error: null,
        updateSourceOfInquiryData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getSourceOfInquiryData.pending, (state) => {
            state.status.get = "loading"
        })
        builder.addCase(getSourceOfInquiryData.fulfilled, (state, action) => {
            state.status.get = "succeeded"
            state.SourceOfInquiryData = action.payload

        })
        builder.addCase(getSourceOfInquiryData.rejected, (state) => {
            state.status.get = "failed"
        })
        builder.addCase(deleteSourceOfInquiryData.pending, (state) => {
            state.status.delete = "loading"
        })

        builder.addCase(deleteSourceOfInquiryData.fulfilled, (state) => {
            state.status.delete = "succeeded"

        })
        builder.addCase(deleteSourceOfInquiryData.rejected, (state) => {
            state.status.delete = "failed"
        })
        builder.addCase(createSourceOfInquiryData.pending, (state) => {
            state.status.create = "loading"
        })

        builder.addCase(createSourceOfInquiryData.fulfilled, (state) => {
            state.status.create = "succeeded"

        })
        builder.addCase(createSourceOfInquiryData.rejected, (state) => {
            state.status.create = "failed"
        })
        builder.addCase(updateSourceOfInquiryData.pending, (state) => {
            state.status.update = "loading"
        })

        builder.addCase(updateSourceOfInquiryData.fulfilled, (state) => {
            state.status.update = "succeeded"

        })
        builder.addCase(updateSourceOfInquiryData.rejected, (state) => {
            state.status.update = "failed"
        })
        builder.addCase(getupdateSourceOfInquiryData.pending, (state) => {
            state.status.updating = "loading"
        })

        builder.addCase(getupdateSourceOfInquiryData.fulfilled, (state, action) => {
            state.status.updating = "succeeded"
            state.updateSourceOfInquiryData = action.payload

        })
        builder.addCase(getupdateSourceOfInquiryData.rejected, (state) => {
            state.status.updating = "failed"
        })
    }
})

export default SourceOfInquirySlice.reducer;