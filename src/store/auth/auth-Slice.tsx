// store/authSlice.ts
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router";

interface LogoutPayload {
  email: string;
  navigate: NavigateFunction;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isStatus: string;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  isAuthenticated: !!localStorage.getItem("access_token"),
  isStatus: "",
};

// Define the thunk function to logout User

export const logoutUser = createAsyncThunk<any, LogoutPayload>("user/logout", async ({ email, navigate }, { rejectWithValue }) => {
  try {
    // there is not entercepter created for the below port therefor it's only one I have !!
    // prod
    // await axios.get(`http://192.200.12.174:9001/logout/${email}`);
    await axios.get(`http://10.8.20.38:9001/logout/${email}`);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/"); // Navigate to the home page
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    resetAuth: (state) => {
      state.isAuthenticated = false;
    },
    redirectToLogin: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    getAccessToekn: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isStatus = "pending";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isStatus = "success";
      })
      .addCase(logoutUser.rejected, (_, action) => {
        console.error("Logout failed:", action.payload);
      });
  },
});

export const { setAuth, resetAuth, redirectToLogin, getAccessToekn } = authSlice.actions;
export default authSlice.reducer;
