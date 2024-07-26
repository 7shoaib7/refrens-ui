import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./EpisodeCard.css";
import PeopleIcon from '@mui/icons-material/People';

const EpisodeCard = ({ id, name, episode,air_date }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/episode/${id}`);
    };

    const handleViewCharacters = (e) => {
        e.stopPropagation();
        navigate(`/episode/${id}`);
    };


    return (
        <div className="episode-card" onClick={handleCardClick}>
            <div className="episode-card-content">
                <div className="episode-card-details">
                    <h2 className="episode-card-title">{name}</h2>
                    <div className="episode-card-info">
                        <span className="episode-card-type">Episode: {episode}</span>
                        <span className="episode-card-dimension">Air Date: {air_date}</span>
                    </div>
                    <div className="episode-card-residents" onClick={handleViewCharacters}>
                        <PeopleIcon className="episode-card-icon" />
                        <span className="episode-card-residents-title">View Characters</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpisodeCard;
