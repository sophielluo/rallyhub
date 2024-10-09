import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import SummaryBackground from '../Assets/summary-background.png';
import ConfirmationLogo from '../Assets/confirmed-tick.png';

const BookingSummaryPage = ({ location, clubName, date, time }) => {
    console.log(location, clubName, date, time);
    const navigate = useNavigate();

    return (
        <div className="booking-summary-container"
            style={{
                backgroundImage: `url(${SummaryBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="booking-summary-card">
                <div className="booking-summary-header">
                    <div className="booking-success-icon">
                        <img src={ConfirmationLogo} width="45px" alt="" />
                    </div>
                    <h2 className="booking-summary-title">Booking Confirmed</h2>
                    <p className="booking-summary-subtitle">Your court has been successfully booked!</p>
                </div>

                <div className="booking-details">
                    <div className="booking-detail-item">
                        <span className="booking-detail-label">Location</span>
                        <span className="booking-detail-value">{location}</span>
                    </div>
                    <div className="booking-detail-item">
                        <span className="booking-detail-label">Club</span>
                        <span className="booking-detail-value">{clubName}</span>
                    </div>
                    <div className="booking-detail-item">
                        <span className="booking-detail-label">Date</span>
                        <span className="booking-detail-value">{date}</span>
                    </div>
                    <div className="booking-detail-item">
                        <span className="booking-detail-label">Time</span>
                        <span className="booking-detail-value">{time}</span>
                    </div>
                </div>

                <Button
                    className="booking-summary-button"
                    onClick={() => navigate('/')}
                >
                    Back to Main Page
                </Button>
            </div>
        </div>
    );
};

export default BookingSummaryPage;