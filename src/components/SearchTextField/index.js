import React from 'react';
//mui-component
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchTextField = ({
  placeholder = "Search...",
  value,
  onChange,
  ...otherProps
}) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: "3rem",
          '&.Mui-focused fieldset': {
            borderColor: 'rgb(255, 152, 0)',
          },
        },
      }}
      {...otherProps}
    />
  );
};

export default SearchTextField;
