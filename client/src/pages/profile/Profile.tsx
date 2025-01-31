import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import axios from "axios";
import { API_BASE } from "../../constans";
import { FaBookmark, FaCamera, FaSpinner } from "react-icons/fa";
import {
  unsaveBlog,
  updateUser,
  updateUserData,
} from "../../store/slices/userSlice";

interface ISavedBlogs {
  _id: string;
  title: string;
  slug: string;
  description: string;
  highlight: string;
  createdAt: string;
  thumbnail: {
    url: string;
  };
}

const Profile: React.FC = () => {
  const [savedBlogs, setSavedBlogs] = useState<ISavedBlogs[]>([]);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState<string>("");
  const [imageDataToSend, setImageDataToSend] = useState<string>("");

  useEffect(() => {
    document.title = "Profile - Fauki Personal Blog";
  }, [])

  const { user, updateUserLoading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPicture(user.picture ? user.picture.url : "");
    }
    if (user?.savedBlogs && user?.savedBlogs?.length > 0) {
      axios
        .post(
          `${API_BASE}/api/v1/users/saved-blogs`,
          { blogIds: user?.savedBlogs },
          { withCredentials: true }
        )
        .then((res) => setSavedBlogs(res.data.blogs));
    }
  }, [user]);

  const handleSaveProfile = async () => {
    const updatedUser: updateUserData = { name, picture : imageDataToSend };
    dispatch(updateUser(updatedUser));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader);
      reader.onloadend = () => {
        setPicture(reader.result as string);
        setImageDataToSend(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-27 mb-10 px-4 md:px-8 xl:px-30">
      <div className="flex flex-col gap-6">
        {/* Profile Section */}
        <div className="flex-1 bg-white">
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 relative">
              <img
                src={picture || user?.picture?.url}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-gray-300"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <label className="text-sm text-gray-600 mt-3 block">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="border border-gray-300 p-2 w-full rounded mt-1 cursor-not-allowed focus:ring-none focus:outline-none"
            />

            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer mt-4 hover:bg-gray-100 disabled:opacity-50"
            >
              {updateUserLoading && <FaSpinner className="animate-spin" />}
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Saved Blogs Section */}
        <div className="flex-2">
          <h3 className="text-xl font-bold mb-4">Saved Blogs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedBlogs &&
              savedBlogs.map((blog: ISavedBlogs) => (
                <div
                  key={blog._id}
                  className="bg-white p-3 shadow border border-gray-300 cursor-pointer hover:bg-gray-100 relative"
                  onClick={() => (window.location.href = `/blog/${blog.slug}`)}
                >
                  <img
                    src={blog.thumbnail.url}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="text-lg font-semibold mt-2 line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-gray-900 mt-1 line-clamp-3">
                    {blog.highlight}
                  </p>

                  <div
                    className="absolute top-0 right-2 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaBookmark
                      onClick={() => {
                        if (user) {
                          dispatch(unsaveBlog(blog._id));
                        }
                      }}
                      size={23}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
