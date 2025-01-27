import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { IUser } from "./userSlice";

const API_BASE = import.meta.env.VITE_SERVER_URL;

export interface IReply {
  user: IUser;
  text: string;
  likes: number;
}

export interface IComment {
  user: IUser;
  text: string;
  likes: number;
  replies?: IReply[];
}

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
  author: IUser;
  category: string;
  highlight: string;
  views: number;
  likes: IUser[];
  comments: IComment[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogState {
  blog: IBlog | null;
  allBlogs: IBlog[];
  createBlogLoading: boolean;
  updateBlogLoading: boolean;
  getSingleBlogLoading: boolean;
  getAllBlogsLoading: boolean;
}

const initialState: BlogState = {
  blog: null,
  allBlogs: [],
  createBlogLoading: false,
  updateBlogLoading: false,
  getSingleBlogLoading: false,
  getAllBlogsLoading: false,
};

interface BlogData {
  title: string;
  highlight: string;
  category: string;
  thumbnail: string;
  content: string;
}

export const createBlog = createAsyncThunk("blog/create", async (data : BlogData) => {
  try {
    const response = await axios.post(`${API_BASE}/api/v1/blogs`, data, {
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

export const updateBlog = createAsyncThunk("blog/update", async ({ data, slug }: { data: BlogData, slug: string }) => {
  try {
    const response = await axios.put(`${API_BASE}/api/v1/blogs/${slug}`, data, {
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

export const getSingleBlog = createAsyncThunk("blog/single", async (slug : string) => {
  try {
    const response = await axios.get(`${API_BASE}/api/v1/blogs/${slug}`);
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

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.createBlogLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.createBlogLoading = false;
        state.allBlogs = [...state.allBlogs, action.payload.blog];
      })
      .addCase(createBlog.rejected, (state) => {
        state.createBlogLoading = false;
      })
      .addCase(updateBlog.pending, (state) => {
        state.updateBlogLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.updateBlogLoading = false;
        state.blog = action.payload.blog;
        state.allBlogs = state.allBlogs.map((blog) => {
          if (blog._id === action.payload.blog._id) {
            return action.payload.blog;
          }
          return blog;
        })
      })
      .addCase(updateBlog.rejected, (state) => {
        state.updateBlogLoading = false;
      })
      .addCase(getSingleBlog.pending, (state) => {
        state.getSingleBlogLoading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.getSingleBlogLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(getSingleBlog.rejected, (state) => {
        state.getSingleBlogLoading = false;
      });
  },
});

export default blogSlice.reducer;
