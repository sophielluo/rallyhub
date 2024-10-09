import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import BannerImage2 from "../Assets/home-banner-image2.png";
import BannerImage3 from "../Assets/home-banner-image3.png";
import BannerImage4 from "../Assets/home-banner-image4.png";
import Navbar from "./Navbar";
import ScrollingBanner from "./ScrollingBanner";


const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const bannerImages = [
    BannerImage, BannerImage2, BannerImage3, BannerImage4
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBookNowClick = () => {
    console.log("user: " + user);
    if (user) {
      console.log("user authenticated");
      // User is authenticated: navigate to booking page
      navigate('/booking');
    } else {
      console.log("user not authenticated");
      // User is not authenticated: navigate to auth page
      navigate('/auth', { state: { returnTo: '/booking' } });
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-content">
          <div className="home-text-section">
            <h1 className="primary-heading">
              Where the Grind
              Meets the Vibe.
            </h1>
            <p className="primary-text">
              Access top tier tennis & pickleball clubs in your area with ease.
              Book a court with us today!
            </p>
            <button className="secondary-button" 
              onClick={handleBookNowClick}>
              Book Now <FiArrowRight />{" "}
            </button>
          </div>
          <div className="home-image-section">
            <ScrollingBanner 
              images={bannerImages} 
              onImageChange={setCurrentImageIndex}
            />
          </div>
        </div>
      </div>
      <div className="banner-dots">
        {bannerImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;