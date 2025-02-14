/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { Search, X as CloseIcon } from "lucide-react";
import Toast from "./Toast";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";

const AutoCompleteSearch = ({ searchType, onDataReceived, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toast, setToast] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const fetchOptions = useCallback(
    async (searchTerm) => {
      if (!searchTerm.trim()) {
        setOptions([]);
        return;
      }

      setLoading(true);
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        setToast({
          type: "error",
          message: "Authentication error: Please log in.",
        });
        setLoading(false);
        return;
      }

      try {
        const endpoint = `${BASE_URL}/api/Search/${
          searchType === "vehicle" ? "vehicles" : "drivers"
        }?searchWord=${searchTerm}`;
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = response.data.$values || [];
        setOptions(data);
        onDataReceived(data);

        if (data.length === 0) {
          setToast({ type: "warning", message: "No results found" });
        }
      } catch (error) {
        setToast({ type: "error", message: "Failed to fetch results" });
      } finally {
        setLoading(false);
      }
    },
    [searchType, onDataReceived]
  );

  useEffect(() => {
    if (!isTyping) return;

    const debounceTimer = setTimeout(() => {
      fetchOptions(inputValue);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, fetchOptions, isTyping]);

  const getOptionLabel = (option) => {
    if (!option) return "";
    const { make, model, regNumb, driverName, phone, dlNumb, fmsciNumb } =
      option;

    return searchType === "vehicle"
      ? `${make || "N/A"} ${model || "N/A"} (${regNumb || "N/A"})`
      : `${driverName} - ${phone || "N/A"} - DL:${dlNumb || "N/A"} - FMSCI:${
          fmsciNumb || "N/A"
        }`;
  };

  const handleOptionSelect = (option) => {
    setInputValue(getOptionLabel(option));
    onSelect(option);
    setShowDropdown(false);
    setIsTyping(false);
    setToast({
      type: "success",
      message: `${
        searchType === "vehicle" ? "Vehicle" : "Driver"
      } selected successfully`,
    });
  };

  const handleClear = () => {
    setInputValue("");
    setOptions([]);
    onSelect(null);
    setShowDropdown(false);
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
    setIsTyping(true);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`Search ${
            searchType === "vehicle" ? "Vehicles" : "Drivers"
          }...`}
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-2 space-x-1">
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" />
          ) : (
            <>
              {inputValue && (
                <button
                  onClick={handleClear}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <CloseIcon className="w-4 h-4 text-gray-500" />
                </button>
              )}
              {!inputValue && <Search className="w-4 h-4 text-gray-500 mr-2" />}
            </>
          )}
        </div>
      </div>

      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionSelect(option)}
              >
                {getOptionLabel(option)}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AutoCompleteSearch;
