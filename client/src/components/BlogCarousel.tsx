import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { getRandomBlogs, IRandomBlog } from "../store/slices/blogSlice";
import { useSelector } from "react-redux";
import { formatDate } from "../helper/formatDate";
import { capitalizeFirstLetter } from "../helper/capitalizeFirstLetter";

const BlogCarousel: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { random5Blogs } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(getRandomBlogs());
  }, [dispatch]);

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
        {random5Blogs.map((blog: IRandomBlog) => (
          <div key={blog._id} className="px-1">
            <div className="bg-white shadow overflow-hidden">
              <img
                src={blog.thumbnail.url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3
                  className="text-lg font-medium hover:underline mb-1 cursor-pointer line-clamp-1"
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                  title={blog.title}
                >
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  By {blog.authorData.name} | {formatDate(blog.createdAt)}
                </p>
                <span
                  className="text-sm px-4 py-2 font-medium border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/category/${blog.category}`)}
                >
                  {capitalizeFirstLetter(blog.category)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogCarousel;
