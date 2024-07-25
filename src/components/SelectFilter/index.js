import React from 'react';
//mui-components
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectFilter = ({ label, value, onChange, options,  ...otherProps }) => {
    return (
        <FormControl fullWidth>
            <InputLabel
                sx={{
                    '&.Mui-focused': {
                        color: 'rgb(255, 152, 0)',
                    },
                    zIndex: 0,
                }}
            >
                {label}
            </InputLabel>
            <Select
                value={value}
                onChange={onChange}
                label={label}
                sx={{
                    height: "3rem",
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(255, 152, 0)',
                    },
                    zIndex: 0
                }}
                {...otherProps}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectFilter;
