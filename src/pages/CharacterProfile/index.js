import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
//mui
import CircularProgress from '@mui/joy/CircularProgress';
//css
import "./CharacterProfile.css"
//services
import { getCharacterById, getEpisodesByIds, getLocationById } from '../../services/rickAndMortyApi';

const CharacterProfile = () => {
    const { id } = useParams()
    const [profileData, setProfileData] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [episodesData, setEpisodesData] = useState([]);
    const [loading, setLoading] = useState(true); 


    // Fetch details of all episodes
    const fetchAllEpisodes = async (episodeNumbers) => {
        try {
            const responses = await getEpisodesByIds(episodeNumbers)
            return responses;
        } catch (err) {
            console.error("Error fetching all episodes:", err);
            throw err;
        }
    }


    // Fetch details of the current location
    const fetchLocationDetails = async (locationId) => {
        try {
            const response = await getLocationById(locationId);
            return response;
        } catch (err) {
            console.error("Error fetching location details:", err);
            throw err;
        }
    }

    // Main function to fetch character details and related info
    const fetchCharacterDetails = async () => {
        setLoading(true);  
        try {
            // Fetch character data
            const response = await getCharacterById(id);
            setProfileData(response)

            // Extract IDs
            const locationId = response?.location?.url ?
                response.location.url.split('/').pop() : null;

            const episodeNumbers = response?.episode?.map(url =>
                url.split('/').pop()
            ) || [];



            // Fetch additional details in parallel
            const [episodeResponses, locationResponse] = await Promise.all([
                episodeNumbers.length > 0 ? fetchAllEpisodes(episodeNumbers) : Promise.resolve([]),
                locationId ? fetchLocationDetails(locationId) : Promise.resolve(null),
            ]);

            //    console.log("location",locationResponse)
            //    console.log("episode",episodeResponses)

            const allEpisodeData = Array.isArray(episodeResponses) ? episodeResponses : [episodeResponses]

            if (locationResponse !== null) {
                const locationData = {
                    ...locationResponse,
                    residents: locationResponse.residents.length
                }
                setLocationData(locationData)
            }


            if (allEpisodeData.length) {
                const allEpisodes = allEpisodeData.map((ep) => {
                    delete ep.characters
                    return ep
                })
                setEpisodesData(allEpisodes)
            }        

        } catch (err) {
            console.error("Error fetching character details:", err);
        }
        finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        fetchCharacterDetails()
    }, [id])

    if (loading) {
        return (
            <div className="loading-container">
                <CircularProgress color="warning" />
            </div>
        );
    }


    return (
        <div className="character-profile">
            <div className="profile-header">
                <div className="profile-image">
                    <img src={profileData?.image} alt={profileData?.name} />
                </div>
                <div className="profile-info">
                    <h1>{profileData?.name}</h1>
                    <p><strong>Species:</strong> {profileData?.species}</p>
                    <p><strong>Gender:</strong> {profileData?.gender}</p>
                </div>
            </div>
            <div className="location-info">
                <h2>Location Details</h2>
                <p><strong>Name:</strong> {locationData?.name}</p>
                <p><strong>Dimension:</strong> {locationData?.dimension}</p>
                <p><strong>Residents:</strong> {locationData?.residents}</p>
            </div>
            <div className="episodes">
                <h2>Episodes</h2>
                <div className="chips">
                    {episodesData.length === 0 ? (
                        <p className="no-episodes-message">No episodes found for this character.</p>
                    ) : (
                        <div className="chips">
                            {episodesData.map(episode => (
                                <div className="chip" key={episode.id}>
                                    {episode.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CharacterProfile