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

export const deleteInquiryData = createAsyncThunk("deleteInquiryData", async (payload) => {
    try {
        const response = await api.delete(`/delete_inquiry/${payload.id}`, {
            headers: {
                // Authorization: `token ${payload.token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});


export const updateInquiryData = createAsyncThunk("updateInquiryData", async (payload) => {

    try {
        const response = await api.put(`/inquiry/${payload.id}`, payload.fData, {
            headers: {
                "Content-Type": "multipart/form-data",
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
export const updateInquiryDetails = createAsyncThunk("updateInquiryDetails", async (payload) => {

    try {
        const response = await api.put(`/inquiry_details_update/${payload.id}`, payload.details, {
            headers: {
                "Content-Type": "multipart/form-data",
                // Authorization: `token ${payload.token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,

            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteInquiryDetailsData = createAsyncThunk("deleteInquiryDetailsData", async (payload) => {
    try {
        const response = await api.delete(`/inquiry_details_delete/${payload.id}`, {
            headers: {
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
            },
        });

        // Assuming your API returns some data, you can include it in the response object
        return { status: 'succeeded', data: response.data };
    } catch (error) {
        throw error;
    }
});

const InquirySlice = createSlice({
    name: "Inquiry",
    initialState: {
        status: {
            get: null,
            create: null,
            update: null,
            updating: null,
            delete: null,
            deleteDetails: null,
            updateDetails: null
             // Add a status for deleting details
        },
        InquiryData: null,
        error: null,
        updateInquiryData: null
    },
    reducers: {

       
    },
    extraReducers: (builder) => {
        builder.addCase(getInquiryData.pending, (state) => {
            state.status.get = "loading"
        })
        builder.addCase(getInquiryData.fulfilled, (state, action) => {
            state.status.get = "succeeded"
            state.InquiryData = action.payload

        })
        builder.addCase(getInquiryData.rejected, (state) => {
            state.status.get = "failed"
        })
        builder.addCase(deleteInquiryData.pending, (state) => {
            state.status.delete = 'loading'; // Use 'loading' here
        })

        builder.addCase(deleteInquiryData.fulfilled, (state) => {
            state.status.delete = 'succeeded';
        })

        builder.addCase(deleteInquiryData.rejected, (state) => {
            state.status.delete = 'failed';
        })

        builder.addCase(createInquiryData.pending, (state) => {
            state.status.create = "loading"
        })

        builder.addCase(createInquiryData.fulfilled, (state) => {
            state.status.create = "succeeded"

        })
        builder.addCase(createInquiryData.rejected, (state) => {
            state.status.create = "failed"
        })
        builder.addCase(updateInquiryData.pending, (state) => {
            state.status.update = "loading"
        })

        builder.addCase(updateInquiryData.fulfilled, (state) => {
            state.status.update = "succeeded"

        })
        builder.addCase(updateInquiryData.rejected, (state) => {
            state.status.update = "failed"
        })
       
        builder.addCase(getupdateInquiryData.pending, (state) => {
            state.status.updating = "loading"
        })

        builder.addCase(getupdateInquiryData.fulfilled, (state, action) => {
            state.status.updating = "succeeded"
            state.updateInquiryData = action.payload

        })
        builder.addCase(getupdateInquiryData.rejected, (state) => {
            state.status.updating = 'failed';
        })
        builder.addCase(deleteInquiryDetailsData.pending, (state) => {
            state.status.deleteDetails = 'loading';
        })

        builder.addCase(deleteInquiryDetailsData.fulfilled, (state, action) => {
            state.status.deleteDetails = 'succeeded';
            // You can also update your state with data from the action if needed
            // state.someData = action.payload.data;
        })

        builder.addCase(deleteInquiryDetailsData.rejected, (state) => {
            state.status.deleteDetails = 'failed';
        })
        builder.addCase(updateInquiryDetails.pending, (state) => {
            state.status.updateDetails = "loading"
        })

        builder.addCase(updateInquiryDetails.fulfilled, (state) => {
            state.status.updateDetails = "succeeded"

        })
        builder.addCase(updateInquiryDetails.rejected, (state) => {
            state.status.updateDetails = "failed"
        })
    }
})

export const {
    deleteInquiryDetailsDataSuccess,
    deleteInquiryDetailsDataFailed,
} = InquirySlice.actions;

export default InquirySlice.reducer;