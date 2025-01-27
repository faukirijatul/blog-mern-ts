import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  createBlog,
  getSingleBlog,
  updateBlog,
} from "../../../store/slices/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface FormData {
  title: string;
  highlight: string;
  category: { value: string; label: string } | null | string;
  thumbnail: string;
  content: string;
}

const categories: { value: string; label: string }[] = [
  { value: "basics", label: "Basics" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Fullstack" },
];

const BlogContentForm: React.FC = () => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const [blog, setBlog] = useState<FormData>({
    title: "",
    highlight: "",
    category: null,
    thumbnail: "",
    content: "",
  });

  const { blog: fechedBlog } = useSelector((state: RootState) => state.blog);

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(getSingleBlog(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (fechedBlog) {
      setBlog({
        title: fechedBlog.title,
        highlight: fechedBlog.highlight,
        category: {
          value: fechedBlog.category,
          label:
            fechedBlog.category.charAt(0).toUpperCase() +
            fechedBlog.category.slice(1),
        },
        thumbnail: fechedBlog.thumbnail.url,
        content: fechedBlog.content,
      });
    }
  }, [fechedBlog]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlog({ ...blog, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveThumbnail = () => {
    setBlog({ ...blog, thumbnail: "" });
  };

  const handleReplaceThumbnail = () => {
    document.getElementById("thumbnail-input")?.click();
  };

  const handleCategoryChange = (selectedOption: FormData["category"]) => {
    setBlog({ ...blog, category: selectedOption });
  };

  const handleContentChange = (value: string) => {
    setBlog({ ...blog, content: value });
  };

  const stripHtmlTags = (content: string) => {
    return content.replace(/<\/?[^>]+(>|$)/g, "").trim();
  };

  const isFormValid = () => {
    return (
      blog.title.trim() !== "" &&
      blog.highlight.trim() !== "" &&
      blog.category !== null &&
      stripHtmlTags(blog.content) !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("All fields are required.");
      return;
    }

    const transformedData = {
      ...blog,
      category:
        typeof blog.category === "object" && blog.category !== null
          ? blog.category.value
          : "",
      thumbnail: blog.thumbnail.startsWith("https") ? "" : blog.thumbnail,
    };

    if (slug) {
      dispatch(updateBlog({ data: transformedData, slug })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate(`/admin/edit/${res.payload.blog.slug}`);
        }
      })
    } else {
      dispatch(createBlog(transformedData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setBlog({
            title: "",
            highlight: "",
            category: null,
            thumbnail: "",
            content: "",
          });
        }
      });
    }
  };

  return (
    <div className="w-full mx-auto px-2 md:px-10 lg:px-20 xl:px-50 p-6 bg-white mt-20">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit}>
        {/* Thumbnail */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Thumbnail
          </label>
          <div className="relative">
            <input
              type="file"
              id="thumbnail-input"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mt-1 w-full text-sm text-gray-500 hidden"
            />
            {blog.thumbnail ? (
              <div className="mt-4 relative">
                <img
                  src={blog.thumbnail}
                  alt="Thumbnail Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                >
                  <IoMdClose />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleReplaceThumbnail}
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                Choose Image
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter blog title"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <JoditEditor
            value={blog.content}
            onChange={handleContentChange}
            className="mt-1"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <Select
            options={categories}
            value={blog.category}
            onChange={handleCategoryChange}
            className="mt-1"
            placeholder="Select a category"
            isClearable
          />
        </div>

        {/* Highlight */}
        <div className="mb-4">
          <label
            htmlFor="highlight"
            className="block text-sm font-medium text-gray-700"
          >
            Highlight
          </label>
          <textarea
            id="highlight"
            name="highlight"
            value={blog.highlight}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
            placeholder="Enter a paragraph to highlight"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          Save Blog
        </button>
      </form>
    </div>
  );
};

export default BlogContentForm;
