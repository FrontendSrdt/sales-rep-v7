import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";



export interface TwelfthMarkingSchemeByIdType {
  isLoading: boolean;
  isError: null | string;
  twelfthMarkingSchemeDataById: any;
}

const initialState: TwelfthMarkingSchemeByIdType = {
  isLoading: false,
  isError: null,
  twelfthMarkingSchemeDataById: {},
};

// create thunk to get the twelfth marking scheme by id

export const getTwelfthMarkingSchemeById = createAsyncThunk<any, string | any>(
  "TwelfthMarkingScheme-byId",

  async (id, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        `api/crm/core/coretwelvemarkingscheme/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getTwelfthMarkingSchemeByIdSlice = createSlice({
    name: "twelfthMarkinScheme-details",
    initialState,
    reducers:{
        resetTwelfthMarkingSchemeDataById: (state) =>{
            state.twelfthMarkingSchemeDataById = {};
        }
    },
    extraReducers(builder) {
        builder.addCase(getTwelfthMarkingSchemeById.pending, (state) =>{
            state.isError = null;
            state.isLoading = true;
        })
        .addCase(getTwelfthMarkingSchemeById.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.twelfthMarkingSchemeDataById = action.payload
        })
        .addCase(getTwelfthMarkingSchemeById.rejected, (state, action) =>{
            state.isError = action.error.message || "An Error Occured while fetching Twelfth Marking Scheme Data By Id";
            state.isLoading = false;
        })
    },
})

export const {resetTwelfthMarkingSchemeDataById} = getTwelfthMarkingSchemeByIdSlice.actions;
export const getTwelfthMarkingSchemeByIdReducer = getTwelfthMarkingSchemeByIdSlice.reducer;

//getTwelfthMarkingSchemeById