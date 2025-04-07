/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import DatePicker from "react-datepicker";
import { BASE_URL } from "../constants/global-const";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { parse } from "date-fns";
import { IMAGE_URL } from "../constants/global-const";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import { DataTable } from "simple-datatables";
import Styles from "../constants/Styles";
import AxiosInstance from "./AxiosInstance";
import { Tooltip as ReactTooltip } from "react-tooltip";

const EventForm = () => {
  const [eventData, setEventData] = useState({
    eventType: "",
    eventName: "",
    dateRange: { start: null, end: null },
    status: 9,
    location: "",
    geoLocation: "",
    bannerImage: null,
    bankDetails: {
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      Qrpath: null,
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [submittedEvents, setSubmittedEvents] = useState([]);
  const tableRef = useRef(null);
  const dropdownRef = useRef(null);
  const [eventId, setEventId] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const options = [
    { value: 5, label: "5 per page" },
    { value: 10, label: "10 per page" },
    { value: 15, label: "15 per page" },
    { value: 20, label: "20 per page" },
  ];

  // Handle dropdown option selection
  const handleOptionClick = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing records per page
    setIsDropdownOpen(false);
  };

  // Filter data based on search query
  const filteredData = submittedEvents.filter((event) =>
    Object.values(event).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort data based on sort configuration
  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key && sortConfig.direction !== "none") {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // Calculate total pages based on recordsPerPage
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  // Slice data for the current page
  const currentData = sortedData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = "none";
    }
    setSortConfig({ key, direction });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages = [1];

      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

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

  // eslint-disable-next-line react/prop-types
  const SortingIcon = ({ direction }) => {
    if (direction === "none") {
      return <FaSort className="w-4 h-4 ms-1" />;
    } else if (direction === "asc") {
      return <FaSortUp className="w-4 h-4 ms-1" />;
    } else if (direction === "desc") {
      return <FaSortDown className="w-4 h-4 ms-1" />;
    }
    return null; // Default case
  };
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    console.log(`Field: ${field}, Value: ${value}`); // Log the value of the input
    setEventData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleBankDetailsChange = (e, field) => {
    setEventData({
      ...eventData,
      bankDetails: {
        ...eventData.bankDetails,
        [field]: e.target.value,
      },
    });
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventData({ ...eventData, bannerImage: file });
    }
    e.target.value = "";
    toast.success("Image Uploaded Successfully");
  };

  const handleQRCodeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventData({
        ...eventData,
        bankDetails: {
          ...eventData.bankDetails,
          Qrpath: file,
        },
      });
    }
    e.target.value = "";
    toast.success("Image Uploaded Successfully");
  };

  const handleDateChange = (date, key) => {
    setEventData((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [key]: date },
    }));
  };

  const handleDateInput = (e, key) => {
    if (e.target && e.target.value) {
      let input = e.target.value.replace(/\D/g, "");
      if (input.length > 2) input = input.slice(0, 2) + "-" + input.slice(2);
      if (input.length > 5) input = input.slice(0, 5) + "-" + input.slice(5);
      if (input.length > 10) input = input.slice(0, 10);

      e.target.value = input;

      if (input.length === 10) {
        const parsedDate = parse(input, "dd-MM-yyyy", new Date());

        if (!isNaN(parsedDate.getTime())) {
          const month = parsedDate.getMonth() + 1;

          if (month >= 1 && month <= 12) {
            setEventData((prev) => ({
              ...prev,
              dateRange: { ...prev.dateRange, [key]: parsedDate },
            }));
          } else {
            e.target.value = "";
            toast.error(
              "Invalid month. Please enter a value between 1 and 12."
            );
          }
        }
      }
    } else if (!e.target || !e.target.value) {
      if (e.target && !e.target.value) {
        handleDateChange(null, key);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventtype", eventData.eventType);
    formData.append("eventname", eventData.eventName);
    formData.append("startdate", eventData.dateRange.start.toISOString());
    formData.append("enddate", eventData.dateRange.end.toISOString());
    formData.append("isactive", eventData.status); // Use eventData.status for isactive
    formData.append("eventstatus", eventData.status); // Use the correct eventstatus
    formData.append("bankname", eventData.bankDetails.bankName);
    formData.append("ifsccode", eventData.bankDetails.ifscCode);
    formData.append("accountname", eventData.bankDetails.accountHolderName);
    formData.append("accountnum", eventData.bankDetails.accountNumber);
    formData.append("companyid", 1);
    formData.append("location", eventData.location || "");
    formData.append("GmapLocation", eventData.geoLocation || "");

    if (eventData.bannerImage) {
      formData.append("banner", eventData.bannerImage);
    }
    if (eventData.bankDetails.Qrpath) {
      formData.append("Qrpath", eventData.bankDetails.Qrpath);
    }

    try {
      const response = await AxiosInstance.post(
        `${BASE_URL}/api/EventRegistration`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Event registered successfully:", response.data);
      const addCategory = response.data;
      setEditId(addCategory);
      setSubmittedEvents([...submittedEvents, response.data]);
      resetForm();
      refreshEvents();
    } catch (error) {
      toast.error("Failed to register event:", error);
    }
  };

  const eventTypeMapping = {
    21: "Autocross",
    22: "DragRacing",
    23: "RallySprint",
    24: "StageRally",
  };

  const resetForm = () => {
    setEventData({
      eventType: "",
      eventName: "",
      dateRange: { start: null, end: null },
      status: 9,
      location: "",
      geoLocation: "",
      bannerImage: null,
      bankDetails: {
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        Qrpath: null,
      },
    });
  };

  // const handleEdit = (event) => {
  //   if (event.eventstatus === 6) {
  //     toast("The event cannot be edited until it is approved.", {
  //       icon: "⚠️",
  //       style: {
  //         border: "1px solid #FFA500",
  //         padding: "16px",
  //       },
  //     });
  //     resetForm();
  //   } else {
  //     setEventId(event.eventid);
  //     const eventId = event.eventid;
  //     if (!eventId) {
  //       console.error("No event ID found for editing:", event);
  //       return;
  //     }
  //     setEditMode(true);
  //     setEditId(eventId);

  //     setEventData({
  //       eventType: event.eventtype,
  //       eventName: event.eventname,
  //       dateRange: {
  //         start: new Date(event.startdate),
  //         end: new Date(event.enddate),
  //       },
  //       status: event.isactive,
  //       location: event.location || "",
  //       geoLocation: event.gmapLocation || "",
  //       bannerImage: event.banner ? `${IMAGE_URL}${event.banner}` : null,
  //       bankDetails: {
  //         bankName: event.bankname,
  //         accountHolderName: event.accountname,
  //         accountNumber: event.accountnum,
  //         ifscCode: event.ifsccode,
  //         Qrpath: event.qrpath ? `${IMAGE_URL}${event.qrpath}` : null,
  //       },
  //     });
  //   }
  // };

  const handleEdit = (event) => {
    if (event.eventstatus === 6) {
      toast("The event cannot be edited until it is approved.", {
        icon: "⚠️",
        style: {
          border: "1px solid #FFA500",
          padding: "16px",
        },
      });
      resetForm();
      return;
    }

    setEventId(event.eventid);
    const eventId = event.eventid;
    if (!eventId) {
      console.error("No event ID found for editing:", event);
      return;
    }

    setEditMode(true);
    setEditId(eventId);

    setEventData({
      eventType: event.eventtype,
      eventName: event.eventname,
      dateRange: {
        start: new Date(event.startdate),
        end: new Date(event.enddate),
      },
      status: event.eventstatus, // Use eventstatus here
      location: event.location || "",
      geoLocation: event.gmapLocation || "",
      bannerImage: event.banner ? `${IMAGE_URL}${event.banner}` : null,
      bankDetails: {
        bankName: event.bankname,
        accountHolderName: event.accountname,
        accountNumber: event.accountnum,
        ifscCode: event.ifsccode,
        Qrpath: event.qrpath ? `${IMAGE_URL}${event.qrpath}` : null,
      },
    });

    // Show status options for all events when editing (except Pending)
    setIsHidden(false);
  };

  const handleNavigate = (eventId) => {
    navigate(`/report/${eventId}`);
    console.log("World", eventId);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editId) {
      console.error("No event ID found for updating. Cannot proceed.");
      toast.error("Error: Cannot update event without an ID");
      return;
    }
    const formData = new FormData();
    formData.append("eventtype", eventData.eventType);
    formData.append("eventname", eventData.eventName);
    formData.append("startdate", eventData.dateRange.start.toISOString());
    formData.append("enddate", eventData.dateRange.end.toISOString());
    formData.append("isactive", eventData.status); // Use eventData.status for isactive
    formData.append("eventstatus", eventData.status); // Use eventData.status for eventstatus
    formData.append("bankname", eventData.bankDetails.bankName);
    formData.append("ifsccode", eventData.bankDetails.ifscCode);
    formData.append("accountname", eventData.bankDetails.accountHolderName);
    formData.append("accountnum", eventData.bankDetails.accountNumber);
    formData.append("companyid", 1);
    formData.append("location", eventData.location || "");
    formData.append("GmapLocation", eventData.geoLocation || "");
    formData.append("id", editId);

    if (eventData.bannerImage) {
      if (typeof eventData.bannerImage !== "string") {
        formData.append("banner", eventData.bannerImage);
      }
    }
    if (eventData.bankDetails.Qrpath) {
      if (typeof eventData.bankDetails.Qrpath !== "string") {
        formData.append("Qrpath", eventData.bankDetails.Qrpath);
      }
    }

    try {
      const url = `${BASE_URL}/api/EventRegistration/${editId}`;
      console.log("Making PUT request to:", url);

      const response = await AxiosInstance.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Event updated successfully:", response.data);
      setSubmittedEvents(
        submittedEvents.map((event) =>
          (event.id || event.eventId) === editId ? response.data : event
        )
      );
      resetForm();
      setEditMode(false);
      setEditId(null);
      refreshEvents();
    } catch (error) {
      console.error("Failed to update event:", error);
      console.error("Error details:", error.response?.data || error.message);
      toast.error(
        `Failed to update event: ${
          error.response?.data?.errors?.id || error.message
        }`
      );
    }
  };

  const handleDelete = async (eventId, eventName) => {
    if (!eventId) {
      console.error("No event ID provided for deletion");
      return;
    }

    if (
      window.confirm(`Are you sure you want to delete the event: ${eventName}?`)
    ) {
      try {
        console.log("Deleting event with ID:", eventId);
        const url = `${BASE_URL}/api/EventRegistration/${eventId}`;
        await AxiosInstance.delete(url);
        setSubmittedEvents(
          submittedEvents.filter(
            (event) => (event.id || event.eventId) !== eventId
          )
        );
        refreshEvents();
      } catch (error) {
        console.error("Failed to delete event:", error);
        console.error("Error details:", error.response?.data || error.message);
        toast.error(
          `Failed to delete event: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  const refreshEvents = useCallback(() => {
    AxiosInstance.get(`${BASE_URL}/api/EventRegistration`)
      .then((response) => {
        setSubmittedEvents(response.data || []);
      })
      .catch((error) => {
        toast.error("There was an error loading events!", error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Update currentEvents when submittedEvents, recordsPerPage, or currentPage changes
  useEffect(() => {
    setCurrentEvents(submittedEvents.slice(startIndex, endIndex));
  }, [submittedEvents, startIndex, endIndex]);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <section className="w-full h-screen flex flex-col">
        <div className=" overflow-y-hidden shadow-lg ">
          <Newheader />
        </div>
        <div className="flex h-[calc(100vh-1rem)] overflow-hidden">
          <div className=" h-full">
            <MainSideBar />
          </div>

          <div className="flex-1 p-2  overflow-y-auto">
            <div className=" max-w-10xl mx-auto">
              <div id="form" className="w-full overflow-auto flex flex-col">
                <section className="bg-white mb-6">
                  <div className="flex ml-2 p-2">
                    <h2 style={Styles.heading} className="justify-start">
                      {editMode ? "Edit Event" : "Events"}
                    </h2>
                  </div>
                  <form
                    onSubmit={editMode ? handleUpdate : handleSubmit}
                    className="w-full flex border flex-col  rounded-lg bg-white gap-2  p-3"
                  >
                    <div className="flex gap-4 items-center justify-center ">
                      <div className="w-1/2 gap-2 flex flex-col">
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold text-gray-700"
                        >
                          Event Type
                        </label>
                        <select
                          data-tooltip-id="my-tooltip-2"
                          style={Styles.select}
                          value={eventData.eventType}
                          onChange={(e) => handleInputChange(e, "eventType")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                          required
                        >
                          <option value="">Select Event Type</option>
                          <option value={21}>Autocross</option>
                          <option value={22}>DragRacing</option>
                          <option value={23}>RallySprint</option>
                          <option value={24}>StageRally</option>
                        </select>
                      </div>

                      <ReactTooltip
                        id="my-tooltip-2"
                        place="bottom"
                        variant="info"
                        content="Please Select The Event"
                      />

                      <div className="w-1/2 gap-2 flex flex-col">
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold text-gray-700"
                        >
                          Event Name
                        </label>
                        <input
                          style={Styles.input}
                          type="text"
                          value={eventData.eventName}
                          onChange={(e) => handleInputChange(e, "eventName")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                          placeholder="Enter Event Name"
                          required
                        />
                      </div>
                    </div>

                    <div className="w-full h-auto  flex">
                      <div className="w-1/2 h-auto">
                        <span style={Styles.tableheading}>Venue Details</span>
                      </div>

                      <div className="w-1/2 h-auto  ml-2">
                        <span style={Styles.tableheading}>Bank Details</span>
                      </div>
                    </div>

                    <div className="flex w-full gap-2  ">
                      <div className="w-1/2 flex-col  flex gap-2 bg-gray-100  rounded-lg p-3 h-auto">
                        <div className="w-full">
                          <div className="flex flex-col gap-3 ">
                            <h3 className="text-lg font-bold font-poppins">
                              Upload Banner
                            </h3>
                            <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-100">
                              <label className="cursor-pointer w-full h-full flex items-center justify-center">
                                {eventData.bannerImage ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={
                                        typeof eventData.bannerImage ===
                                        "string"
                                          ? eventData.bannerImage
                                          : URL.createObjectURL(
                                              eventData.bannerImage
                                            )
                                      }
                                      alt="Uploaded Banner"
                                      className="w-full h-full object-cover rounded-lg"
                                      required
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setEventData({
                                          ...eventData,
                                          bannerImage: null,
                                        })
                                      }
                                      className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
                                    >
                                      Re-upload
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <svg
                                      className="w-8 h-8 mb-2 text-gray-500 mx-auto"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 16"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                      />
                                    </svg>
                                    <p className="text-sm text-gray-500">
                                      <span className="font-bold">
                                        Click to upload
                                      </span>{" "}
                                      or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      SVG, PNG, JPG, or GIF (MAX. 800x400px)
                                    </p>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={handleBannerImageChange}
                                  accept="image/*"
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="w-full h-auto items-center flex ">
                          <div className="w-1/2 h-auto">
                            <label
                              style={Styles.label}
                              className="block w-full text-sm font-bold text-gray-700"
                            >
                              Event Duration
                            </label>

                            <div className="flex flex-col gap-2 w-full">
                              {" "}
                              {/* Changed flex direction to column */}
                              <div className="relative w-full">
                                <DatePicker
                                  selected={eventData.dateRange.start}
                                  onChange={(date) =>
                                    handleDateChange(date, "start")
                                  }
                                  dateFormat="dd-MM-yyyy"
                                  className="w-full p-2 h-[40px] pl-8 border border-gray-300 rounded-[8px] focus:ring-cyan-500 focus:border-cyan-500"
                                  placeholderText="Start Date (dd-mm-yyyy)"
                                  minDate={new Date()}
                                  required
                                  onChangeRaw={(e) =>
                                    handleDateInput(e, "start")
                                  }
                                  onBlur={(e) => {
                                    if (!e.target.value)
                                      handleDateChange(null, "start");
                                  }}
                                />
                                <FaCalendarAlt className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
                              </div>
                              <div className="relative w-full">
                                <DatePicker
                                  selected={eventData.dateRange.end}
                                  onChange={(date) =>
                                    handleDateChange(date, "end")
                                  }
                                  dateFormat="dd-MM-yyyy"
                                  className="w-full p-2 h-[40px] pl-8 border border-gray-300 rounded-[8px] focus:ring-cyan-500 focus:border-cyan-500"
                                  placeholderText="End Date (dd-mm-yyyy)"
                                  minDate={
                                    eventData.dateRange.start || new Date()
                                  }
                                  required
                                  onChangeRaw={(e) => handleDateInput(e, "end")}
                                  onBlur={(e) => {
                                    if (!e.target.value)
                                      handleDateChange(null, "end");
                                  }}
                                />
                                <FaCalendarAlt className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          <div className="w-1/2 h-auto">
                            <div className="w-full">
                              <div className="w-full flex gap-2 bg-gray-100 rounded-lg p-1 h-auto">
                                <div className="flex flex-col gap-2 w-full">
                                  <div className="w-full">
                                    <label
                                      style={Styles.label}
                                      className="block text-sm font-bold text-gray-700"
                                    >
                                      Location
                                    </label>
                                    <input
                                      type="text"
                                      value={eventData.location || ""}
                                      onChange={(e) =>
                                        handleInputChange(e, "location")
                                      }
                                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                      placeholder="Enter Event Location"
                                      required
                                    />
                                  </div>

                                  <div className="w-full">
                                    {/* <label className="block text-sm font-bold text-gray-700">
                                Geo Location (URL)
                              </label> */}
                                    <input
                                      data-tooltip-id="my-tooltip-1"
                                      type="text"
                                      value={eventData.geoLocation || ""}
                                      onChange={(e) =>
                                        handleInputChange(e, "geoLocation")
                                      }
                                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                      placeholder="Enter Geo Location URL"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex  w-full flex-col gap-2 ">
                          {!isHidden && (
                            <>
                              <div className="block w-full justify-around text-sm font-bold text-gray-700">
                                Status
                              </div>
                              <div className="flex gap-2 w-full justify-evenly  ">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="status"
                                    value={8}
                                    checked={eventData.status == 8}
                                    onChange={(e) =>
                                      handleInputChange(e, "status")
                                    }
                                    className="w-3 h-4 text-cyan-600 border-gray-300"
                                  />
                                  <span className="ml-2 text-md font-bold text-gray-700">
                                    Active
                                  </span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="status"
                                    value={9}
                                    checked={eventData.status == 9}
                                    onChange={(e) =>
                                      handleInputChange(e, "status")
                                    }
                                    className="w-3 h-4 text-cyan-600 border-gray-300"
                                  />
                                  <span className="ml-2 text-md font-bold text-gray-700">
                                    Inactive
                                  </span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="status"
                                    value={11}
                                    checked={eventData.status == 11}
                                    onChange={(e) =>
                                      handleInputChange(e, "status")
                                    }
                                    className="w-3 h-4 text-cyan-600 border-gray-300"
                                  />
                                  <span className="ml-2 text-md font-bold text-gray-700">
                                    Cancelled
                                  </span>
                                </label>
                              </div>
                            </>
                          )}

                          <ReactTooltip
                            id="my-tooltip-1"
                            place="bottom"
                            variant="info"
                            content="Please Enter the Geo Location URL"
                          />
                        </div>
                      </div>
                      <div className="w-1/2 bg-gray-100 p-3 rounded-lg">
                        <div className="w-full">
                          <div className="flex flex-col gap-3">
                            <h3 className="text-lg font-bold font-poppins">
                              Upload QR Code
                            </h3>

                            <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-100">
                              <label className="cursor-pointer w-full h-full flex items-center justify-center">
                                {eventData.bankDetails.Qrpath ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={
                                        typeof eventData.bankDetails.Qrpath ===
                                        "string"
                                          ? eventData.bankDetails.Qrpath
                                          : URL.createObjectURL(
                                              eventData.bankDetails.Qrpath
                                            )
                                      }
                                      alt="Uploaded QR Code"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setEventData({
                                          ...eventData,
                                          bankDetails: {
                                            ...eventData.bankDetails,
                                            Qrpath: null,
                                          },
                                        })
                                      }
                                      className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
                                    >
                                      Re-upload
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <svg
                                      className="w-8 h-8 mb-2 text-gray-500 mx-auto"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 16"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                      />
                                    </svg>
                                    <p className="text-sm text-gray-500">
                                      <span className="font-bold">
                                        Click to upload
                                      </span>{" "}
                                      or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      SVG, PNG, JPG, or GIF (MAX. 800x400px)
                                    </p>
                                  </div>
                                )}

                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={handleQRCodeChange}
                                  accept="image/*"
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="w-full h-auto flex gap-3 p-2">
                          <div className="w-1/2 h-auto  gap-2 flex flex-col">
                            <div className="w-full">
                              <label
                                style={Styles.label}
                                className="block text-sm font-bold text-gray-700"
                              >
                                Bank Name
                              </label>
                              <input
                                type="text"
                                value={eventData.bankDetails.bankName}
                                onChange={(e) =>
                                  handleBankDetailsChange(e, "bankName")
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                placeholder="Enter Bank Name"
                                required
                              />
                            </div>
                            <div className="w-full">
                              <label
                                style={Styles.label}
                                className="block text-sm font-bold text-gray-700"
                              >
                                IFSC Code
                              </label>
                              <input
                                type="text"
                                value={eventData.bankDetails.ifscCode}
                                onChange={(e) =>
                                  handleBankDetailsChange(e, "ifscCode")
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                placeholder="Enter IFSC Code"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-1/2 h-auto  gap-2 flex flex-col">
                            <div className="w-full">
                              <label
                                style={Styles.label}
                                className="block text-sm font-bold text-gray-700"
                              >
                                Account Holder Name
                              </label>
                              <input
                                type="text"
                                value={eventData.bankDetails.accountHolderName}
                                onChange={(e) =>
                                  handleBankDetailsChange(
                                    e,
                                    "accountHolderName"
                                  )
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                placeholder="Enter Account Holder Name"
                                required
                              />
                            </div>
                            <div className="w-full">
                              <label
                                style={Styles.label}
                                className="block text-sm font-bold text-gray-700"
                              >
                                Account Number
                              </label>
                              <input
                                type="text"
                                value={eventData.bankDetails.accountNumber}
                                onChange={(e) =>
                                  handleBankDetailsChange(e, "accountNumber")
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                placeholder="Enter Account Number"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end  gap-2">
                      {editMode && (
                        <>
                          <div className="w-1/2 h-auto gap-4 flex ">
                            <button
                              type="button"
                              onClick={() => handleNavigate(eventId)} // Pass eventId to handleNavigate
                              className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                            >
                              Managing Organizer Committee
                            </button>

                            {/* Cancel button */}
                            <button
                              type="button"
                              onClick={() => {
                                setEditMode(false);
                                setEditId(null);
                                resetForm();
                              }}
                              className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
                            >
                              Cancel
                            </button>
                          </div>
                          {/* Go to Event Page button */}
                        </>
                      )}
                      <div className="w-1/2 flex justify-end">
                        <button
                          type="submit"
                          className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                        >
                          {editMode ? "Update " : "Submit "}
                        </button>
                      </div>
                    </div>
                  </form>
                </section>

                {submittedEvents.length > 0 && (
                  <section className="w-full">
                     <div className="w-full bg-white ">
                     <div className="w-full h-auto rounded-t-lg p-2 flex  items-center border bg-gray-50 border-b">
                      <h2
                        style={Styles.tableheading}
                        className="text-xl font-bold  bg-gray-50 "
                      >
                        Submitted Events
                      </h2>
                      </div>
                    
                      <div className="w-full h-auto border flex justify-between items-center p-2">
                        {/* Search Input */}
                        <input
                          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                          type="text"
                          placeholder="Search..."
                          onChange={(e) => {
                            const query = e.target.value;
                            setSearchQuery(query);
                          }}
                        />

                        {/* Page Type Dropdown */}
                        <div
                          ref={dropdownRef}
                          className="relative w-1/2 flex justify-end"
                        >
                          <div className="w-2/3 relative">
                            <label
                              htmlFor="pageType-select"
                              className=" text-sm font-medium text-gray-700"
                            >
                              Page Type
                            </label>

                            <button
                              id="pageType-select"
                              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              aria-haspopup="true"
                              aria-expanded={isDropdownOpen}
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
                            >
                              <div className="flex items-center justify-between">
                                <span>{`${recordsPerPage} per page`}</span>
                                <svg
                                  className="h-4 w-4 text-gray-500"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  aria-hidden="true"
                                >
                                  <path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" />
                                </svg>
                              </div>
                            </button>

                            {/* Dropdown List */}
                            {isDropdownOpen && (
                              <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
                                <ul className="py-1">
                                  {options.map((option, index) => (
                                    <li
                                      key={index}
                                      className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      onClick={() =>
                                        handleOptionClick(option.value)
                                      } // Handle selection
                                    >
                                      {option.label}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className=" border rounded-b-lg overflow-hidden bg-white shadow-md">
                        <table ref={tableRef} className="w-full">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 top-0 text-center">
                            <tr>
                              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                S.No
                              </th>
                              <th
                                onClick={() => handleSort("eventname")}
                                className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer"
                              >
                                <div className="flex items-center justify-center">
                                  Event Name
                                  <SortingIcon
                                    direction={
                                      sortConfig.key === "eventname"
                                        ? sortConfig.direction
                                        : "none"
                                    }
                                  />
                                </div>
                              </th>
                              <th
                                onClick={() => handleSort("eventtype")}
                                className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer"
                              >
                                <div className="flex items-center justify-center">
                                  Event Type
                                  <SortingIcon
                                    direction={
                                      sortConfig.key === "eventtype"
                                        ? sortConfig.direction
                                        : "none"
                                    }
                                  />
                                </div>
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Event Status
                              </th>
                              {/* <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Categories
                          </th> */}
                              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {currentData.map((event, index) => {
                              const globalIndex =
                                (currentPage - 1) * recordsPerPage + index + 1;

                              return (
                                <tr key={index} className="text-center">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {globalIndex}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {event.eventname.length > 10
                                      ? `${event.eventname.slice(0, 10)}...`
                                      : event.eventname}
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {eventTypeMapping[event.eventtype] ||
                                      "Unknown"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                      className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${
                                        event.eventstatus === 6
                                          ? "bg-yellow-100 text-yellow-800"
                                          : event.eventstatus === 7
                                          ? "bg-blue-100 text-blue-800"
                                          : event.eventstatus === 8
                                          ? "bg-green-100 text-green-800"
                                          : event.eventstatus === 9
                                          ? "bg-red-100 text-red-800"
                                          : event.eventstatus === 10
                                          ? "bg-gray-100 text-gray-800"
                                          : event.eventstatus === 11
                                          ? "bg-orange-100 text-orange-800"
                                          : event.eventstatus === 12
                                          ? "bg-purple-100 text-purple-800"
                                          : "bg-gray-200 text-gray-600"
                                      }`}
                                    >
                                      {event.eventstatus === 6
                                        ? "Pending"
                                        : event.eventstatus === 7
                                        ? "Approved"
                                        : event.eventstatus === 8
                                        ? "Active"
                                        : event.eventstatus === 9
                                        ? "Inactive"
                                        : event.eventstatus === 10
                                        ? "Completed"
                                        : event.eventstatus === 11
                                        ? "Cancelled"
                                        : event.eventstatus === 12
                                        ? "LIVE"
                                        : "Unknown"}
                                    </span>
                                  </td>

                                  {/* <td className="px-6 py-4 whitespace-nowrap">
                                {event.lstcat?.$values?.length || 0}
                              </td> */}
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                                    <button
                                      onClick={() => handleEdit(event)}
                                      className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                                    >
                                      <CiEdit className="size-6" />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        const eventId = event.eventid; // Use event.eventid here
                                        if (!eventId) {
                                          console.error(
                                            "No event ID found for deletion:",
                                            event
                                          );
                                          toast.error(
                                            "Cannot delete event without an ID"
                                          );
                                          return;
                                        }
                                        handleDelete(eventId, event.eventname);
                                      }}
                                      className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
                                    >
                                      <MdOutlineDelete className="size-6" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      
                    </div>
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
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
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
                      
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default EventForm;
