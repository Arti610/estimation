import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getTaxAgencyData = createAsyncThunk("getTaxAgencyData", async (token) => {
    try {
        const response = await api.get("/tax_agency", {
            headers: {
                Authorization: `token ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createTaxAgencyData = createAsyncThunk("createTaxAgencyData", async (payload) => {
    try {
        const response = await api.post("/tax_agency", payload.modalData, {
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

export const deleteTaxAgencyData = createAsyncThunk("deleteTaxAgencyData", async ({ id, token }) => {
    try {
        const response = await api.delete(`/delete_taxagency/${id}`,
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

export const updateTaxAgencyData = createAsyncThunk("updateTaxAgencyData", async (payload) => {

    try {
        const response = await api.put(`/tax_agency/${payload.id}`, payload.updatedData, {
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
export const getupdateTaxAgencyData = createAsyncThunk("getupdateTaxAgencyData", async (payload) => {
    try {
        const response = await api.get(`/tax_agency/${payload.id}`,
            {
                headers: {
                    Authorization: `token ${payload.token}`
                },
            })
        return response.data


    } catch (error) {
        console.log(error)
    }
})
const TaxAgencyAgency = createSlice({
    name: "TaxAgency",
    initialState: {
        status: {
            get: null,
            create: null,
            update: null,
            updating: null,
            delete: null
        },
        TaxAgencyData: null,
        error: null,
        updateTaxAgencyData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTaxAgencyData.pending, (state) => {
            state.status.get = "loading"
        })
        builder.addCase(getTaxAgencyData.fulfilled, (state, action) => {
            state.status.get = "succeeded"
            state.TaxAgencyData = action.payload
        })
        builder.addCase(getTaxAgencyData.rejected, (state) => {
            state.status.get = "failed"
        })
        builder.addCase(deleteTaxAgencyData.pending, (state) => {
            state.status.delete = "loading"
        })

        builder.addCase(deleteTaxAgencyData.fulfilled, (state) => {
            state.status.delete = "succeeded"

        })
        builder.addCase(deleteTaxAgencyData.rejected, (state) => {
            state.status.delete = "failed"
        })
        builder.addCase(createTaxAgencyData.pending, (state) => {
            state.status.create = "loading"
        })

        builder.addCase(createTaxAgencyData.fulfilled, (state) => {
            state.status.create = "succeeded"

        })
        builder.addCase(createTaxAgencyData.rejected, (state) => {
            state.status.create = "failed"
        })
        builder.addCase(updateTaxAgencyData.pending, (state) => {
            state.status.update = "loading"
        })

        builder.addCase(updateTaxAgencyData.fulfilled, (state) => {
            state.status.update = "succeeded"

        })
        builder.addCase(updateTaxAgencyData.rejected, (state) => {
            state.status.update = "failed"
        })
        builder.addCase(getupdateTaxAgencyData.pending, (state) => {
            state.status.updating = "loading"
        })

        builder.addCase(getupdateTaxAgencyData.fulfilled, (state, action) => {
            state.status.updating = "succeeded"
            state.updateTaxAgencyData = action.payload

        })
        builder.addCase(getupdateTaxAgencyData.rejected, (state) => {
            state.status.updating = "failed"
        })
    }
})

export default TaxAgencyAgency.reducer;