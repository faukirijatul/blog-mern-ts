import React, { useEffect, useState } from "react";
import {
  FaBookmark,
  FaEdit,
  FaHeart,
  FaRegBookmark,
  FaRegHeart,
  FaReply,
  FaTrash,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import LoadingPost from "../../components/LoadingPost";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addComment,
  addReply,
  deleteComment,
  deleteReply,
  getSingleBlog,
  likeBlog,
  likeComment,
  likeReply,
  unlikeBlog,
  unlikeComment,
  unlikeReply,
} from "../../store/slices/blogSlice";
import { useSelector } from "react-redux";
import { saveBlog, unsaveBlog } from "../../store/slices/userSlice";
import { formatDate } from "../../helper/formatDate";
import { calculateTotalCommentsAndReplies } from "../../helper/calculateTotalCommentsAndReplies";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const dispatch: AppDispatch = useDispatch();

  const { blog, getSingleBlogLoading } = useSelector(
    (state: RootState) => state.blog
  );
  const { user } = useSelector((state: RootState) => state.user);

  const [newComment, setNewComment] = useState<string>("");
  const [replyText, setReplyText] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
      document.title = blog?.title ? `${blog?.title} - Fauki Personal Blog` : "Fauki Personal Blog";
    }, [blog?.title])

  useEffect(() => {
    if (slug) {
      dispatch(getSingleBlog(slug));
    }
  }, [slug, dispatch]);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      dispatch(addComment({ blogId: blog?._id as string, text: newComment }));
      setNewComment("");
    }
  };

  const handleLikeComment = (commentId: string) => {
    dispatch(likeComment({ blogId: blog?._id as string, commentId }));
  };

  const handleUnlikeComment = (commentId: string) => {
    dispatch(unlikeComment({ blogId: blog?._id as string, commentId }));
  };

  const handleReply = (commentId: string) => {
    if (replyText.trim() !== "" && replyingTo) {
      dispatch(
        addReply({ blogId: blog?._id as string, commentId, text: replyText })
      ).then(() => {
        setReplyText("");
        setReplyingTo(null);
      });
    }
  };

  const handleLikeReply = (replyId: string) => {
    dispatch(likeReply({ blogId: blog?._id as string, replyId }));
  };

  const handleUnlikeReply = (replyId: string) => {
    dispatch(unlikeReply({ blogId: blog?._id as string, replyId }));
  };

  const handleLikeBlog = () => {
    dispatch(likeBlog(slug as string));
  };

  const handleUnlikeBlog = () => {
    dispatch(unlikeBlog(slug as string));
  };

  const handleSaveBlog = (blogId: string) => {
    dispatch(saveBlog(blogId));
  };

  const handleUnsaveBlog = (blogId: string) => {
    dispatch(unsaveBlog(blogId));
  };

  if (getSingleBlogLoading) return <LoadingPost />;

  return (
    <>
      {blog && (
        <div className="max-w-4xl mx-auto p-4 mt-20">
          {/* Blog Content */}
          <div key={blog._id} className="mb-10">
            <img
              src={blog.thumbnail?.url}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
            <p className="text-gray-500 mb-4">
              By {blog.author?.name} | {formatDate(blog.createdAt)}
            </p>
            {user && user.role === "admin" && (
              <div className="p-4 flex items-center justify-end gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/admin/edit/${blog.slug}`)
                  }
                >
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            )}
            <div
              className="prose prose-sm md:prose-base lg:prose-lg mb-6 space-y-4"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
            <div className="text-gray-600 font-medium">
              {blog.likes?.length} Likes .{" "}
              {calculateTotalCommentsAndReplies(blog.comments)} Comments .{" "}
              {blog.views} Views
              <div className="flex items-center gap-2 mt-2">
                {user &&
                Array.isArray(blog.likes) &&
                blog.likes.some((like) => like.email === user.email) ? (
                  <button
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={handleUnlikeBlog}
                  >
                    <FaHeart className="text-red-500" /> Unlike
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={handleLikeBlog}
                  >
                    <FaRegHeart /> Like
                  </button>
                )}
                <button className="flex items-center gap-1">
                  {user &&
                  user.savedBlogs &&
                  user.savedBlogs.includes(blog._id) ? (
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleUnsaveBlog(blog._id)}
                    >
                      <FaBookmark />
                      Saved
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleSaveBlog(blog._id)}
                    >
                      <FaRegBookmark />
                      Save
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>

              {/* Add Comment */}
              <div className="mb-4">
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                ></textarea>
                <button
                  className="mt-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={handleAddComment} // oke
                >
                  Submit
                </button>
              </div>

              {/* Comments List */}
              {blog.comments?.map((comment) => (
                <div key={comment._id} className="mb-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={comment.user.picture?.url}
                      alt={comment.user.name}
                      className="w-6 h-6 rounded-full border border-gray-300"
                    />
                    <strong>{comment.user.name}</strong>
                    <span className="text-gray-500 text-sm">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <button className="flex items-center gap-1">
                      {user &&
                      Array.isArray(comment.likes) &&
                      comment.likes.some(
                        (like) => like.email === user.email
                      ) ? (
                        <FaHeart
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleUnlikeComment(comment._id)}
                        />
                      ) : (
                        <FaRegHeart
                          className="cursor-pointer"
                          onClick={() => handleLikeComment(comment._id)}
                        />
                      )}
                      {comment.likes?.length}
                    </button>
                    <button
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => {
                        setReplyingTo(comment._id);
                      }}
                    >
                      <FaReply />
                      Reply
                    </button>
                    {comment.user._id === user?._id && (
                      <button
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() =>
                          dispatch(
                            deleteComment({
                              blogId: blog._id as string,
                              commentId: comment._id,
                            })
                          )
                        }
                      >
                        <FaTrash /> Delete
                      </button>
                    )}
                  </div>

                  {/* Input balasan jika tombol reply diklik */}
                  {replyingTo === comment._id && (
                    <div className="mt-4">
                      <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Add a reply..."
                      ></textarea>
                      <div className="flex justify-end items-center gap-2">
                        <button
                          className="mt-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                          onClick={() => handleReply(comment._id)}
                        >
                          Submit
                        </button>
                        <button
                          className="mt-2 px-4 py-2 text-sm font-medium border border-red-300 rounded-lg cursor-pointer hover:bg-red-100"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies &&
                    comment.replies.map((reply) => (
                      <div
                        key={reply._id}
                        className="ml-6 mt-4 border-l pl-4 border-gray-300"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={reply.user?.picture?.url}
                            alt={reply.user.name}
                            className="w-6 h-6 rounded-full border border-gray-300"
                          />
                          <strong>{reply.user.name}</strong>
                          <span className="text-gray-500 text-sm">
                            {formatDate(reply.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                          {reply.text}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <button className="flex items-center gap-1">
                            {user &&
                            Array.isArray(reply.likes) &&
                            reply.likes.some(
                              (like) => like.email === user.email
                            ) ? (
                              <FaHeart
                                className="text-red-500 cursor-pointer"
                                onClick={() => handleUnlikeReply(reply._id)}
                              />
                            ) : (
                              <FaRegHeart
                                className="cursor-pointer"
                                onClick={() => handleLikeReply(reply._id)}
                              />
                            )}
                            {reply.likes?.length}
                          </button>
                          {reply.user._id === user?._id && (
                            <button
                              className="flex items-center gap-1 cursor-pointer"
                              onClick={() =>
                                dispatch(
                                  deleteReply({
                                    blogId: blog._id as string,
                                    commentId: comment._id,
                                    replyId: reply._id,
                                  })
                                )
                              }
                            >
                              <FaTrash /> Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPost;
