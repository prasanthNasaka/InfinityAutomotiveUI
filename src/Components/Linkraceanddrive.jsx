/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { LuBike } from "react-icons/lu";
import Newheader from "./Newheader";
import MainSideBar from "./MainSideBar";
import AutoCompleteSearch from "./CustomAutoComplete";
import { BASE_URL, IMAGE_URL } from "../constants/global-const";
import toast, { Toaster } from "react-hot-toast";
import { HandCoins, Trash, X } from "lucide-react";
import axios from "axios";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import Styles from "../constants/Styles";
import { GiTakeMyMoney } from "react-icons/gi";

const Linkraceanddrive = () => {
  const [amountPaidChecked, setAmountPaidChecked] = useState(false);

  const [driverData, setDriverData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState([]);
  const [driverimageUrl, setDriverImageUrl] = useState("");
  const [vehicleimageUrl, setVehicleImageUrl] = useState("");
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [DrvtableData, setDrvTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [eventId, setEventId] = useState(false);
  const [regId, setRegId] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [paymentReference, setPaymentReference] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [addDocVerify, setAddDocVerify] = useState(98);
  const [deletePop, setDeletePop] = useState(false);
  const [entryPrice, setEntryPrice] = useState(null);
  const [updatedContestantNumbers, setUpdatedContestantNumbers] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  });
  const filteredData = tableData.filter((event) =>
    Object.values(event).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.direction === "none") return 0; // No sorting

    const key = sortConfig.key;
    if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // const requestSort = (key) => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSortConfig({ key, direction });
  // };

  const SortingIcon = ({ direction }) => {
    if (direction === "none") {
      return <FaSort className="w-4 h-4 ms-1" />;
    } else if (direction === "asc") {
      return <FaSortUp className="w-4 h-4 ms-1" />;
    } else if (direction === "desc") {
      return <FaSortDown className="w-4 h-4 ms-1" />;
    }
  };

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = "none";
    }
    setSortConfig({ key, direction });
  };

  const getPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 2; // Number of pages to show around the current page

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages = [1];

      let start = Math.max(2, currentPage - maxVisiblePages);
      let end = Math.min(totalPages - 1, currentPage + maxVisiblePages);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(DrvtableData.map((event) => event.regId));
    }
    setSelectAll(!selectAll);
  };

  const handleAmountPaidChange = (e) => {
    setAmountPaidChecked(e.target.checked);
    if (!e.target.checked) {
      setReferenceNumber("");
    }
  };

  const handleEventChange = (event) => {
    const selectedEventId = event.target.value;
    setEventId(selectedEventId);
    setSelectedEvent(selectedEventId);
    setSelectedCategory(""); // Reset category on event change
    setEntryPrice(null); // Reset entry price on event change
    setTableData([]);

    if (selectedEventId) {
      fetch(`${BASE_URL}/api/eventcategories?event_id=${selectedEventId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCategories(data);
          } else {
            setCategories([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching event categories:", error);
          setCategories([]);
        });

      fetch(`${BASE_URL}/api/Registration/event/${selectedEventId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setTableData(data);
          } else {
            setTableData([]);
          }
        })
        .catch((error) => console.error("Error fetching table data:", error));
    } else {
      setCategories([]);
      setTableData([]);
    }
  };

  const deletePopup = () => {
    setDeletePop(true);
  };

  const deletePopClose = () => {
    setDeletePop(false);
  };

  const Popup = () => {
    setIsOpen(true);
    console.log("eventId", eventId);
    localStorage.setItem("regId", eventId);
    handlePopUp(eventId);
  };

  const Close = () => {
    setIsOpen(false);
    localStorage.removeItem("regId");
  };

  const handleCategoryChange = (event) => {
    const selectedCatId = event.target.value;
    setSelectedCategory(selectedCatId);

    // Find the selected category and get entry price
    const selectedCategoryData = categories.find(
      (cat) => cat.evtCatId === Number(selectedCatId)
    );

    if (selectedCategoryData) {
      setEntryPrice(selectedCategoryData.entryprice);
    } else {
      setEntryPrice(null);
    }
  };

  const handleDataReceived = (type, data) => {
    if (type === "driver") {
      setDriverData(data);
    } else if (type === "vehicle") {
      setVehicleData(data);
    }
  };

  const handleSelect = (type, item) => {
    if (type === "driver") {
      const FilteredDrvData = tableData.filter(
        (d) => d.driverId === item.driverId
      );
      console.log("Filtered Table Data:", FilteredDrvData);

      setDrvTableData(FilteredDrvData);
      setSelectedDriver(item);

      const selectedIdsFromStatus = FilteredDrvData.filter(
        (d) => d.documentStatus === 98
      ).map((d) => d.regId);

      setSelectedIds(selectedIdsFromStatus);

      setDriverImageUrl(
        item.driverPhoto ? `${IMAGE_URL}${item.driverPhoto}` : null
      );
    } else if (type === "vehicle") {
      setSelectedVehicle(item);
      setVehicleImageUrl(
        item.vehiclePhoto ? `${IMAGE_URL}${item.vehiclePhoto}` : null
      );
    }
  };

  const numberInput = (e) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setValue(inputValue);
      setError("");
    } else if (inputValue.length > 3) {
      setError("Maximum 3 digits");
    } else {
      setError("Only numbers are accepted");
    }
  };

  const isFormValid = () => {
    return (
      selectedEvent &&
      selectedCategory &&
      selectedDriver &&
      selectedVehicle &&
      // addDocVerify &&
      amountPaidChecked &&
      (!amountPaidChecked || (amountPaidChecked && referenceNumber)) && // Only need ref number if checked
      !error
    );
  };

  const handleCheckboxChange = (regId) => {
    setSelectedIds((prev) =>
      prev.includes(regId)
        ? prev.filter((id) => id !== regId)
        : [...prev, regId]
    );

    setSelectAll(false);
  };

  const AmountRefund = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one record.");
      return;
    }

    const payload = selectedIds;

    try {
      const response = await fetch(
        `${BASE_URL}/api/Registration/AmountRefund`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Refund successful!");
        setSelectedIds([]);
        setDrvTableData([]);
        await fetchUpdatedData();
      } else {
        throw new Error("Refund failed.");
      }
    } catch (error) {
      console.error("Error at Refund:", error);
      toast.error("Refund failed!");
    }
  };

  const AmountPaidForSelected = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one record.");
      return;
    }

    const payload = {
      refNumb: paymentReference, // ✅ Correctly checks for an entered reference number
      regId: selectedIds,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/api/Registration/AmountPaid`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Amount status updated successfully!");
      setSelectedIds([]);
      setPaymentReference(""); // ✅ Clears input after submission
      setDrvTableData([]);
      await fetchUpdatedData();
    } catch (error) {
      toast.error(
        `Failed to update amount status! ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const DeleteTable = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one record to delete.");
      return;
    }

    const payload = selectedIds;

    try {
      const response = await fetch(`${BASE_URL}/api/Registration`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Records deleted successfully!");
        setSelectedIds([]);
        setDrvTableData([]);
        await fetchUpdatedData();
      } else {
        throw new Error("Failed to delete records.");
      }
    } catch (error) {
      console.error("Error deleting records:", error);
      toast.error("Delete failed!");
    }
  };

  const ContestentUpdate = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one record.");
      return;
    }

    const payload = selectedIds.map((id) => ({
      regId: id,
      contestNo: updatedContestantNumbers[id] ?? "",
    }));

    try {
      const response = await axios.put(
        `${BASE_URL}/api/Registration/ContestNo`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Contestant number updated successfully!");

      // Reset state
      setSelectedIds([]);
      setDrvTableData([]);
      setUpdatedContestantNumbers((prev) => {
        const updatedState = { ...prev };
        selectedIds.forEach((id) => {
          updatedState[id] = "";
        });
        return updatedState;
      });
      await fetchUpdatedData();
    } catch (error) {
      toast.error(
        `Failed to update contestant number! ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleContestantChange = (regId, value) => {
    setUpdatedContestantNumbers((prev) => ({
      ...prev,
      [regId]: value,
    }));
    console.log("handleContestantChange", handleContestantChange);
  };

  const DocumentVerify = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one record.");
      return;
    }

    const payload = selectedIds;

    try {
      const response = await fetch(`${BASE_URL}/api/Registration/DocVerified`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Documents verified successfully!");
        setSelectedIds([]);
        setDrvTableData([]);
        await fetchUpdatedData();
      } else {
        throw new Error("Document verification failed.");
      }
    } catch (error) {
      console.error("Error verifying documents:", error);
      toast.error("Document verification failed!");
    }
  };

  const handleGetData = () => {
    fetch(`${BASE_URL}/api/EventRegistration`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.$values)) {
          setEvents(data.$values);
        } else {
          setEvents([]);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  };

  const handlePopUp = () => {
    const storedRegId = localStorage.getItem("regId");
    console.log("Stored regId:", storedRegId);

    if (storedRegId) {
      fetch(`${BASE_URL}/api/Registration/ContestentNo?EventId=${storedRegId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          setRegId(data.$values);
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        vechId: parseInt(selectedVehicle?.vehicleId) || 0,
        driverId: parseInt(selectedDriver?.driverId) || 0,
        eventId: parseInt(selectedEvent) || 0,
        eventcategoryId: parseInt(selectedCategory) || 0,
        contestantNo: parseInt(value) || 0,
        amountPaid: amountPaidChecked ? 92 : 91, // Map to 92 for paid, 91 for pending
        referenceNo: referenceNumber || "",
        scrutinyStatus: 15, //15 pending 16 approved 17 rejected 18 N/A
        documentStatus: parseInt(addDocVerify) || 98, //97 pending 98 verified
      };
      console.log("payload", payload);

      const response = await axios.post(
        `${BASE_URL}/api/Registration`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Successfully added");
        console.log("response", response);

        // await setTableData(response);
      }

      setSelectedCategory("");
      setSelectedDriver([]);
      setSelectedVehicle([]);
      setValue("");
      setAmountPaidChecked(false);
      setAddDocVerify(0);
      setReferenceNumber();
      setVehicleImageUrl("");
      setDriverImageUrl("");
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUpdatedData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/EventRegistration/ActiveEvents`
      );
      const data = await response.json();

      console.log("Fetched Data:", data); // Ensure data is logged

      if (Array.isArray(data)) {
        setEvents(data);
      } else if (data && Array.isArray(data.events)) {
        setEvents(data.events); // ✅ Handles nested event data
      } else {
        console.error("Unexpected data format:", data);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchUpdatedData();
  }, [regId, selectedIds, updatedContestantNumbers]);

  return (
    <section className="w-full h-screen flex flex-col">
      <div className=" overflow-y-hidden shadow-lg ">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-1rem)] overflow-hidden">
        <div className=" h-full">
          <MainSideBar />
        </div>

        <div className="flex-1 p-3 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="p-2 flex">
                <h3
                  style={Styles.heading}
                  className="text-2xl font-semibold text-center text-gray-900"
                >
                  Registration
                </h3>
              </div>

              <div className="p-4">
                <div className="w-full h-full border-1 shadow-md p-2 border mb-4 rounded-lg">
                  <div className="w-full flex p-2 gap-2 tab:flex-col">
                    <div className="w-1/2 tab:w-full">
                      <label style={Styles.label}>Event Name</label>
                      <select
                        value={selectedEvent}
                        onChange={handleEventChange}
                        className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                      >
                        <option value="">Choose Event</option>
                        {events.map((event) => (
                          <option key={event.eventid} value={event.eventid}>
                            {event.eventname}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-1/2 tab:w-full">
                      <label style={Styles.label}>Event Class</label>
                      <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        disabled={!selectedEvent || categories.length === 0}
                        className={`w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ${
                          categories.length === 0
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                      >
                        <option value="">Choose Class</option>
                        {categories.map((category) => (
                          <option
                            key={category.evtCatId}
                            value={category.evtCatId}
                          >
                            {category.evtCategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full flex h-auto p-2 gap-2 tab:flex-col">
                    <div className="w-1/2 flex flex-col gap-2 tab:w-full">
                      <form className="w-full">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                          Search
                        </label>
                        <AutoCompleteSearch
                          disabled={!selectedEvent} // Disable if no event is selected
                          from="myComponent"
                          searchType="Driver"
                          onDataReceived={(data) =>
                            handleDataReceived("driver", data)
                          }
                          onSelect={(driver) => handleSelect("driver", driver)}
                        />
                      </form>

                      <div className="w-full h-full">
                        <div className="w-full border p-2 flex bg-gray-50 tab:w-full lappydesk:w-full rounded-lg">
                          <div className="w-1/2 flex justify-center items-center p-2">
                            {driverimageUrl ? (
                              <img
                                src={driverimageUrl}
                                className="h-32 w-48 rounded-lg object-cover flex lappydesk:justify-start"
                                alt="No Photo is available"
                              />
                            ) : (
                              <IoPerson className="text-4xl border text-cyan-600 w-48 bg-white rounded-lg h-32 object-cover" />
                            )}
                          </div>

                          <div
                            style={Styles.label}
                            className="w-1/2 flex flex-col gap-4 justify-center"
                          >
                            <span>
                              Name:{" "}
                              {selectedDriver
                                ? selectedDriver.driverName
                                : "Not Selected Yet"}
                            </span>
                            <span>
                              Fmsci No:{" "}
                              {selectedDriver
                                ? selectedDriver.fmsciNumb || "N/A"
                                : "Not Selected Yet"}
                            </span>
                            <span>
                              Dl.No:{" "}
                              {selectedDriver
                                ? selectedDriver.dlNumb || "N/A"
                                : "Not Selected Yet"}
                            </span>
                            <span>
                              PH No:{" "}
                              {selectedDriver
                                ? selectedDriver.phone || "N/A"
                                : "Not Selected Yet"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2 flex flex-col gap-2 tab:w-full">
                      <div className="w-full">
                        <form className="w-full">
                          <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                            Search
                          </label>
                          <AutoCompleteSearch
                            disabled={!selectedEvent} // Disable if no event is selected
                            from="myComponent"
                            searchType="vehicle"
                            onDataReceived={(data) =>
                              handleDataReceived("vehicle", data)
                            }
                            onSelect={(vehicle) =>
                              handleSelect("vehicle", vehicle)
                            }
                          />
                        </form>
                      </div>
                      <div className="w-full h-full tab:w-full">
                        <div className="w-full border p-2 flex bg-gray-50 tab:w-full lappydesk:w-full rounded-lg">
                          <div className="w-1/2 flex justify-center items-center p-2">
                            {vehicleimageUrl ? (
                              <img
                                src={vehicleimageUrl}
                                className="h-32 w-48 rounded-lg object-cover flex lappydesk:justify-start"
                                alt="No Image is available"
                              />
                            ) : (
                              <LuBike className="text-4xl border text-cyan-600 w-48 bg-white rounded-lg h-32 object-cover" />
                            )}
                          </div>
                          <div
                            style={Styles.label}
                            className="w-1/2 flex flex-col gap-4 justify-center"
                          >
                            <span>
                              Brand:{" "}
                              {selectedVehicle
                                ? selectedVehicle.make
                                : "Not Selected Yet"}
                            </span>
                            <span>
                              Model:{" "}
                              {selectedVehicle
                                ? selectedVehicle.model
                                : "Not Selected Yet"}
                            </span>
                            <span>
                              Engine:{" "}
                              {selectedVehicle
                                ? selectedVehicle.cc || "N/A"
                                : "Not Selected Yet"}
                            </span>
                            <span>
                              Reg No:{" "}
                              {selectedVehicle
                                ? selectedVehicle.regNumb
                                : "Not Selected Yet"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex p-2 gap-2 tab:flex-col items-center">
                    <div className="w-1/2 tab:w-full flex items-end  justify-around px-2">
                      <div className="w-1/3 ">
                        <label
                          style={Styles.label}
                          htmlFor="contestantNumber"
                          className="block text-md"
                        >
                          Contestant Number
                        </label>
                        <input
                          disabled={!selectedEvent}
                          id="contestantNumber"
                          type="text"
                          value={value}
                          onChange={numberInput}
                          className="p-2 w-full bg-gray-50 border border-gray-300 rounded-lg"
                        />
                        {error && (
                          <span className="text-sm text-red-500">{error}</span>
                        )}
                      </div>

                      <div className="w-1/3 flex justify-end ">
                        <button
                          onClick={Popup}
                          type="button"
                          className="tab:w-full px-6 py-2.5 bg-cyan-500 text-white hover:bg-cyan-600 hover:text-black transition-all duration-300
                            font-medium rounded-md text-sm "
                        >
                          Show List
                        </button>
                      </div>

                      <div className="w-1/3 flex ml-8 items-center  p-2 rounded">
                        <input
                          checked={addDocVerify}
                          onChange={(e) => setAddDocVerify(e.target.checked)}
                          type="checkbox"
                          id="documentVerified"
                          className="accent-cyan-600 w-4 h-4 border-gray-100 hover:cursor-pointer"
                        />
                        <label
                          htmlFor="documentVerified"
                          style={Styles.label}
                          className="text-md text-black ml-2 hover:cursor-pointer"
                        >
                          Document Verified
                        </label>
                      </div>
                    </div>

                    <div className="w-1/2  tab:w-full flex items-center justify-around px-2">
                      <div className="flex w-1/3 items-center gap-1">
                        <input
                          id="amountPaid"
                          type="checkbox"
                          checked={amountPaidChecked}
                          onChange={handleAmountPaidChange}
                          className="accent-cyan-600 w-4 h-4 border-gray-100 rounded hover:cursor-pointer"
                          required
                        />
                        <label
                          style={Styles.label}
                          htmlFor="amountPaid"
                          className="text-md text-black hover:cursor-pointer"
                        >
                          Amount Paid
                        </label>
                      </div>

                      {amountPaidChecked && (
                        <div className="w-1/3 flex items-center mr-24">
                          <label
                            style={Styles.label}
                            className="text-md"
                            htmlFor="referenceNumber"
                          >
                            Number:
                          </label>
                          <input
                            value={referenceNumber}
                            onChange={(e) => setReferenceNumber(e.target.value)}
                            placeholder="Enter Ref Number"
                            className="p-2 bg-gray-50 border border-gray-100 rounded-lg"
                            type="text"
                          />
                        </div>
                      )}

                      <div className="w-1/3 flex justify-end">
                        <button
                          type="button"
                          disabled={!isFormValid() || isSubmitting}
                          onClick={handleSubmit}
                          className={`tab:w-full px-6 py-2.5 text-white font-medium rounded-lg text-sm transition-all ${
                            isFormValid() && !isSubmitting
                              ? "tab:w-full px-6 flex py-2.5 items-center bg-cyan-500 text-white hover:bg-cyan-600 hover:text-black transition-all duration-300 font-medium rounded-md text-sm "
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {isSubmitting ? "Submitting..." : "Add Contestant"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex p-2 gap-2 justify-end tab:flex-col items-center">
                    {entryPrice !== null && (
                      <div className="mt-4 p-2 bg-gray-100 rounded-md">
                        <strong>Entry Price:</strong>{" "}
                        <span className="text-green-600 flex text-lg">
                          <GiTakeMyMoney className="text-3xl" />
                          {entryPrice}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-auto h-fit">
                      <div className="w-full h-fit">
                        <div className="w-full h-auto flex justify-center flex-col items-center">
                          <h2 className="text-lg font-bold text-gray-800">
                            Contestant Numbers
                          </h2>
                          {regId.length > 0 ? (
                            <div className="w-full overflow-scroll flex gap-4 p-2">
                              {regId.map((num, index) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-red-200 text-red-800 rounded-lg text-lg"
                                >
                                  {num} ✘
                                </span>
                              ))}
                            </div>
                          ) : (
                            <h3 className="text-lg text-gray-800">
                              Numbers unavailable
                            </h3>
                          )}
                        </div>
                      </div>

                      {/* <span>${entryprice}</span> */}

                      <div className="w-full h-fit flex justify-center items-center">
                        <button
                          onClick={Close}
                          className="mt-4 w-full h-12 bg-red-600 text-white hover:bg-red-600 hover:text-black transition-all duration-300 font-medium rounded-md text-lg"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {DrvtableData && DrvtableData.length > 0 && (
                  <div className="min-h-auto ">
                    <div className="border rounded-lg p-2  overflow-hidden bg-white shadow-md">
                      <div className="overflow-x-auto border-b-2">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                            <tr style={Styles.label}>
                              <th className="px-6 py-3 whitespace-nowrap">
                                <button
                                  onClick={handleSelectAll}
                                  className={` py-3 p-2 rounded-md text-white ${
                                    selectAll
                                      ? "bg-red-600 hover:bg-red-700 "
                                      : "bg-blue-500 "
                                  }
                                  `}
                                >
                                  {selectAll ? "Deselect All" : "Select All"}
                                </button>
                              </th>
                              <th className="px-6 py-3 whitespace-nowrap">
                                SL.No
                              </th>
                              <th className="px-6 py-3 whitespace-nowrap">
                                Vehicle
                              </th>
                              <th className="px-6 py-3 whitespace-nowrap">
                                Class
                              </th>
                              <th className="px-6 py-3 whitespace-nowrap">
                                Contestant Number
                              </th>
                              <th className="px-6 py-3 whitespace-nowrap">
                                Payment Status
                              </th>
                              <th className="px-6 py-3 whitespace-nowrap">
                                Documents
                              </th>
                              <th className="px-6 py-3 whitespace-nowrap">
                                Scrutiny
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 text-center uppercase">
                            {DrvtableData.map((event, index) => (
                              <tr
                                key={event.eventid}
                                className="bg-white hover:bg-gray-50"
                              >
                                <td className="px-6 py-2 whitespace-nowrap">
                                  <input
                                    className="accent-cyan-600 w-4 h-4 cursor-pointer"
                                    type="checkbox"
                                    checked={selectedIds.includes(event.regId)}
                                    onChange={() =>
                                      handleCheckboxChange(event.regId)
                                    }
                                  />
                                </td>

                                <td className="px-6 py-2 whitespace-nowrap font-medium text-gray-900">
                                  {index + 1}
                                </td>

                                <td className="px-6 py-2 whitespace-nowrap">
                                  {event.regNumb}
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                  {event.evtCategory}
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap flex gap-2 justify-center relative ">
                                  <div className="relative w-32 ">
                                    <input
                                      className="w-full border border-gray-100 rounded-lg p-2 pr-12" // Added padding-right to avoid text overlap
                                      value={
                                        updatedContestantNumbers[event.regId] ??
                                        event.contestantNo
                                      }
                                      onChange={(e) =>
                                        handleContestantChange(
                                          event.regId,
                                          e.target.value
                                        )
                                      }
                                      type="text"
                                    />
                                    <button
                                      onClick={() =>
                                        ContestentUpdate(event.regId)
                                      }
                                      className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </td>

                                <td className="px-6 py-2 whitespace-nowrap">
                                  <span
                                    className={`p-2 rounded-full text-xs ${
                                      event.amountPaid === 92
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {event.amountPaid === 92
                                      ? "Paid"
                                      : "Pending"}
                                  </span>
                                </td>

                                <td className="px-6 py-2 whitespace-nowrap">
                                  <span
                                    className={`p-2 rounded-full text-xs ${
                                      event.documentStatus === 97
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {event.documentStatus === 97
                                      ? "Pending "
                                      : "Verified"}
                                  </span>
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                  <span
                                    className={`p-2 rounded-full text-xs ${
                                      event.scrutinyStatus === 15
                                        ? "bg-yellow-100 text-yellow-800"
                                        : event.scrutinyStatus === 16
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {event.scrutinyStatus === 15
                                      ? "Pending"
                                      : event.scrutinyStatus === 16
                                      ? "Verified"
                                      : "Rejected"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="w-full flex p-6 gap-2 tab:flex-col border-b-2 mt-2 rounded-lg   items-center">
                        <div className="w-1/2 tab:w-full flex items-center justify-between px-2   ">
                          <div className="flex w-1/2 justify-end items-center gap-1">
                            <button
                              onClick={DocumentVerify}
                              className="tab:w-full px-6 flex py-2.5 items-center bg-cyan-500 text-white hover:bg-cyan-600 hover:text-black transition-all duration-300
                            font-medium rounded-md text-sm "
                            >
                              Document Verified for Selected
                            </button>
                          </div>

                          <div className="flex w-1/2 justify-end items-center gap-1 ">
                            <button
                              onClick={AmountPaidForSelected}
                              type="button"
                              className="tab:w-full px-6 flex py-2.5 items-center bg-cyan-500 text-white hover:bg-cyan-600 hover:text-black transition-all duration-300
                            font-medium rounded-md text-sm "
                            >
                              AmountPaid
                            </button>
                          </div>
                        </div>

                        <div className="w-1/2 tab:w-full flex items-center justify-between px-2 gap-2">
                          <div className=" flex items-end justify-between">
                            <div className="flex justify-center items-center gap-2">
                              <label
                                className="text-md"
                                htmlFor="selectedReferenceNumber"
                              >
                                Ref Number:
                              </label>
                              <input
                                id="selectedReferenceNumber"
                                value={paymentReference}
                                onChange={(e) =>
                                  setPaymentReference(e.target.value)
                                }
                                placeholder="Enter Ref Number"
                                className="p-2 bg-gray-50 border border-gray-100 rounded-lg"
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="w-1/3 flex justify-end">
                            <button
                              onClick={AmountRefund}
                              type="button"
                              className="tab:w-full px-6 flex py-2.5 items-center bg-yellow-600 text-white hover:bg-yellow-600 hover:text-black transition-all duration-300
                            font-medium rounded-md text-sm "
                            >
                              refund
                              <HandCoins />
                            </button>
                          </div>

                          <div className=" flex justify-end">
                            <button
                              onClick={deletePopup}
                              type="button"
                              className="tab:w-full flex px-6 py-2.5 gap-2 items-center bg-red-600 text-white hover:bg-red-600 hover:text-black transition-all duration-300
                              font-medium rounded-md text-sm "
                            >
                              Delete
                              <Trash />
                            </button>
                          </div>
                        </div>
                      </div>
                      {deletePop && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-auto h-fit">
                            <div className="w-full h-fit">
                              <div className="w-full h-fit flex justify-end ">
                                <X
                                  className="text-lg cursor-pointer"
                                  onClick={deletePopClose}
                                />
                              </div>
                              <div className="w-full h-auto flex justify-center flex-col items-center">
                                <h4>Are You Sure</h4>
                              </div>
                            </div>

                            <div className="w-full h-fit flex justify-center items-center">
                              <button
                                onClick={DeleteTable}
                                className="mt-4 w-full h-12 bg-red-600 text-white hover:bg-red-600 hover:text-black transition-all duration-300 font-medium rounded-md text-lg"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {tableData && tableData.length > 0 && (
              <div className="min-h-auto border">
                <div className="w-full h-14 flex justify-between items-center px-5">
                  <input
                    className="w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // Reset to the first page on search
                    }}
                  />
                  <div className="flex items-center space-x-3">
                    <label
                      htmlFor="pageType"
                      className="font-medium text-gray-700"
                    >
                      Page Type:
                    </label>
                    <select
                      id="pageType"
                      className="border border-gray-300 bg-white text-gray-700 p-2 pl-3 pr-8 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out hover:shadow-md"
                      value={recordsPerPage}
                      onChange={(e) => {
                        setRecordsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to the first page on records per page change
                      }}
                    >
                      <option value="5">5 per page</option>
                      <option value="10">10 per page</option>
                      <option value="15">15 per page</option>
                      <option value="20">20 per page</option>
                    </select>
                  </div>
                </div>

                {/* Display "No data found" message if filteredData is empty */}
                {filteredData.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No data found for your search query.
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden bg-white shadow-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                          <tr style={Styles.label}>
                            <th className="px-6 py-3 whitespace-nowrap">
                              SL.No
                            </th>
                            <th
                              className="px-6 py-3 whitespace-nowrap cursor-pointer"
                              onClick={() => handleSort("drivername")}
                            >
                              <div className="flex items-center justify-center">
                                Driver Name
                                <SortingIcon
                                  direction={
                                    sortConfig.key === "drivername"
                                      ? sortConfig.direction
                                      : "none"
                                  }
                                />
                              </div>
                            </th>
                            <th
                              className="px-6 py-3 whitespace-nowrap cursor-pointer"
                              onClick={() => handleSort("regNumb")}
                            >
                              <div className="flex items-center justify-center">
                                Vehicle
                                <SortingIcon
                                  direction={
                                    sortConfig.key === "regNumb"
                                      ? sortConfig.direction
                                      : "none"
                                  }
                                />
                              </div>
                            </th>
                            <th
                              className="px-6 py-3 whitespace-nowrap cursor-pointer"
                              onClick={() => handleSort("evtCategory")}
                            >
                              <div className="flex items-center justify-center">
                                Class
                                <SortingIcon
                                  direction={
                                    sortConfig.key === "evtCategory"
                                      ? sortConfig.direction
                                      : "none"
                                  }
                                />
                              </div>
                            </th>
                            <th
                              className="px-6 py-3 whitespace-nowrap cursor-pointer"
                              onClick={() => handleSort("contestantNo")}
                            >
                              <div className="flex items-center justify-center">
                                Contestant Number
                                <SortingIcon
                                  direction={
                                    sortConfig.key === "contestantNo"
                                      ? sortConfig.direction
                                      : "none"
                                  }
                                />
                              </div>
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Payment Status
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Reference Number
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Documents
                            </th>
                            <th className="px-6 py-3 whitespace-nowrap">
                              Scrutiny
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-center uppercase">
                          {currentData.map((event, index) => (
                            <tr
                              key={event.eventid}
                              className="bg-white hover:bg-gray-50"
                            >
                              <td className="px-6 py-2 whitespace-nowrap font-medium text-gray-900">
                                {startIndex + index + 1}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-gray-900">
                                {event.drivername}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap">
                                {event.regNumb}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap">
                                {event.evtCategory}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap">
                                {event.contestantNo}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap">
                                <span
                                  className={`p-2 rounded-full text-xs ${
                                    event.amountPaid === 92
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {event.amountPaid === 92 ? "Paid" : "Pending"}
                                </span>
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap">
                                {event.referenceNo}
                              </td>

                              <td className="px-6 py-2 whitespace-nowrap">
                                <span
                                  className={`p-2 rounded-full text-xs ${
                                    event.documentStatus === 97
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {event.documentStatus === 97
                                    ? "Pending"
                                    : "Verified"}
                                </span>
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap">
                                <span
                                  className={`p-2 rounded-full text-xs ${
                                    event.scrutinyStatus === 15
                                      ? "bg-yellow-100 text-yellow-800"
                                      : event.scrutinyStatus === 16
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {event.scrutinyStatus === 15
                                    ? "Pending"
                                    : event.scrutinyStatus === 16
                                    ? "Verified"
                                    : "Rejected"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Pagination Controls */}
                {filteredData.length > 0 && (
                  <div className="flex justify-end px-2 items-center space-x-2 m-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-cyan-500 text-white hover:bg-cyan-700"
                      }`}
                    >
                      Prev
                    </button>
                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span key={index} className="px-3 py-2">
                          ...
                        </span>
                      ) : (
                        <button
                          key={index}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-md ${
                            currentPage === page
                              ? "bg-cyan-700 text-white"
                              : "bg-gray-200 hover:bg-gray-400"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-cyan-500 text-white hover:bg-cyan-700"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={true} />
    </section>
  );
};

export default Linkraceanddrive;
