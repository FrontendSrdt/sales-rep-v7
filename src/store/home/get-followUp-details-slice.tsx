import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { toast } from "react-toastify";
 
interface LeadReport {
    id: number;
    name: string;
    status: string;
    date: string;
}
 
interface LeadReportState {
    responseOfFlowUpDetails: Record<string, LeadReport[]>; // Store responses dynamically by taskName
    loading: boolean;
    error: string | null;
}
 
const initialState: LeadReportState = {
    responseOfFlowUpDetails: {},
    loading: false,
    error: null,
};
 
type FetchLeadReportParams = {
    taskTypeId: number;
    taskNames: string[]; // Accept multiple task names
    date: string;
};
 
// Async thunk to fetch reports for multiple taskNames
export const fetchLeadReports = createAsyncThunk<
    Record<string, LeadReport[]>,
    FetchLeadReportParams,
    { rejectValue: string }
>(
    "leadReport/fetchLeadReports",
    async ({ taskTypeId, taskNames, date }, { rejectWithValue }) => {
        const apiUrl = `api/crm/lead/report/findByTaskType`;
 
        return toast.promise(
            (async () => {
                try {
                    // Create multiple API calls for different taskNames
                    const requests = taskNames.map(taskName =>
                        coreLeadCaptureApi.get(`${apiUrl}/${taskTypeId}/${taskName}/${date}`).then(res => ({
                            taskName,
                            data: res.data
                        }))
                    );
 
                    const results = await Promise.all(requests);
 
                    // Store response based on taskName
                    return results.reduce((acc, { taskName, data }) => {
                        acc[taskName] = data;
                        return acc;
                    }, {} as Record<string, LeadReport[]>);
                } catch (error: any) {
                    throw new Error(error.response?.data?.message || "Failed to fetch data");
                }
            })(),
            {
                pending: "Fetching lead reports...",
                success: "Lead reports fetched successfully!",
                error: "Failed to fetch lead reports.",
            }
        ).catch((error) => rejectWithValue(error.message));
    }
);
 
const leadReportSlice = createSlice({
    name: "leadReport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeadReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeadReports.fulfilled, (state, action) => {
                state.loading = false;
                state.responseOfFlowUpDetails = { ...state.responseOfFlowUpDetails, ...action.payload }; // Merge new responses
            })
            .addCase(fetchLeadReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});
 
export default leadReportSlice.reducer;
// getFollowUpDetails