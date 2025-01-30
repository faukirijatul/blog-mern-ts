import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE } from "../../constans";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IBanner {
    _id: string;
    image: {
        url: string;
        public_id: string;
    };
    title: string;
    link: string;
}

export interface IBannerState {
    randomTwoBanners: IBanner[];
    randomOneBanner: IBanner | null;
    loading: boolean;
    error: string | null;
}

const initialState: IBannerState = {
    randomTwoBanners: [],
    randomOneBanner: null,
    loading: false,
    error: null,
};

export const getRandomBanners = createAsyncThunk(
    "banner/getRandomBanners",
    async () => {
        try {
            const response = await axios.get(`${API_BASE}/api/v1/banners/random`);
        return response.data;
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
    }
);

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRandomBanners.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getRandomBanners.fulfilled, (state, action) => {
            state.loading = false;
            state.randomTwoBanners = action.payload.randomTwoBanners;
            state.randomOneBanner = action.payload.randomOneBanner;
            state.error = null;
        });
        builder.addCase(getRandomBanners.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "An unknown error occurred";
        });
    },
});

export default bannerSlice.reducer;