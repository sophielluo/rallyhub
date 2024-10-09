import React from "react";
import ProfilePic from "../Assets/mark-thompson.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading-testimonial">Hear from Our Customers</h1>
        {/* TODO: pull testimonials from database, display as sliding cards */}
        <p className="primary-text">
          See what players are saying about their RallyHub experience and why they keep coming back!
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
          Such an amazing discovery! I now have a great selection of available courts 
          in my area and the booking process is super easy. 
          Incredible that I get to access such great courts without having to 
          pay high initiation fees or ongoing monthly dues. Love it!
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Mark Thompson</h2>
      </div>
    </div>
  );
};

export default Testimonial;

