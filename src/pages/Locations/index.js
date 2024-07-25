import React, { useEffect, useState } from 'react';
// mui
import { Grid } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
// css
import "./Locations.css";
// components
import SearchTextField from '../../components/SearchTextField';
import useDebounce from '../../custom/debounce';
import LocationCard from '../../components/LocationCard';
import useInfiniteScroll from '../../custom/useInfiniteScroll';
// services
import { getFilteredLocations } from '../../services/rickAndMortyApi';




const Locations = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [locations, setLocations] = useState([]);
  const [loader, setLoader] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 800);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const fetchLocations = async () => {
    setLoader(true);
    try {
      const response = await getFilteredLocations(debouncedSearchValue,'','', page); // Update this function as needed
      const result = response.results;

      if (page === 1) {
        setLocations(result);
      } else {
        setLocations((prev) => [...prev, ...result]);
      }
      setNotFound(false);
      setTotalPages(response.info.pages);
    } catch (err) {
      setNotFound(true);
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [debouncedSearchValue, page]);

  useInfiniteScroll(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  });

  return (
    <div className="locations">
      <div className="locations-filter">
        <SearchTextField
          placeholder="Search location name..."
          value={searchValue}
          onChange={handleChange}
        />
      </div>
      <div className="locations-list">
        <Grid container spacing={2}>
          {locations.length ? locations.map((location) => (
            <Grid item xs={12} md={6} lg={4} key={location.id}>
              <LocationCard  {...location} /> {/* Create and use this component */}
            </Grid>
          )) : null}
        </Grid>
        {loader && <div className="loader"><CircularProgress color="warning" /></div>}
        {notFound && <div className="not-found">No locations found.</div>}
      </div>
    </div>
  );
}

export default Locations;
