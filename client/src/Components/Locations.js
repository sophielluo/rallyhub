import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// TODO: pull from databse instead of hard code..
import club1 from "../Assets/club1.png";
import club2 from "../Assets/club2.png";
import club3 from "../Assets/club3.png";
import club4 from "../Assets/club4.png";
import club5 from "../Assets/club5.png";
import club6 from "../Assets/club6.png";
import club7 from "../Assets/club7.png";

const partners = [
    { name: "Club 1", logo: club1 },
    { name: "Club 2", logo: club2 },
    { name: "Club 3", logo: club3 },
    { name: "Club 4", logo: club4 },
    { name: "Club 5", logo: club5 },
    { name: "Club 6", logo: club6 },
    { name: "Club 7", logo: club7 },
];

const libraries = ['places'];

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 43.6532, // Toronto's latitude
    lng: -79.3832 // Toronto's longitude
};

const Locations = () => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) {
        console.error('Error loading Google Maps:', loadError);
        return <div>Error loading maps: {loadError.message}</div>;
    }

    return (
        <div className="locations-container">
            <h2 className="locations-heading">Our Partners</h2>
            <p className="locations-subheading">
                We have been working with the top tennis clubs and universities in Toronto!
            </p>
            <div className="partner-logos">
                {partners.map((partner, index) => (
                    <img
                        key={index}
                        src={partner.logo}
                        alt={partner.name}
                        className="partner-logo"
                    />
                ))}
            </div>
            <div className="locations-map-container">
                {/* <h3 className="locations-map-heading">Our Locations</h3> */}
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={12}
                    >
                        {/* TODO: add markers for top locatinos */}
                    </GoogleMap>
                ) : (
                    <div>Loading map...</div>
                )}
            </div>
        </div>
    );
};

export default Locations;