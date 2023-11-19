import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getEstimationData = createAsyncThunk("getEstimationData", async (token) => {
    try {
        const response = await api.get("/estimation", {
            headers: {
                Authorization: `token ${token}`,
            },
        })
        console.log("response.data",response.data);
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createEstimationData = createAsyncThunk("createEstimationData", async (payload) => {
    try {
        const response = await api.post("/estimation", payload.fData, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `token ${payload.token}`,

            }
        })
        return response.data
    } catch (error) {
        return error.msg
    }
})

export const deleteEstimationData = createAsyncThunk("deleteEstimationData", async (payload) => {
    try {
        const response = await api.delete(`/delete_estimation/${payload.id}`,
            {
                headers: {
                    Authorization: `token ${payload.token}`,

                }
            }
        )
        return response.data
    } catch (error) {
        throw error.msg;
    }
})

export const updateEstimationData = createAsyncThunk("updateEstimationData", async (payload) => {

    try {
        const response = await api.put(`/estimation/${payload.id}`, payload.fData, {
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

export const getupdateEstimationData = createAsyncThunk("getupdateEstimationData", async (payload) => {
    try {
        const response = await api.get(`/estimation/${payload.id}`,
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

export const createEstimationResourceData = createAsyncThunk("createEstimationResourceData", async (payload) => {
    try {
        const response = await api.post("/estimation_resource_details", payload.fData, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `token ${payload.token}`,

            }
        })
        return response.data
    } catch (error) {
        return error.msg
    }
})
const EstimationSlice = createSlice({
    name: "Estimation",
    initialState: {
        status: {
            get: null,
            create: null,
            update: null,
            updating: null,
            delete: null
        },
        EstimationData: null,
        error: null,
        updateEstimationData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getEstimationData.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getEstimationData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.EstimationData = action.payload

        })
        builder.addCase(getEstimationData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(deleteEstimationData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(deleteEstimationData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(deleteEstimationData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(createEstimationData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(createEstimationData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(createEstimationData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(updateEstimationData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(updateEstimationData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(updateEstimationData.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(getupdateEstimationData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(getupdateEstimationData.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.updateEstimationData = action.payload

        })
        builder.addCase(getupdateEstimationData.rejected, (state) => {
            state.status = "failed"
        })


        builder.addCase(createEstimationResourceData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(createEstimationResourceData.fulfilled, (state) => {
            state.status = "succeeded"

        })
        builder.addCase(createEstimationResourceData.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default EstimationSlice.reducer;