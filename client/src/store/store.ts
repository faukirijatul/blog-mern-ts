import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import blogReducer from "./slices/blogSlice";
import statisticReducer from "./slices/statisticSlice";
import bannerReducer from "./slices/bannerSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer,
        statistic: statisticReducer,
        banner: bannerReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;