/* eslint-disable no-unused-vars */
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
  IconButton,
} from "@mui/material";
import { BASE_URL } from "../constants/global-const";
import { X as CloseIcon } from "lucide-react";
import axios from "axios";

const AutoCompleteSearch = ({ searchType, onDataReceived, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [drivers, setDrivers] = useState(false);
  console.log("searchType", searchType);

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
            console.log("driver",);
            

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
        const passingValue = data.$values;

        onDataReceived(passingValue);

        setOptions(data.$values || []);
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
  }, [inputValue, searchType, onDataReceived]);

  const getOptionLabel = (option) => {
    if (!option) return "";
    const { make, model, regNumb, driverName, phone, dlNumb, fmsciNumb } =
      option;

    return searchType === "vehicle"
      ? `Make-${make ?? "N/A"}  Model-${model ?? "N/A"}  RegNo-${
          regNumb ?? "N/A"
        }`
      : `${driverName} - Ph:${phone ?? "N/A"} - DL:${
          dlNumb ?? "N/A"
        } - FMSCI: ${fmsciNumb ?? "N/A"}`;
  };

  const handleOptionSelect = async (event, value) => {
    if (value) {
      setSelectedItem(value);
      onSelect(value);
      setOpen(true);
      console.log("value",value);
      
    }
  };

  const handleClear = () => {
    setInputValue("");
    setOptions([]);
    onSelect(null);
  };

  const renderVehicleDetails = () => (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        Vehicle Details
      </Typography>
      <Typography>
        <strong>Make:</strong> {selectedItem.make}
      </Typography>
      <Typography>
        <strong>Model:</strong> {selectedItem.model}
      </Typography>
      <Typography>
        <strong>Registration Number:</strong> {selectedItem.regNumb}
      </Typography>
      <Typography>
        <strong>Chassis Number:</strong> {selectedItem.chasisNumb}
      </Typography>
      {selectedItem.engNumber && (
        <Typography>
          <strong>Engine Number:</strong> {selectedItem.engNumber}
        </Typography>
      )}
    </>
  );

  const renderDriverDetails = () => (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        Driver Details
      </Typography>
      <Typography>
        <strong>Name:</strong> {selectedItem.driverName}
      </Typography>
      <Typography>
        <strong>Phone:</strong> {selectedItem.phone}
      </Typography>
      <Typography>
        <strong>Email:</strong> {selectedItem.email}
      </Typography>
      <Typography>
        <strong>FMSCI Number:</strong> {selectedItem.fmsciNumb}
      </Typography>
      <Typography>
        <strong>DL Number:</strong> {selectedItem.dlNumb}
      </Typography>
      {selectedItem.teamName && (
        <Typography>
          <strong>Team:</strong> {selectedItem.teamName}
        </Typography>
      )}
    </>
  );

  return (
    <div>
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={getOptionLabel}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={handleOptionSelect}
        loading={loading}
        popupIcon={null}
        clearOnBlur={false}
        renderInput={(params) => {
          const { InputProps, ...rest } = params;

          const endAdornment = (
            <div style={{ display: "flex", alignItems: "center" }}>
              {loading && <CircularProgress size={20} />}
              {inputValue && (
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{ padding: "4px" }}
                >
                  <CloseIcon size={16} />
                </IconButton>
              )}
            </div>
          );

          return (
            <TextField
              {...rest}
              label={
                searchType === "vehicle" ? "Search Vehicles" : "Search Drivers"
              }
              variant="outlined"
              fullWidth
              InputProps={{
                ...InputProps,
                endAdornment: endAdornment,
              }}
            />
          );
        }}
      />

      {/* <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="details-modal-title"
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
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          {selectedItem && (
            <>
              {searchType === "vehicle"
                ? renderVehicleDetails()
                : renderDriverDetails()}
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => setOpen(false)}
                fullWidth
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal> */}
    </div>
  );
};

export default AutoCompleteSearch;
