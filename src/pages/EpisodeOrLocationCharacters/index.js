import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getCharactersByIds, getEpisodeById, getLocationById } from '../../services/rickAndMortyApi';
//mui
import CircularProgress from '@mui/joy/CircularProgress';
import { Grid } from '@mui/material';
//css
import './EpisodeOrLocationCharacters.css';
import CharacterCard from '../../components/CharacterCard';


const EpisodeOrLocationCharacters = () => {
  const { id } = useParams();
  const location = useLocation();
  const [characterData, setCharacterData] = useState([]);
  const [locationDetails,setLocationDetails] = useState(null);
  const [episodeDetails,setEpisodeDetails] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch details of all character
  const fetchAllCharacters = async (allCharacters) => {
    try {
      const responses = await getCharactersByIds(allCharacters)
      return responses;
    } catch (err) {
      console.error("Error fetching all episodes:", err);
      throw err;
    }
  }


  const fetchData = async () => {
    try {
      let response;
      let allCharacters
      if (location.pathname.includes('/episode')) {
        response = await getEpisodeById(id);
        setEpisodeDetails(response)
        allCharacters = response?.characters?.map(url =>
          url.split('/').pop()
        ) || [];
      } else if (location.pathname.includes('/location')) {
        response = await getLocationById(id);
        setLocationDetails(response)
        allCharacters = response?.residents?.map(url =>
          url.split('/').pop()
        ) || [];
      } else {
        throw new Error('Unknown path');
      }

      const finalCharacters = await fetchAllCharacters(allCharacters)

      const finalData = Array.isArray(finalCharacters) ? finalCharacters : [finalCharacters]

      if (finalData.length) {
        const final = finalData.map((item) => {
          delete item.episode
          return item
        })
        setCharacterData(final)
      }

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchData();
  }, [id, location.pathname]);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress color="warning" />
      </div>
    );
  }
  if (error) {
    return <div>Error fetching details.</div>;
  }

  return (
    <div className="characters-detail-page">
      <div className="location-episode-desc">
          {locationDetails && <h1>{locationDetails.name}</h1>}
          {episodeDetails && <h1>{episodeDetails.name} - {episodeDetails.episode}</h1>}
      </div>
      <div className="character-list">
        <Grid container spacing={2}>
          {characterData.length ? characterData.map((cardData) => (
            <Grid item xs={12} md={6} lg={4} key={cardData.id}>
              <CharacterCard  {...cardData} />
            </Grid>
          )) : null}
        </Grid>
      </div>
    </div>
  );
};

export default EpisodeOrLocationCharacters;
