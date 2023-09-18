import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getCustomerData = createAsyncThunk("getCustomerData", async (token) => {
    try {
        const response = await api.get("/customers", {
            headers: {
                Authorization: `token ${token}`,              
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createCustomerData = createAsyncThunk("createCustomerData", async (payload) => {
    try {
        const response = await api.post("/customers", payload.modalData, {
            headers: {
                "Content-Type": "multipart/form-data, application/json",
                // Authorization: `token ${payload.token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
                
            }
        })
        return response.data
    } catch (error) {
        return error.msg
    }
})

export const deleteCustomerData = createAsyncThunk("deleteCustomerData", async (id, token) => {
    try {
        const response = await api.delete(`/delete_customers/${id}`,
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

export const updateCustomerData = createAsyncThunk("updateCustomerData", async (payload) => {

    try {
        const response = await api.put(`/customers/${payload.id}`, payload.updatedData, {
            headers: {
                "Content-Type": "multipart/form-data, application/json",
                // Authorization: `token ${payload.token}`,
                Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
                
            },
        });
        return response.data;
    } catch (error) {
               throw error;
    }
});
export const getupdateCustomerData = createAsyncThunk("getupdateCustomerData", async (payload) => {
    try {
        const response = await api.get(`/customers/${payload.id}`,
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
const CustomerSlice = createSlice({
    name: "Customer",
    initialState: {
        status: {
            get : null,
            create : null,
            update : null,
            updating : null,
            delete: null
        },
        CustomerData: null,
        error: null,
        updateCustomerData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCustomerData.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getCustomerData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.CustomerData = action.payload   
              
        })
        builder.addCase(getCustomerData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(deleteCustomerData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(deleteCustomerData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(deleteCustomerData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(createCustomerData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(createCustomerData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(createCustomerData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(updateCustomerData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(updateCustomerData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(updateCustomerData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(getupdateCustomerData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(getupdateCustomerData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.updateCustomerData = action.payload

        })
        builder.addCase(getupdateCustomerData.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default CustomerSlice.reducer;