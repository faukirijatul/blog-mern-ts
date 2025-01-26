import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";

interface FormData {
  title: string;
  highlight: string;
  category: { value: string; label: string } | null;
  thumbnail: string;
  content: string;
}

const categories: { value: string; label: string }[] = [
  { value: "nextjs", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "nodejs", label: "Node.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "mongo", label: "MongoDB" },
];

const BlogContentForm: React.FC = () => {
  const [blog, setBlog] = useState<FormData>({
    title: "",
    highlight: "",
    category: null,
    thumbnail: "",
    content: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blog Data:", blog);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-20">
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
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 bg-gray-200 hover:bg-gray-300"
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
            required
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={blog.content}
            onChange={handleContentChange}
            className="mt-1"
            placeholder="Write your blog content here..."
            style={{ height: "300px" }}
          />
        </div>

        {/* Category */}
        <div className="mb-4 mt-14">
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
            placeholder="Enter a pragraph to highlight and will show in blogs list"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Save Blog
        </button>
      </form>
    </div>
  );
};

export default BlogContentForm;
