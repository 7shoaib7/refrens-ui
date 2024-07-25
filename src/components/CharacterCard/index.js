import React from 'react'
import "./CharacterCard.css"

const CharacterCard = ({ name, status, species, location, image }) => {
    return (
        <div className="character-card">
            <div className="character-card-img-box">
                <img src={image} alt="card-image" className="card-image" />
            </div>
            <div className="character-card-description">
                <div className="card-title">
                    <h2 className="card-name">{name}</h2>
                    <div className="card-status-species">
                        <div className="card-status-icon" style={{
                            height: "0.5rem",
                            width: "0.5rem",
                            backgroundColor: status === "Alive" ? 'rgb(85, 204, 68)' : status === "Dead" ? 'rgb(214, 61, 46)' : "rgb(158, 158, 158)",
                            borderRadius: "50%"
                        }}
                        ></div>
                        <span className="card-status">{status} -</span>
                        <span className='card-species'>{species}</span>
                    </div>
                </div>
                <div className='character-card-location'>
                    <span className='card-location'>Last known location:</span>
                    <span className='card-location-name'>{location?.name}</span>
                </div>
            </div>
        </div>
    )
}

export default CharacterCard