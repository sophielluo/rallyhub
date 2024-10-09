import React from "react";
import DiscoverImage from "../Assets/discover.png";
import BookImage from "../Assets/book.png";
import EnjoyImage from "../Assets/enjoy.png";

const Work = () => {
  const workInfoData = [
    {
      image: DiscoverImage,
      title: "Discover",
      text: "Search for nearby courts in seconds.",
    },
    {
      image: BookImage,
      title: "Book",
      text: "Reserve your court instantly, no hassle.",
    },
    {
      image: EnjoyImage,
      title: "Enjoy",
      text: "Show up, play, and have fun!",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">How It Works</p>
        <h1 className="primary-heading">3 Simple Steps!</h1>
        <p className="primary-text">
          Find your ideal club and book your preferred time with ease through RallyHub. 
          Get ready to play—no commitments or fees, just pure tennis fun!
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
