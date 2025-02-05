import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import userApi from "../../interceptor/userApi";

interface updateUserPhoneType {
  isLoading: boolean;
  isError: string | null;
  userPhoneResponse: [] | any;
}

const initialState: updateUserPhoneType = {
  isLoading: true,
  isError: null,
  userPhoneResponse: [],
};

export const updateUserPhone = createAsyncThunk<any, { newPhone: string | number }>("User/updateUserPhone", async ({ newPhone }, { rejectWithValue }) => {
  const response = userApi.patch(`api/sysadmin/user/changePhone/${newPhone}`);

  toast.promise(response, {
    loading: "Loading",
    success: "Phone updated successfully",
    error: "Error while Updating",
  });

  return response
    .then((res) => {
      console.log("User Phone", res.data);
      return res.data;
    })
    .catch((e: any) => {
      console.log("error while updating the User Phone: ", e.message);
      return rejectWithValue(e.message);
    });
});

const updateUserPhoneSlice = createSlice({
  name: "UserPhoneUpdate",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateUserPhone.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })

      .addCase(updateUserPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.userPhoneResponse = action.payload;
      })

      .addCase(updateUserPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong while updating User Phone";
      });
  },
});

export const updateUserPhoneReducer = updateUserPhoneSlice.reducer;
//userPhoneUpdate
