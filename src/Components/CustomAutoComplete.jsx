import  { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CustomAutoComplete = () => {
    const options = ["One", "Two", "Three"];
    const [inputValue, setInputValue] = useState("");
    
    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  return (
<Autocomplete
      freeSolo
      options={filteredOptions}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Number" variant="outlined" fullWidth />
      )}
    />  )
}

export default CustomAutoComplete
