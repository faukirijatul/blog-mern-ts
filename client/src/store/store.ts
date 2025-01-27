import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import blogReducer from "./slices/blogSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;