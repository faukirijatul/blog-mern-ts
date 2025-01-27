import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_SERVER_URL;

export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture?: {
    public_id?: string;
    url: string;
  };
  savedBlogs?: string[];
  likedBlogs?: string[];
  role: string;
}

export interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  loginLoading: boolean;
  logoutLoading: boolean;
  currentUserLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: true,
  loginLoading: false,
  logoutLoading: false,
  currentUserLoading: false,
};

interface userData {
  name: string;
  email: string;
  picture: string;
}

export const login = createAsyncThunk("user/login", async (data : userData) => {
  try {
    const response = await axios.post(`${API_BASE}/api/v1/users/login`, data, {
      withCredentials: true,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An unknown error occurred");
        throw new Error(
          error.response?.data?.message || "An unknown error occurred"
        );
      } else {
        toast.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/v1/users/logout`, {
      withCredentials: true,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "An unknown error occurred");
      throw new Error(
        error.response?.data?.message || "An unknown error occurred"
      );
    } else {
      toast.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
});

export const currentUser = createAsyncThunk("user/currentUser", async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/v1/users/user`, {
      withCredentials: true,
    });
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An unknown error occurred"
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loginLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loginLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.logoutLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.logoutLoading = false;
      })
      .addCase(currentUser.pending, (state) => {
        state.currentUserLoading = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.currentUserLoading = false;
      })
      .addCase(currentUser.rejected, (state) => {
        state.currentUserLoading = false;
      });
  },
});

export default userSlice.reducer;
