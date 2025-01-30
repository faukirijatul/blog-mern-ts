import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaSpinner, FaTrash, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { API_BASE } from "../../../constans";

interface Banner {
  _id: string;
  title: string;
  link: string;
  image: {
    url: string;
    public_id: string;
  };
}

const BannerManager: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/v1/banners`, { withCredentials: true });
      setBanners(response.data.banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Error fetching banners");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !title || !link) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/v1/banners`, {
        title,
        link,
        image,
      }, { withCredentials: true });
      if (banners.length === 0) {
        setBanners([response.data.banner]);
      } else {
        setBanners([...banners, response.data.banner]);
      }
      toast.success("Banner added successfully");
      setTitle("");
      setLink("");
      setImage(null);
    } catch (error) {
      console.error("Error adding banner:", error);
      toast.error("Failed adding banner");
    }
    setLoading(false);
  };

  const openDeleteModal = (id: string) => {
    setSelectedBannerId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBannerId(null);
  };

  const handleDelete = async () => {
    if (!selectedBannerId) return;

    try {
      await axios.delete(`${API_BASE}/api/v1/banners/${selectedBannerId}`, { withCredentials: true });
      setBanners(banners.filter((banner) => banner._id !== selectedBannerId));
      toast.success("Banner deleted successfully");
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed deleting banner");
    }

    closeModal();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-15">
      <h2 className="text-2xl font-bold mb-4">Banner Manager</h2>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter banner title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter banner link"
          />
        </div>

        {/* Custom Button for Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center w-full py-10 gap-2 bg-gray-200 border-gray-300 text-gray-900 px-4 rounded hover:bg-gray-300 transition cursor-pointer"
          >
            <FaUpload /> Select Banner Image
          </button>
        </div>

        {/* Image Preview */}
        {image && (
          <div className="my-2 border border-gray-300 p-2 bg-gray-100 flex justify-center">
            <img
              src={image}
              alt="Preview"
              className="max-w-[300px] w-full h-auto"
            />
          </div>
        )}

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg cursor-pointer mt-4 hover:bg-gray-100 disabled:opacity-50"
          disabled={loading}
        >
          {loading && <FaSpinner className="animate-spin" />}
          <span>Upload Banner</span>
        </button>
      </form>

      {/* Banner List */}
      <h3 className="text-xl font-semibold mb-4">Banners List</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.length > 0 ? (
          banners.map((banner) => (
            <div key={banner._id} className="bg-white shadow overflow-hidden">
              <img
                src={banner.image.url}
                alt={banner.title}
                className="w-full h-80 object-cover"
              />
              <div className="px-4 py-2">
                <h4 className="font-semibold">{banner.title}</h4>
                <a
                  href={banner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm block"
                >
                  {banner.link}
                </a>
                <button
                  onClick={() => openDeleteModal(banner._id)}
                  className="mt-3 flex items-center text-red-500 hover:text-red-700 transition cursor-pointer"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No banners available</p>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-xl w-80 mx-auto"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-100"
      >
        <h3 className="text-lg font-semibold mb-4">Delete Banner</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this banner?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BannerManager;
