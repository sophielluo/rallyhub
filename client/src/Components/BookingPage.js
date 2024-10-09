import React, { useState, useEffect } from 'react';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Components/ui/select';
import { useAuth } from '../Components/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import TennisBackground from "../Assets/tennis-court-background.jpg";
import BookingSummaryPage from './BookingSummaryPage';

const BookingPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [club, setClub] = useState('');
  const [municipalities, setMunicipalities] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [loadingText, setLoadingText] = useState('Booking');
  const [loadingDots, setLoadingDots] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMunicipalities();
  }, []);

  useEffect(() => {
    if (location) {
      fetchClubs(location);
    }
    setClub('');
  }, [location]);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots(prev => prev.length < 3 ? prev + '.' : '');
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!user) {
      // user not authenticated: redirect to auth page
      navigate('/auth', { state: { returnTo: '/booking' } });
    }
  }, [user, navigate]);

  // user not authenticated: don't render the booking form
  if (!user) {
    navigate('/');
    return;
  }

  const handleLocationChange = (value) => {
    console.log("Selected location:", value);
    console.log("Selected location:", getLocationName(value));
    setLocation(value);
    if (value) {
      fetchClubs(value);
    } else {
      setClubs([]);
    }
  };

  const fetchMunicipalities = async () => {
    try {
      const response = await fetch('/api/municipalities');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched municipalities:', data);
      setMunicipalities(data);
    } catch (error) {
      console.error('Error fetching municipalities:', error);
      toast.error('Failed to load locations. Please try again.');
    }
  };

  const fetchClubs = async (municipalityId) => {
    try {
      const response = await fetch(`/api/clubs?municipalityId=${municipalityId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      toast.error('Failed to load clubs. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // TODO: loading... (API call here)
    setTimeout(() => {
      const summaryData = {
        location: getLocationName(location),
        clubName: getClubName(club),
        date,
        time
      };
  
      setBookingSummary(summaryData); 
      setIsLoading(false);
      toast.success('Booking confirmed! Redirecting to summary...');
  
      navigate('/summary', { 
        state: summaryData 
      });
    }, 2100);
  };

  const getLocationName = (id) => {
    if (!id) return "Select a location";
    const municipality = municipalities.find(m => m.id === parseInt(id));
    return municipality ? municipality.name : "Select a location";
  };

  const getClubName = (id) => {
    if (!id) return "Select a club";
    const selectedClub = clubs.find(c => c.id === parseInt(id));
    return selectedClub ? selectedClub.name : "Select a club";
  };

  return (
    <div
      className="booking-page-container"
      style={{
        backgroundImage: `url(${TennisBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {bookingSummary ? (
        <BookingSummaryPage {...bookingSummary} />
      ) : (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="booking-background"></div>
          <h1 style={{ color: '#fcf9f2' }}>Book Your Court</h1>
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <Select onValueChange={handleLocationChange} value={location}>
                <SelectTrigger className="select-trigger">
                  {getLocationName(location)}
                </SelectTrigger>
                <SelectContent className="select-content">
                  {municipalities.map((municipality) => (
                    <SelectItem className="select-item" key={municipality.id} value={municipality.id.toString()}>
                      {municipality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="club">Club</label>
              <Select onValueChange={setClub} value={club} disabled={!location}>
                <SelectTrigger className="select-trigger">
                  {getClubName(club)}
                </SelectTrigger>
                <SelectContent className="select-content">
                  {clubs.length > 0 ? (
                    clubs.map((club) => (
                      <SelectItem key={club.id} value={club.id}>
                        {club.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-clubs" disabled>
                      No Clubs are available yet, stay tuned!
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="primary-button"
              disabled={isLoading || !club}
            >
              {isLoading ? `${loadingText}${loadingDots}` : 'Book Now'}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default BookingPage;