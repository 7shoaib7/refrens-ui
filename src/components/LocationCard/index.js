import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LocationCard.css";

const LocationCard = ({ id, name, type, dimension }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/location/${id}`);
    };

    return (
        <div className="location-card" onClick={handleCardClick}>
            <div className="location-card-content">
                <div className="location-card-details">
                    <h2 className="location-card-title">{name}</h2>
                    <div className="location-card-info">
                        <span className="location-card-type">Type: {type}</span>
                        <span className="location-card-dimension">Dimension: {dimension}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationCard;
