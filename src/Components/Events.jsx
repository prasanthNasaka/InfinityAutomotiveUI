import { useState, useEffect } from "react";
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import DatePicker from "react-datepicker";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { parse } from "date-fns";
import { IMAGE_URL } from "../constants/global-const";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [submittedEvents, setSubmittedEvents] = useState([]);
  const recordsPerPage = 5;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentEvents = submittedEvents.slice(startIndex, endIndex);
  const totalRecords = submittedEvents.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  // eslint-disable-next-line no-unused-vars
  const [eventId, setEventId] = useState(null);
  const navigate = useNavigate();

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
    formData.append("isactive", eventData.status);
    formData.append("eventstatus", 0);
    formData.append("bankname", eventData.bankDetails.bankName);
    formData.append("ifsccode", eventData.bankDetails.ifscCode);
    formData.append("accountname", eventData.bankDetails.accountHolderName);
    formData.append("accountnum", eventData.bankDetails.accountNumber);
    formData.append("companyid", 1);
    formData.append("location", eventData.location || "");
    console.log("Appending GmapLocation:", eventData.geoLocation);
    formData.append("GmapLocation", eventData.geoLocation || "");
    if (eventData.bannerImage) {
      formData.append("banner", eventData.bannerImage);
    }
    if (eventData.bankDetails.Qrpath) {
      formData.append("Qrpath", eventData.bankDetails.Qrpath);
    }

    try {
      const response = await axios.post(
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

  const handleEdit = (event) => {
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
      status: event.isactive,
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
  };

  const handleNavigate = (eventId) => {
    navigate(`/report/${eventId}`); // ✅ Correctly replace :eventId with actual ID
    console.log("World", eventId); // ✅ Log the event ID to confirm it's correct
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
    formData.append("isactive", eventData.status);
    formData.append("eventstatus", 0);
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

      const response = await axios.put(url, formData, {
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
      alert(
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
        await axios.delete(url);
        setSubmittedEvents(
          submittedEvents.filter(
            (event) => (event.id || event.eventId) !== eventId
          )
        );
        refreshEvents();
      } catch (error) {
        console.error("Failed to delete event:", error);
        console.error("Error details:", error.response?.data || error.message);
        alert(
          `Failed to delete event: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  const maxVisiblePages = 2;

  const getPageNumbers = () => {
    let pages = [];

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

  const refreshEvents = () => {
    axios
      .get(`${BASE_URL}/api/EventRegistration`)
      .then((response) => {
        console.log("API Response:", response.data.$values);
        setSubmittedEvents(response.data.$values || []);
      })
      .catch((error) => {
        toast.error("There was an error loading events!", error);
      });
  };
  useEffect(() => {
    refreshEvents();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <section className="w-full h-full">
        <div className="w-full h-24 overflow-y-hidden shadow-lg">
          <Newheader />
        </div>

        <div className="flex w-full h-[calc(100vh-6rem)]">
          <div className="bg-gray-100">
            <MainSideBar />
          </div>
          <div id="form" className="w-full overflow-auto flex flex-col">
            <section className="h-auto w-full flex p-6 justify-center items-center">
              <form
                onSubmit={editMode ? handleUpdate : handleSubmit}
                className="w-full flex flex-col gap-6 rounded-lg bg-white shadow-lg p-4"
              >
                <h2 className="text-2xl font-bold text-center">
                  {editMode ? "Edit Event" : "Event Form"}
                </h2>

                <div className="flex gap-4">
                  <div className="w-1/2 gap-2 flex flex-col">
                    <label className="block text-sm font-bold text-gray-700">
                      Event Type
                    </label>
                    <select
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

                  <div className="w-1/2 gap-2 flex flex-col">
                    <label className="block text-sm font-bold text-gray-700">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={eventData.eventName}
                      onChange={(e) => handleInputChange(e, "eventName")}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="Enter Event Name"
                      required
                    />
                  </div>
                </div>

                <div className="flex w-full gap-2">
                  <div className="w-1/2 flex gap-2 bg-gray-100 rounded-lg p-3 h-auto">
                    <div className="flex w-1/2 flex-col gap-2">
                      <div className="flex items-center">
                        <label className="block w-full text-sm font-bold text-gray-700">
                          Event Duration
                        </label>
                      </div>
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex flex-col w-full gap-3 ">
                          <div className="relative w-full">
                            <DatePicker
                              selected={eventData.dateRange.start}
                              onChange={(date) =>
                                handleDateChange(date, "start")
                              }
                              dateFormat="dd-MM-yyyy"
                              className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                              placeholderText="Start Date (dd-mm-yyyy)"
                              minDate={new Date()}
                              required
                              onChangeRaw={(e) => handleDateInput(e, "start")}
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
                              onChange={(date) => handleDateChange(date, "end")}
                              dateFormat="dd-MM-yyyy"
                              className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                              placeholderText="End Date (dd-mm-yyyy)"
                              minDate={eventData.dateRange.start || new Date()}
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

                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-700">
                          Status
                        </h3>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="status"
                              value={8}
                              checked={eventData.status == 8}
                              onChange={(e) => handleInputChange(e, "status")}
                              className="w-4 h-4 text-cyan-600 border-gray-300"
                            />
                            <span className="ml-2 text-sm font-bold text-gray-700">
                              Active
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="status"
                              value={9}
                              checked={eventData.status == 9}
                              onChange={(e) => handleInputChange(e, "status")}
                              className="w-4 h-4 text-cyan-600 border-gray-300"
                            />
                            <span className="ml-2 text-sm font-bold text-gray-700">
                              Inactive
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="w-full flex gap-2 bg-gray-100 rounded-lg p-1 h-auto">
                          <div className="flex flex-col gap-2 w-full">
                            <div className="w-full">
                              <label className="block text-sm font-bold text-gray-700">
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
                              <label className="block text-sm font-bold text-gray-700">
                                Geo Location (URL)
                              </label>
                              <input
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

                    <div className="w-1/2">
                      <div className="flex flex-col gap-3 mt-10">
                        <h3 className="text-lg font-bold">Upload Banner</h3>
                        <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
                          <label className="cursor-pointer w-full h-full flex items-center justify-center">
                            {eventData.bannerImage ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={
                                    typeof eventData.bannerImage === "string"
                                      ? eventData.bannerImage
                                      : URL.createObjectURL(
                                          eventData.bannerImage
                                        )
                                  }
                                  alt="Uploaded Banner"
                                  className="w-full h-full object-cover rounded-lg"
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
                  </div>
                  <div className="w-1/2 bg-gray-100 p-3 rounded-lg">
                    <div className="text-xl font-bold mb-4">Bank Details</div>

                    <div className="flex gap-4">
                      {/* Left Side - Bank Details */}
                      <div className="flex w-1/2">
                        <div className="flex flex-col gap-3 w-full">
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
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
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
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
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
                              Account Holder Name
                            </label>
                            <input
                              type="text"
                              value={eventData.bankDetails.accountHolderName}
                              onChange={(e) =>
                                handleBankDetailsChange(e, "accountHolderName")
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                              placeholder="Enter Account Holder Name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
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

                      {/* Right Side - Upload QR Code */}
                      <div className="w-1/2">
                        <div className="flex flex-col gap-3">
                          <h3 className="text-lg font-bold">Upload QR Code</h3>

                          <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
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
                    </div>
                  </div>
                </div>

                <div className="flex justify-end p-2 gap-2">
                  {editMode && (
                    <>
                      {/* Go to Event Page button */}
                      <button
                        type="button"
                        onClick={() => handleNavigate(eventId)} // Pass eventId to handleNavigate
                        className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
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
                        className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  <button
                    type="submit"
                    className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    {editMode ? "Update Event" : "Submit Event"}
                  </button>
                </div>
              </form>
            </section>

            {submittedEvents.length > 0 && (
              <section className="p-6">
                <div className="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                  <h2 className="text-xl font-bold p-4 bg-gray-50 border-b">
                    Submitted Events
                  </h2>
                  <div className="overflow-auto max-h-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className="divide-x divide-gray-200">
                          <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            S.No
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Event Name
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Event Type
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Categories
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentEvents.map((event, index) => {
                          const globalIndex =
                            (currentPage - 1) * recordsPerPage + index + 1;

                          return (
                            <tr key={index} className="text-center">
                              <td className="px-6 py-4 whitespace-nowrap">
                                {globalIndex}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {event.eventname}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {eventTypeMapping[event.eventtype] || "Unknown"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${
                                    event.isactive == 8
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {event.isactive == 8 ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {event.lstcat?.$values?.length || 0}
                              </td>
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
                                    const eventId = event.id || event.eventId;
                                    if (!eventId) {
                                      console.error(
                                        "No event ID found for deletion:",
                                        event
                                      );
                                      alert(
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
                          onClick={() => setCurrentPage(page)}
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
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default EventForm;
