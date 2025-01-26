import React from "react";
import BlogCarousel from "../../components/BlogCarousel";
import LatestAndMostPopular from "./LatestAndMostPopular";
import BlogList from "../blogList/BlogList";
import Footer from "../../components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <div className="px-2 md:px-8 xl:px-30 space-x-2 my-5 mt-20">
        <BlogCarousel />
        <LatestAndMostPopular />
        <BlogList />
      </div>

      <Footer />
    </>
  );
};

export default Home;
