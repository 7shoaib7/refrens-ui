import React, { useCallback, useEffect, useState } from 'react'
//mui-component
import { Grid } from '@mui/material';
//css
import "./Home.css"
//custom-component
import SelectFilter from '../../components/SelectFilter';
import useDebounce from '../../custom/debounce';
//constants
import { statusOptions, genderOptions, speciesOptions } from '../../constants/filterCharacterOptions';
import SearchTextField from '../../components/SearchTextField';

//services
import { getCharacters, getFilteredCharacters } from '../../services/rickAndMortyApi';
import CharacterCard from '../../components/CharacterCard';

const Home = () => {
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');
    const [species, setSpecies] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [characterData, setCharacterData] = useState([])


    const debouncedSearchValue = useDebounce(searchValue, 800);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };


    const fetchFilteredCharacterData = async () => {
        setLoader(true);
        try {
            const response = await getFilteredCharacters(debouncedSearchValue, status, species, gender,page);
            const result = response.results;

            if (page === 1) {
                setCharacterData(result);
            } else {
                setCharacterData((prev) => [...prev, ...result]);
            }
            setNotFound(false)
        } catch (err) {
            setNotFound(true)
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchFilteredCharacterData();
    }, [debouncedSearchValue, status, species, gender,page]);

    const handleInfiniteScroll =() => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            if (page < 42) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => window.removeEventListener('scroll', handleInfiniteScroll);
    }, [page]);


    return (
        <div className="home">
            <div className="home-filters">
                <SearchTextField
                    placeholder="Search Characters..."
                    value={searchValue}
                    onChange={handleChange}
                />
                <SelectFilter
                    label="Status"
                    value={status}
                    onChange={handleStatusChange}
                    options={statusOptions}

                />
                <SelectFilter
                    label="Gender"
                    value={gender}
                    onChange={handleGenderChange}
                    options={genderOptions}
                />
                <SelectFilter
                    label="Species"
                    value={species}
                    onChange={handleSpeciesChange}
                    options={speciesOptions}
                />
            </div>

            <div className="character-list">
                <Grid container spacing={2}>
                    {characterData.length ? characterData.map((cardData) => (
                        <Grid item xs={12} md={6} lg={4}>
                            <CharacterCard key={cardData.id} {...cardData} />
                        </Grid>
                    )) : null}

                </Grid>
            </div>
        </div>
    )
}

export default Home


