import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getTaxData = createAsyncThunk("getTaxData", async (token) => {
    try {
        const response = await api.get("/tax", {
            headers: {
                Authorization: `token ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createTaxData = createAsyncThunk("createTaxData", async (payload) => {
    try {
        const response = await api.post("/tax", payload.modalData, {
            headers: {
                "Content-Type": "multipart/form-data, application/json",
                Authorization: `token ${payload.token}`                
            }
        })
        return response.data
    } catch (error) {
        return error.msg
    }
})

export const deleteTaxData = createAsyncThunk("deleteTaxData", async ({id, token}) => {
    try {
        const response = await api.delete(`/delete_tax/${id}`,
            {
                headers: {
                    Authorization: `token ${token}`                  
                }
            }
        )
        return response.data
    } catch (error) {
        throw error;
    }
})

export const updateTaxData = createAsyncThunk("updateTaxData", async (payload) => {

    try {
        const response = await api.put(`/tax/${payload.id}`, payload.updatedData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${payload.token}`,                
            },
        });
      
        return response.data;
    } catch (error) {
               throw error;
    }
});
export const getupdateTaxData = createAsyncThunk("getupdateTaxData", async (payload) => {
    try {
        const response = await api.get(`/tax/${payload.id}`,
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
const TaxSlice = createSlice({
    name: "Tax",
    initialState: {
        status: {
            get : null,
            create : null,
            update : null,
            updating : null,
            delete: null
        },
        TaxData: null,
        error: null,
        updateTaxData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTaxData.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getTaxData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.TaxData = action.payload   
         
        })
        builder.addCase(getTaxData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(deleteTaxData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(deleteTaxData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(deleteTaxData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(createTaxData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(createTaxData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(createTaxData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(updateTaxData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(updateTaxData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(updateTaxData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(getupdateTaxData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(getupdateTaxData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.updateTaxData = action.payload

        })
        builder.addCase(getupdateTaxData.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default TaxSlice.reducer;