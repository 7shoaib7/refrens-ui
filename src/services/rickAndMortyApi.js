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

// Get all characters with optional filters and pagination
export const getCharacters = async (filters = {}, page = 1) => {
  const query = new URLSearchParams({ ...filters, page }).toString();
  return fetchFromApi(`character?${query}`);
};

// Get a single character by ID
export const getCharacterById = async (id) => {
  return fetchFromApi(`character/${id}`);
};

// Get all episodes with optional filters and pagination
export const getEpisodes = async (filters = {}, page = 1) => {
  const query = new URLSearchParams({ ...filters, page }).toString();
  return fetchFromApi(`episode?${query}`);
};

// Get a single episode by ID
export const getEpisodeById = async (id) => {
  return fetchFromApi(`episode/${id}`);
};

// Get all locations with optional filters and pagination
export const getLocations = async (filters = {}, page = 1) => {
  const query = new URLSearchParams({ ...filters, page }).toString();
  return fetchFromApi(`location?${query}`);
};

// Get a single location by ID
export const getLocationById = async (id) => {
  return fetchFromApi(`location/${id}`);
};

//filters with pagination

// Filters for characters
export const getFilteredCharacters = async (name, status, species, type, gender, page = 1) => {
  const filters = { name, status, species, type, gender };
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
