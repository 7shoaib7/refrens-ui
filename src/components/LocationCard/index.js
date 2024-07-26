import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LocationCard.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationCard = ({ id, name, type, dimension }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/location/${id}`);
    };

    const handleViewResidents = (e) => {
        e.stopPropagation();
        navigate(`/location/${id}/residents`);
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
                    <div className="location-card-residents" onClick={handleViewResidents}>
                        <LocationOnIcon className="location-card-icon" />
                        <span className="location-card-residents-title">View Residents</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationCard;
