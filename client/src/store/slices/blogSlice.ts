import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { IUser } from "./userSlice";
import { API_BASE } from "../../constans";

export interface IReply {
  _id: string;
  user: IUser;
  text: string;
  likes: IUser[];
  createdAt: string;
}

export interface IComment {
  _id: string;
  user: IUser;
  text: string;
  likes: IUser[];
  replies?: IReply[];
  createdAt: string;
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

export interface IRandomBlog {
  _id: string;
  title: string;
  thumbnail: {
    url: string;
  };
  category: string;
  createdAt: string;
  authorData: {
    name: string;
  };
  slug: string;
}

export interface IAllBlog {
  _id: string;
  title: string;
  highlight: string;
  thumbnail: {
    url: string;
  };
  views: number;
  category?: string;
  createdAt: string;
  saves?: number;
  slug: string;
  authorData: {
    name: string;
  };
  likesCount: number;
  commentsCount: number;
}

export interface BlogState {
  blog: IBlog | null;
  random5Blogs: IRandomBlog[];
  getRandom5BlogsLoading: boolean;
  fiveLatestBlogs: IAllBlog[];
  fivePopularBlogs: IAllBlog[];
  getFiveLatestAndPopularBlogsLoading: boolean;
  createBlogLoading: boolean;
  updateBlogLoading: boolean;
  getSingleBlogLoading: boolean;
  likeBlogLoading: boolean;
  unlikeBlogLoading: boolean;
  addCommentLoading: boolean;
  likeCommentLoading: boolean;
  unlikeCommentLoading: boolean;
  deleteCommentLoading: boolean;
  addReplyLoading: boolean;
  likeReplyLoading: boolean;
  unlikeReplyLoading: boolean;
  deleteReplyLoading: boolean;
}

const initialState: BlogState = {
  blog: null,
  random5Blogs: [],
  getRandom5BlogsLoading: false,
  fiveLatestBlogs: [],
  fivePopularBlogs: [],
  getFiveLatestAndPopularBlogsLoading: false,
  createBlogLoading: false,
  updateBlogLoading: false,
  getSingleBlogLoading: false,
  likeBlogLoading: false,
  unlikeBlogLoading: false,
  addCommentLoading: false,
  likeCommentLoading: false,
  unlikeCommentLoading: false,
  deleteCommentLoading: false,
  addReplyLoading: false,
  likeReplyLoading: false,
  unlikeReplyLoading: false,
  deleteReplyLoading: false,
};

interface BlogData {
  title: string;
  highlight: string;
  category: string;
  thumbnail: string;
  content: string;
}

export const createBlog = createAsyncThunk(
  "blog/create",
  async (data: BlogData) => {
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
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

// get five random
export const getRandomBlogs = createAsyncThunk("blog/random", async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/v1/blogs/random`);
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

// get all blog + query
export interface IBlogQuery {
  page: number;
  limit: number;
  search: string;
  category: string;
  sortBy: string;
  order: string;
}

// get five latest and popular
export const getFiveLatestAndPopularBlogs = createAsyncThunk(
  "blog/latest",
  async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/v1/blogs/latest-and-popular`
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ data, slug }: { data: BlogData; slug: string }) => {
    try {
      const response = await axios.put(
        `${API_BASE}/api/v1/blogs/${slug}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

export const getSingleBlog = createAsyncThunk(
  "blog/single",
  async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE}/api/v1/blogs/${slug}`);
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

export const likeBlog = createAsyncThunk("blog/like", async (slug: string) => {
  try {
    const response = await axios.get(`${API_BASE}/api/v1/blogs/like/${slug}`, {
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

export const unlikeBlog = createAsyncThunk(
  "blog/unlike",
  async (slug: string) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/v1/blogs/unlike/${slug}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

export const addComment = createAsyncThunk(
  "blog/comment",
  async ({ blogId, text }: { blogId: string; text: string }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/v1/comments/${blogId}`,
        { text },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

export const likeComment = createAsyncThunk(
  "blog/likeComment",
  async ({ blogId, commentId }: { blogId: string; commentId: string }) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/v1/comments/like/${blogId}/${commentId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

// unlike comment
export const unlikeComment = createAsyncThunk(
  "blog/unlikeComment",
  async ({ blogId, commentId }: { blogId: string; commentId: string }) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/v1/comments/unlike/${blogId}/${commentId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

export const deleteComment = createAsyncThunk(
  "blog/deleteComment",
  async ({ blogId, commentId }: { blogId: string; commentId: string }) => {
    try {
      const response = await axios.delete(
        `${API_BASE}/api/v1/comments/${blogId}/${commentId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

export const addReply = createAsyncThunk(
  "blog/reply",
  async ({
    blogId,
    commentId,
    text,
  }: {
    blogId: string;
    commentId: string;
    text: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/v1/replies/${blogId}/${commentId}`,
        { text },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

export const likeReply = createAsyncThunk(
  "blog/likeReply",
  async ({ blogId, replyId }: { blogId: string; replyId: string }) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/v1/replies/like/${blogId}/${replyId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

// unlike reply
export const unlikeReply = createAsyncThunk(
  "blog/unlikeReply",
  async ({ blogId, replyId }: { blogId: string; replyId: string }) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/v1/replies/unlike/${blogId}/${replyId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

// delete reply
export const deleteReply = createAsyncThunk(
  "blog/deleteReply",
  async ({
    blogId,
    commentId,
    replyId,
  }: {
    blogId: string;
    commentId: string;
    replyId: string;
  }) => {
    try {
      const response = await axios.delete(
        `${API_BASE}/api/v1/replies/${blogId}/${commentId}/${replyId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
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

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.createBlogLoading = true;
      })
      .addCase(createBlog.fulfilled, (state) => {
        state.createBlogLoading = false;
      })
      .addCase(createBlog.rejected, (state) => {
        state.createBlogLoading = false;
      })
      .addCase(getRandomBlogs.pending, (state) => {
        state.getRandom5BlogsLoading = true;
      })
      .addCase(getRandomBlogs.fulfilled, (state, action) => {
        state.getRandom5BlogsLoading = false;
        state.random5Blogs = action.payload.blogs;
      })
      .addCase(getRandomBlogs.rejected, (state) => {
        state.getRandom5BlogsLoading = false;
      })
      .addCase(updateBlog.pending, (state) => {
        state.updateBlogLoading = true;
      })
      .addCase(getFiveLatestAndPopularBlogs.pending, (state) => {
        state.getFiveLatestAndPopularBlogsLoading = true;
      })
      .addCase(getFiveLatestAndPopularBlogs.fulfilled, (state, action) => {
        state.getFiveLatestAndPopularBlogsLoading = false;
        state.fiveLatestBlogs = action.payload.latestBlogs;
        state.fivePopularBlogs = action.payload.popularBlogs;
      })
      .addCase(getFiveLatestAndPopularBlogs.rejected, (state) => {
        state.getFiveLatestAndPopularBlogsLoading = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.updateBlogLoading = false;
        state.blog = action.payload.blog;
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
      })
      .addCase(likeBlog.pending, (state) => {
        state.likeBlogLoading = true;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        state.likeBlogLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(likeBlog.rejected, (state) => {
        state.likeBlogLoading = false;
      })
      .addCase(unlikeBlog.pending, (state) => {
        state.unlikeBlogLoading = true;
      })
      .addCase(unlikeBlog.fulfilled, (state, action) => {
        state.unlikeBlogLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(unlikeBlog.rejected, (state) => {
        state.unlikeBlogLoading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentLoading = false;
        console.log(action.payload.blog);
        state.blog = action.payload.blog;
      })
      .addCase(addComment.rejected, (state) => {
        state.addCommentLoading = false;
      })
      .addCase(likeComment.pending, (state) => {
        state.likeCommentLoading = true;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.likeCommentLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(likeComment.rejected, (state) => {
        state.likeCommentLoading = false;
      })
      .addCase(unlikeComment.pending, (state) => {
        state.unlikeCommentLoading = true;
      })
      .addCase(unlikeComment.fulfilled, (state, action) => {
        state.unlikeCommentLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(unlikeComment.rejected, (state) => {
        state.unlikeCommentLoading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.deleteCommentLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.deleteCommentLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteCommentLoading = false;
      })
      .addCase(addReply.pending, (state) => {
        state.addReplyLoading = true;
      })
      .addCase(addReply.fulfilled, (state, action) => {
        state.addReplyLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(addReply.rejected, (state) => {
        state.addReplyLoading = false;
      })
      .addCase(likeReply.pending, (state) => {
        state.likeReplyLoading = true;
      })
      .addCase(likeReply.fulfilled, (state, action) => {
        state.likeReplyLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(likeReply.rejected, (state) => {
        state.likeReplyLoading = false;
      })
      .addCase(unlikeReply.pending, (state) => {
        state.unlikeReplyLoading = true;
      })
      .addCase(unlikeReply.fulfilled, (state, action) => {
        state.unlikeReplyLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(unlikeReply.rejected, (state) => {
        state.unlikeReplyLoading = false;
      })
      .addCase(deleteReply.pending, (state) => {
        state.deleteReplyLoading = true;
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        state.deleteReplyLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(deleteReply.rejected, (state) => {
        state.deleteReplyLoading = false;
      })
  },
});

export default blogSlice.reducer;
