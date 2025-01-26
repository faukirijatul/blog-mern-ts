import React, { useEffect, useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaReply } from "react-icons/fa";
import { blogData } from "../../data/data";
import { Blog, Comment, Reply } from "../../types";
import { useParams } from "react-router-dom";
import LoadingPost from "../../components/LoadingPost";
import { countComments } from "../../helper/countComments";
import Footer from "../../components/Footer";

const BlogPost: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>(
    blog ? blog.comments : []
  );
  const [blogLikes, setBlogLikes] = useState<number>(blog ? blog.likes : 0);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // State untuk menampilkan input balasan pada komentar yang diklik
  const [replyText, setReplyText] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // Menyimpan id komentar yang sedang dibalas

  // Ambil data blog berdasarkan ID dari URL
  useEffect(() => {
    if (blogId) {
      const foundBlog = blogData.find((blog) => blog.id === blogId); // Temukan blog berdasarkan ID
      if (foundBlog) {
        setBlog(foundBlog);
        setComments(foundBlog.comments);
        setBlogLikes(foundBlog.likes);
      }
    }
  }, [blogId]);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentData: Comment = {
        id: `c${comments.length + 1}`,
        user: "Anonymous User",
        text: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: [],
      };
      setComments((prev) => [...prev, newCommentData]);
      setNewComment("");
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  // Fungsi untuk menambahkan balasan pada komentar
  const handleReply = () => {
    if (replyText.trim() !== "" && replyingTo) {
      const newReply: Reply = {
        id: `r${Date.now()}`,
        user: "Anonymous User",
        text: replyText,
        createdAt: new Date().toISOString(),
        likes: 0,
      };

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === replyingTo
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
      setReplyText(""); // Resetkan input setelah reply
      setReplyingTo(null); // Hapus komentar yang sedang dibalas
    }
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply: Reply) =>
                reply.id === replyId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              ),
            }
          : comment
      )
    );
  };

  // Fungsi untuk menambahkan like pada postingan blog
  const handleLikeBlog = () => {
    setBlogLikes(blogLikes + 1); // Menambahkan 1 like pada blog
  };

  if (!blog) return <LoadingPost />;

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 mt-20">
        {/* Blog Content */}

        <div key={blog.id} className="mb-10">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
          <p className="text-gray-500 mb-4">
            By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <div
            className="prose prose-sm md:prose-base lg:prose-lg mb-6 text-justify leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
          <div className="text-gray-600 font-medium">
            Likes: {blogLikes} | Comments: {countComments(comments)}
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 mt-2 cursor-pointer"
                onClick={handleLikeBlog}
              >
                <FaHeart className="text-red-500" />
                Like Post
              </button>
              <button
                className="flex items-center gap-1 mt-2 cursor-pointer"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                Save Post
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
                onClick={handleAddComment}
              >
                Submit
              </button>
            </div>

            {/* Comments List */}
            {comments.map((comment) => (
              <div key={comment.id} className="mb-6">
                <div className="flex items-center gap-2">
                  <strong>{comment.user}</strong>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{comment.text}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <FaHeart className="text-red-500" />
                    {comment.likes} Likes
                  </button>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => {
                      setReplyingTo(comment.id); // Menyimpan id komentar yang sedang dibalas
                    }}
                  >
                    <FaReply />
                    Reply
                  </button>
                </div>

                {/* Input balasan jika tombol reply diklik */}
                {replyingTo === comment.id && (
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
                        onClick={handleReply}
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
                {comment.replies.map((reply: Reply) => (
                  <div
                    key={reply.id}
                    className="ml-6 mt-4 border-l pl-4 border-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      <strong>{reply.user}</strong>
                      <span className="text-gray-500 text-sm">
                        {new Date(reply.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{reply.text}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <button
                        className="flex items-center gap-1"
                        onClick={() => handleLikeReply(comment.id, reply.id)}
                      >
                        <FaHeart className="text-red-500" />
                        {reply.likes} Likes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogPost;
