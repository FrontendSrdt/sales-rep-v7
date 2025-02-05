import axios from "axios";
import userApi from "../../interceptor/userApi";
import { SerializedError } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoggedInUserDataType {
  userDetails: Record<string, any>;
  isLoading: boolean;
  isError: string | null | SerializedError;
}

const initialState: LoggedInUserDataType = {
  userDetails: {},
  isLoading: false,
  isError: null,
};

// Thunk for fetching user details
export const fetchUserDetails = createAsyncThunk("user/fetchUserDetails", async (token: string, { rejectWithValue }) => {
  try {
    const response = await userApi.post("api/sysadmin/getUserDetails", {
      jwtToken: token,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data || "Failed to fetch user details");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

const loggedInUserSlice = createSlice({
  name: "loggedin-user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload ?? "Failed to fetch user details";
      });
  },
});

export const loggedInUserReducer = loggedInUserSlice.reducer;
