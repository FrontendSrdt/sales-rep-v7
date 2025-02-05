import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";


interface MaxActiveAppStatusType {
    maxActiveAppStatusResponse: {};
    isLoading: boolean;
    isError: null | string;
}

const initialState: MaxActiveAppStatusType = {
    maxActiveAppStatusResponse: {},
    isLoading: true,
    isError: null,
};
export const getMaxActiveAppStatus = createAsyncThunk<any, string>(
    "getMaxActiveAppStatusResponse",
    async (leadCaptureId, { rejectWithValue }) => {
        try {
            const response = await coreLeadCaptureApi.get(
                `api/crm/lead/leadapplicationstatus/findMaxActiveCoreApplicationStatusName/${leadCaptureId}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data.message || "An error occurred."
            );
        }
    }
);

const getMaxActiveAppStatusSlice = createSlice({
    name: "LeadCapture/getMaxActiveAppStatusResponse",
    initialState,
    reducers: {
        resetMaxActiveAppStatusResponse: (state) => {
            state.maxActiveAppStatusResponse = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMaxActiveAppStatus.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getMaxActiveAppStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.maxActiveAppStatusResponse = action.payload;
            })
            .addCase(getMaxActiveAppStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || "Something went wrong!";
            });
    },
});

export const { resetMaxActiveAppStatusResponse } =
    getMaxActiveAppStatusSlice.actions;
export const getMaxActiveAppStatusReducer =
    getMaxActiveAppStatusSlice.reducer;

//getMaxActiveAppStatusResponse
