import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import userApi from "../../interceptor/userApi";

interface updateUserPasswordType {
  isLoading: boolean;
  isError: string | null;
  userPasswordResponse: [] | any;
}

const initialState: updateUserPasswordType = {
  isLoading: true,
  isError: null,
  userPasswordResponse: [],
};

export const updateUserPassword = createAsyncThunk<any, any>("User/updateUserPassword", async (updatedPassword, { rejectWithValue }) => {
  const response = userApi.post(`api/sysadmin/changePassword`, updatedPassword);

  toast.promise(response, {
    loading: "Loading",
    success: "Password updated successfully",
    error: "Error while Updating",
  });

  return response
    .then((res) => {
      console.log("User Password", res.data);
      return res.data;
    })
    .catch((e: any) => {
      console.log("error while updating the User Password: ", e.message);
      return rejectWithValue(e.message);
    });
});

const updateUserPasswordSlice = createSlice({
  name: "UserPasswordUpdate",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })

      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.userPasswordResponse = action.payload;
      })

      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong while updating User Password";
      });
  },
});

export const updateUserPasswordReducer = updateUserPasswordSlice.reducer;
//userPasswordUpdate
