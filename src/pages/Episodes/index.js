import React, { useEffect, useState } from 'react'
//mui
import { Grid } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
//css
import "./Episodes.css"
//components
import SearchTextField from '../../components/SearchTextField';
import useDebounce from '../../custom/debounce';
//services
import { getFilteredEpisodes } from '../../services/rickAndMortyApi';
import EpisodeCard from '../../components/EpisodeCard';
import useInfiniteScroll from '../../custom/useInfiniteScroll';

const Episodes = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loader, setLoader] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 800);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };


  const fetchEpisodes = async () => {
    setLoader(true);
    try {
      const response = await getFilteredEpisodes(debouncedSearchValue, '', page);
      const result = response.results;

      if (page === 1) {
        setEpisodes(result);
      } else {
        setEpisodes((prev) => [...prev, ...result]);
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
    fetchEpisodes();
  }, [debouncedSearchValue, page]);



  useInfiniteScroll(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  });

  // console.log(episodes)

  return (
    <div className="episodes">
      <div className="episodes-filter">
        <SearchTextField
          placeholder="Search episode name..."
          value={searchValue}
          onChange={handleChange}
        />
      </div>
      <div className="episodes-list">
        <Grid container spacing={2}>
          {episodes.length ? episodes.map((episode) => (
            <Grid item xs={12} md={6} lg={4} key={episode.id}>
              <EpisodeCard  {...episode} />
            </Grid>
          )) : null}
        </Grid>
        {loader && <div className="loader"><CircularProgress color="warning" /></div>}
      </div>
    </div>
  )
}

export default Episodes