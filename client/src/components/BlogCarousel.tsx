import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Blog } from "../types";
import { blogData } from "../data/data";
import { useNavigate } from "react-router-dom";

const BlogCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto py-8">
      <Slider {...settings}>
        {blogData.map((blog : Blog) => (
          <div key={blog.id} className="px-1">
            <div className="bg-white shadow overflow-hidden">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium hover:underline mb-1 cursor-pointer line-clamp-1" onClick={() => navigate(`/blog/${blog.id}`)}>{blog.title}</h3>
                <p className="text-gray-500 text-sm mb-4">By {blog.author} | {blog.createdAt}</p>
                <span className="text-sm text-blue-600 font-medium p-1 border border-blue-600">{blog.category}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogCarousel;
