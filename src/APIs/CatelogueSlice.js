import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Config/Apis";


export const getCatelogueData = createAsyncThunk("getCatelogueData", async (token) => {
    console.log("token cate", token);
    try {
        const response = await api.get("/catalogue", {
            headers: {
                Authorization: `token ${token}`,
            },
        })
        console.log("response cate", response.data);
        return response.data
    } catch (error) {
        throw error;
    }
})


export const createCatelogueData = createAsyncThunk("createCatelogueData", async ({ fData, token }) => {

    try {
        const response = await api.post("/catalogue", fData, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `token ${token}`,

            }
        })
        return response.data
    } catch (error) {
        return error.msg
    }
})

export const deleteCatelogueData = createAsyncThunk("deleteCatelogueData", async ({ id, token }) => {
    try {
        const response = await api.delete(`/delete_catalogue/${id}`,
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

export const updateCatelogueData = createAsyncThunk("updateCatelogueData", async (payload) => {

    try {
        const response = await api.put(`/catalogue/${payload.id}`, payload.fData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `token ${payload.token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
});
export const getupdateCatelogueData = createAsyncThunk("getupdateCatelogueData", async ({ id, token }) => {
    try {
        const response = await api.get(`/catalogue/${id}`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error
    }
});


// Delete Images
export const deleteCatelogueImages = createAsyncThunk("deleteCatelogueImages", async ({ token, id }) => {
    try {
        const response = await api.delete(`/delete_catelogue_image/${id}`,
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

// Delete Datasheets
export const deleteCatelogueDatasheets = createAsyncThunk("deleteCatelogueDatasheets", async ({ id, token }) => {
    try {
        const response = await api.delete(`/delete_catelogue_datasheet/${id}`,
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

// Delete Certificates
export const deleteCatelogueCertificates = createAsyncThunk("deleteCatelogueCertificates", async ({ id, token }) => {
    try {
        const response = await api.delete(`/delete_catelogue_certificate/${id}`,
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
const CatelogueSlice = createSlice({
    name: "Catelogue",
    initialState: {
        status: {
            get: null,
            create: null,
            update: null,
            updating: null,
            delete: null,
            imageDelete: null,
            datasheetDelete: null,
            certificateDelete: null,
        },
        CatelogueData: null,
        error: null,
        updateCatelogueData: null
    },
    reducers: {
        resetCatelogueData: (state) => {
            state.CatelogueData = null;
            // Reset other fields as needed
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCatelogueData.pending, (state) => {
            state.status.get = "loading"
        })
        builder.addCase(getCatelogueData.fulfilled, (state, action) => {
            state.status.get = "succeeded"
            state.CatelogueData = action.payload
            console.log("action.payload", action.payload);
        })
        builder.addCase(getCatelogueData.rejected, (state) => {
            state.status.get = "failed"
        })
        builder.addCase(deleteCatelogueData.pending, (state) => {
            state.status.delete = "loading"
        })

        builder.addCase(deleteCatelogueData.fulfilled, (state) => {
            state.status.delete = "succeeded"

        })
        builder.addCase(deleteCatelogueData.rejected, (state) => {
            state.status.delete = "failed"
        })
        builder.addCase(createCatelogueData.pending, (state) => {
            state.status.create = "loading"
        })

        builder.addCase(createCatelogueData.fulfilled, (state) => {
            state.status.create = "succeeded"

        })
        builder.addCase(createCatelogueData.rejected, (state) => {
            state.status.create = "failed"
        })
        builder.addCase(updateCatelogueData.pending, (state) => {
            state.status.update = "loading"
        })

        builder.addCase(updateCatelogueData.fulfilled, (state) => {
            state.status.update = "succeeded"

        })
        builder.addCase(updateCatelogueData.rejected, (state) => {
            state.status.update = "failed"
        })
        builder.addCase(getupdateCatelogueData.pending, (state) => {
            state.status.updating = "loading"
        })

        builder.addCase(getupdateCatelogueData.fulfilled, (state, action) => {
            state.status.updating = "succeeded"
            state.updateCatelogueData = action.payload

        })
        builder.addCase(getupdateCatelogueData.rejected, (state) => {
            state.status.updating = "failed"
        })
        // Delete Images
        builder.addCase(deleteCatelogueImages.pending, (state) => {
            state.status.imageDelete = "loading";
        });
        builder.addCase(deleteCatelogueImages.fulfilled, (state) => {
            state.status.imageDelete = "succeeded";
        });
        builder.addCase(deleteCatelogueImages.rejected, (state) => {
            state.status.imageDelete = 'failed';
        });

        // Delete Datasheets
        builder.addCase(deleteCatelogueDatasheets.pending, (state) => {
            state.status.datasheetDelete = "loading";
        });
        builder.addCase(deleteCatelogueDatasheets.fulfilled, (state) => {
            state.status.datasheetDelete = "succeeded";
        });
        builder.addCase(deleteCatelogueDatasheets.rejected, (state) => {
            state.status.datasheetDelete = 'failed';
        });

        // Delete Certificates
        builder.addCase(deleteCatelogueCertificates.pending, (state) => {
            state.status.certificateDelete = "loading";
        });
        builder.addCase(deleteCatelogueCertificates.fulfilled, (state) => {
            state.status.certificateDelete = "succeeded";
        });
        builder.addCase(deleteCatelogueCertificates.rejected, (state) => {
            state.status.certificateDelete = 'failed';
        });
    }
})
export const { resetCatelogueData } = CatelogueSlice.actions;
export default CatelogueSlice.reducer;