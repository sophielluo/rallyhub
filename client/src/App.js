import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import AuthPage from "./Components/AuthPage"; 
import BookingPage from "./Components/BookingPage"; 
import BookingSummaryPage from "./Components/BookingSummaryPage"; 
import Locations from "./Components/Locations"; 
import { AuthProvider } from './Components/AuthContext';
import { useLocation } from 'react-router-dom';

function App() {
  const SummaryPageWrapper = () => {
    const location = useLocation();
    return <BookingSummaryPage {...location.state} />;
  };

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <div id="home"><Home /></div>
            <div id="locations"><Locations /></div>
            <div id="about-us"><About /></div>
            <div id="how-it-works"><Work /></div>
            <div id="testimonial"><Testimonial /></div>
            <div id="faq"><Contact /></div>
            <Footer />
          </div>
        } />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/summary" element={<SummaryPageWrapper />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
