import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";

// Async Thunks for API calls
export const getCustomerData = createAsyncThunk("getCustomerData", async (token) => {
    try {
        const response = await api.get("/customers", {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const createCustomerData = createAsyncThunk("createCustomerData", async (payload) => {
    try {
        const response = await api.post("/customers", payload.modalData, {
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

export const deleteCustomerData = createAsyncThunk("deleteCustomerData", async (payload) => {
    try {
        const response = await api.delete(`/delete_customers/${payload.id}`, {
            headers: {
                Authorization: `token ${payload.token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateCustomerData = createAsyncThunk("updateCustomerData", async (payload) => {
    try {
        const response = await api.put(`/customers/${payload.id}`, payload.updatedData, {
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

export const getupdateCustomerData = createAsyncThunk("getupdateCustomerData", async (payload) => {
    try {
        const response = await api.get(`/customers/${payload.id}`, {
            headers: {
                Authorization: `token ${payload.token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Create a customer slice
const CustomerSlice = createSlice({
    name: "Customer",
    initialState: {
        status: {
            get: null,
            create: null,
            update: null,
            updating: null,
            delete: null,
        },
        CustomerData: null,
        error: null,
        updateCustomerData: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handling pending, fulfilled, and rejected actions for each async thunk
        builder
            .addCase(getCustomerData.pending, (state) => {
                state.status.get = "loading";
            })
            .addCase(getCustomerData.fulfilled, (state, action) => {
                state.status.get = "succeeded";
                state.CustomerData = action.payload;
            })
            .addCase(getCustomerData.rejected, (state) => {
                state.status.get = "failed";
            })
            .addCase(deleteCustomerData.pending, (state) => {
                state.status.delete = "loading";
            })
            .addCase(deleteCustomerData.fulfilled, (state) => {
                state.status.delete = "succeeded";
            })
            .addCase(deleteCustomerData.rejected, (state) => {
                state.status.delete = "failed";
            })
            .addCase(createCustomerData.pending, (state) => {
                state.status.create = "loading";
            })
            .addCase(createCustomerData.fulfilled, (state) => {
                state.status.create = "succeeded";
            })
            .addCase(createCustomerData.rejected, (state) => {
                state.status.create = "failed";
            })
            .addCase(updateCustomerData.pending, (state) => {
                state.status.update = "loading";
            })
            .addCase(updateCustomerData.fulfilled, (state) => {
                state.status.update = "succeeded";
            })
            .addCase(updateCustomerData.rejected, (state) => {
                state.status.update = "failed";
            })
            .addCase(getupdateCustomerData.pending, (state) => {
                state.status.updating = "loading";
            })
            .addCase(getupdateCustomerData.fulfilled, (state, action) => {
                state.status.updating = "succeeded";
                state.updateCustomerData = action.payload;
            })
            .addCase(getupdateCustomerData.rejected, (state) => {
                state.status.updating = "failed";
            });
    },
});

export default CustomerSlice.reducer;
