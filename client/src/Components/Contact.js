import React, { useState, useEffect } from "react";
import Popup from "./Popup";

const Contact = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Loading...
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setEmail('');
    setSubmitMessage('Email submitted successfully!');
    setIsPopupOpen(true);
  };

  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <form onSubmit={handleSubmit} className="contact-form-container">
        <input
          type="email"
          placeholder="yourmail@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="secondary-button"
          disabled={isSubmitting}
        > 
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
      {submitMessage && <p className="submit-message">{submitMessage}</p>}
      
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2>Thank you!</h2>
        <p>We will get back to you shortly!</p>
      </Popup>
    </div>
  );
};

export default Contact;