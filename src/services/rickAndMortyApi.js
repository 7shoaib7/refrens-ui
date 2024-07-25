import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

// Helper function for making API requests
const fetchFromApi = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};


/*-----CHARACTER-----*/ 

// Get all characters with optional filters and pagination
export const getCharacters = async (filters = {}, page = 1) => {
  const query = new URLSearchParams({ ...filters, page }).toString();
  return fetchFromApi(`character?${query}`);
};

// Get a single character by ID
export const getCharacterById = async (id) => {
  return fetchFromApi(`character/${id}`);
};

// Get multiple characters by IDs
export const getCharactersByIds = async (ids) => {
    const idsParam = Array.isArray(ids) ? ids.join(',') : ids;
    return fetchFromApi(`character/${idsParam}`);
  };
  


  /*-----EPISODE-----*/ 

// Get all episodes with optional filters and pagination
export const getEpisodes = async (filters = {}, page = 1) => {
  const query = new URLSearchParams({ ...filters, page }).toString();
  return fetchFromApi(`episode?${query}`);
};

// Get a single episode by ID
export const getEpisodeById = async (id) => {
  return fetchFromApi(`episode/${id}`);
};

// Get multiple episodes by IDs or array
export const getEpisodesByIds = async (ids) => {
    const idsParam = Array.isArray(ids) ? ids.join(',') : ids;
    return fetchFromApi(`episode/${idsParam}`);
  };
  

   /*-----LOCATION----*/ 

// Get all locations with optional filters and pagination
export const getLocations = async (filters = {}, page = 1) => {
  const query = new URLSearchParams({ ...filters, page }).toString();
  return fetchFromApi(`location?${query}`);
};

// Get a single location by ID
export const getLocationById = async (id) => {
  return fetchFromApi(`location/${id}`);
};

// Get multiple locations by IDs or array
export const getLocationsByIds = async (ids) => {
    const idsParam = Array.isArray(ids) ? ids.join(',') : ids;
    return fetchFromApi(`location/${idsParam}`);
  };
  

/*-----Filters with pagination------*/

// Filters for characters
export const getFilteredCharacters = async (name, status, species, gender, page = 1) => {
  const filters = { name, status, species, gender };
  return getCharacters(filters, page);
};

// Filters for locations
export const getFilteredLocations = async (name, type, dimension, page = 1) => {
  const filters = { name, type, dimension };
  return getLocations(filters, page);
};

// Filters for episodes
export const getFilteredEpisodes = async (name, episode, page = 1) => {
  const filters = { name, episode };
  return getEpisodes(filters, page);
};
