import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Autocomplete, Box } from "@mui/material";
import { fetchWeatherData } from "../features/weatherSlice";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async (city) => {
    if (city) {
      dispatch(fetchWeatherData(city));
    }
  };

  return (

    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "20px auto",
        background: "rgba(18, 18, 18, 0.6)",
        borderRadius: "20px",
        border: "1px solid rgba(79,195,247,0.15)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 20px rgba(79,195,247,0.15)",
        p: 1.5,
      }}
    >
      <Autocomplete
        freeSolo
        options={options}
        inputValue={searchInput}
        onInputChange={(event, newValue) => setSearchInput(newValue)}
        onChange={(event, value) => handleSearch(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a city"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#e0e0e0",
                backgroundColor: "rgba(30, 30, 30, 0.7)",
                borderRadius: "12px",
                "& fieldset": {
                  borderColor: "rgba(79,195,247,0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(79,195,247,0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4fc3f7",
                  boxShadow: "0 0 10px rgba(79,195,247,0.3)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#90a4ae",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#4fc3f7",
              },
            }}
          />
        )}
      />
    </Box>


  );
};

export default SearchBar;
