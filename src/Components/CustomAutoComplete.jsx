import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const BASE_URL = "https://c4pfntkn-7206.inc1.devtunnels.ms"; 

const AutoCompleteSearch = () => {
  const [inputValue, setInputValue] = useState(""); 
  const [options, setOptions] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 


  useEffect(() => {
    if (!inputValue) {
      setOptions([]); 
      return;
    }

    const fetchOptions = async () => {
      setLoading(true);
      setError(""); 

      const authToken = localStorage.getItem("authToken");
     

      if (!authToken) {
        
        setError("Authentication error: Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/Search/vehicles?searchWord=${inputValue}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          setError("Unauthorized: Please log in again.");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);

        if (data && data.$values) {
          setOptions(data.$values);
        } else {
          console.warn("No vehicle data found in response.");
          setOptions([]); 
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setError("Error fetching data. Please try again.");
      }

      setLoading(false);
    };


    const debounce = setTimeout(fetchOptions, 300);
    return () => clearTimeout(debounce);
  }, [inputValue]);

  return (
    <div>
      <Autocomplete
        freeSolo
        options={options.map((option) => `${option.make} `)} 
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        loading={loading} 
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Vehicles"
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: loading ? <span>Loading...</span> : null, 
            }}
          />
        )}
      />
    </div>
  );
};

export default AutoCompleteSearch;
