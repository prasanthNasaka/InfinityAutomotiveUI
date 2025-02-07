/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { BASE_URL } from "../constants/global-const";

const AutoCompleteSearch = ({ searchType }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOptionClick = (event, value) => {
    if (value) {
      const vehicleData = options.find((v) =>
        searchType === "vehicle"
          ? `${v.make}, ${v.$id}` === value
          : `${v.driverName}, ${v.phone}, ${v.email}` === value
      );
      if (vehicleData) {
        setSelectedVehicle(vehicleData);
        setOpen(true);
      }
    }
  };

  useEffect(() => {
    if (!inputValue.trim()) {
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
        const endpoint =
          searchType === "vehicle"
            ? `${BASE_URL}/api/Search/vehicles?searchWord=${inputValue}`
            : `${BASE_URL}/api/Search/drivers?searchWord=${inputValue}`;

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);

        setOptions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("API Fetch Error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchOptions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [inputValue, searchType]);

  // Log options to see what is being passed to the Autocomplete
  console.log("Formatted Options for Autocomplete:", options.map((option) =>
    searchType === "vehicle"
      ? `${option.make}, ${option.$id}`
      : `${option.driverName}, ${option.phone}, ${option.email}`
  ));

  return (
    <div>
      <Autocomplete
        freeSolo
        options={options.map((option) =>
          searchType === "vehicle"
            ? `${option.make}, ${option.$id}`
            : `${option.driverName}, ${option.phone}, ${option.email}`
        )}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          console.log("Input Value:", newInputValue); // Log input value
        }}
        onChange={handleOptionClick}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              searchType === "vehicle" ? "Search Vehicles" : "Search Drivers"
            }
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: loading ? <CircularProgress size={20} /> : null,
            }}
          />
        )}
      />

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="vehicle-details-title"
        aria-describedby="vehicle-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedVehicle && (
            <>
              <Typography id="vehicle-details-title" variant="h6">
                Vehicle Details
              </Typography>
              <Typography>Make: {selectedVehicle.make}</Typography>
              <Typography>Model: {selectedVehicle.model}</Typography>
              <Typography>
                Registration Number: {selectedVehicle.regNumb}
              </Typography>
              <Typography>
                Chassis Number: {selectedVehicle.chasisNumb}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AutoCompleteSearch;
