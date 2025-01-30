import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE } from "../../constans";

interface IStatisticState {
  visits: number;
  loading: boolean;
}

const initialState: IStatisticState = {
  visits: 0,
  loading: false,
};

// add visit
export const addVisit = createAsyncThunk("statistic/addVisit", async () => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/v1/statistics/add-visit`,
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
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

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVisit.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVisit.fulfilled, (state, action) => {
        state.visits = action.payload.totalVisits;
        state.loading = false;
      })
      .addCase(addVisit.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default statisticSlice.reducer;
