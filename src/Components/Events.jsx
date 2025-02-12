/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  setSelectedEvent,
  updateEvent,
  resetSelectedEvent,
} from "../store/eventsSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Newheader from "../Components/Newheader";
import MainSideBar from "./MainSideBar";
import NewEventForm from "./NewEventForm";
import { Link } from "react-scroll";
import CheckAll from "../Screens/Complete_Event_details";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";

const Events = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    category: "",
    laps: 0,
    participants: 0,
    entryPrice: 0,
  });
  const [eventsData, setEventsData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const { events, selectedEvent } = useSelector((state) => state.events);
  const [eventType, setEventType] = useState(
    selectedEvent ? selectedEvent.eventType : ""
  );
  const [eventName, setEventName] = useState(
    selectedEvent ? selectedEvent.eventName : ""
  );
  const [dateRange, setDateRange] = useState({
    start: selectedEvent ? selectedEvent.startDate : null,
    end: selectedEvent ? selectedEvent.endDate : null,
  });
  const [file, setFile] = useState(selectedEvent ? selectedEvent.file : null);
  const [qrFile, setQrFile] = useState(
    selectedEvent ? selectedEvent.qrfile : null
  );
  const [status, setStatus] = useState(
    selectedEvent ? selectedEvent.status : "inactive"
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setClose] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedEvents = [...eventsData];
      updatedEvents[editIndex] = formData;
      setEventsData(updatedEvents);
      setEditIndex(null);
    } else {
      setEventsData([...eventsData, formData]);
    }
    setFormData({
      eventName: "",
      category: "",
      laps: "",
      participants: "",
      entryPrice: " ",
    });
    setIsExpanded(false);
    const newEvent = {
      eventName,
      eventType,
      startDate: dateRange.start,
      endDate: dateRange.end,
      status,
      file,
      qrFile,
    };

    if (selectedEvent) {
      dispatch(
        updateEvent({
          index: events.indexOf(selectedEvent),
          updatedEvent: newEvent,
        })
      );
      dispatch(resetSelectedEvent());
    } else {
      dispatch(addEvent(newEvent));
    }

    setEventType("");
    setEventName("");
    setDateRange({ start: null, end: null });
    setFile(null);
    setQrFile(null);
    setStatus("inactive");
  };

  const handleEdit = (index) => {
    const eventToEdit = events[index];
    dispatch(setSelectedEvent(eventToEdit));
    setFormData(eventsData[index]);
    setEditIndex(index);
    setIsExpanded(true);
  };

  const toViewAllDetails = (index) => {
    const eventToView = events[index];
    dispatch(setSelectedEvent(eventToView));
    setClose(true);
    setIsOpen(true);
  };

  const closeTheComponent = () => {
    dispatch(resetSelectedEvent());
    setIsOpen(false);
    setClose(false);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleCancel = () => {
    dispatch(resetSelectedEvent());
    setEventType("");
    setEventName("");
    setDateRange({ start: null, end: null });
    setFile(null);
    setQrFile(null);
    setStatus("inactive");
    
  };

  useEffect(() => {
    if (selectedEvent) {
      setEventType(selectedEvent.eventType);
      setEventName(selectedEvent.eventName);
      setDateRange({
        start: selectedEvent.startDate,
        end: selectedEvent.endDate,
      });
      setFile(selectedEvent.file);
      setQrFile(selectedEvent.qrFile);
      setStatus(selectedEvent.status);
    } else {
      setEventType("");
      setEventName("");
      setDateRange({ start: null, end: null });
      setFile(null);
      setQrFile(null);
      setStatus("inactive");
    }
  }, [selectedEvent]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleQrChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setQrFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleReupload = () => {
    setFile(null);
  };

  const handleQrReupload = () => {
    setQrFile(null);
  };

  const openPanel = (index) => {
    setSelectedEventIndex(index);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedEventIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "eventName" || name === "category" ? value : Number(value),
    }));
  };

  const handleDelete = (index) => {
    setEventsData(eventsData.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    setFormData({
      eventName: "",
      category: "",
      laps: "",
      participants: "",
      entryPrice: "",
    });
    setEditIndex(null);
    setIsExpanded(true);
  };

  return (
    <>
      <section className="w-full h-full">
        <div className="h-24 w-full">
          <Newheader />
        </div>

        <div className="flex h-[calc(100vh-6rem)]">
          <div className="bg-gray-100">
            <MainSideBar />
          </div>

          {!isOpen && (
            <div id="form" className="w-full overflow-auto flex flex-col">
              <section className="h-auto w-full flex p-6 justify-center items-center">
                <form
                  className="w-full max-w-4xl flex flex-col gap-6 rounded-lg bg-white shadow-lg p-8"
                  onSubmit={handleSubmit}
                >
                  <h2 className="text-2xl font-bold text-center">
                    {selectedEvent ? "Edit Event" : "Event Form"}
                  </h2>

                  {/* Event Type */}
                  <div className="flex gap-4">
                    <div className="w-1/2 gap-2 flex flex-col">
                      <label className="block text-sm font-medium text-gray-700">
                        Event Type
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Event Type</option>
                        <option>Autocross</option>
                        <option>Drag</option>
                        <option>Sprint</option>
                        <option>Rally</option>
                      </select>
                    </div>

                    <div className="w-1/2 gap-2 flex flex-col">
                      <label className="block text-sm font-medium text-gray-700">
                        Event Name
                      </label>
                      <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Event Name"
                        required
                      />
                    </div>
                  </div>

                  {/* D and B */}
                  <div className="w-full flex gap-2  bg-gray-50 rounded-lg p-3  h-auto">
                    <div className="flex w-1/2  flex-col gap-2">
                      <div className=" flex  items-center">
                        <label className="block w-full text-sm font-bold text-gray-700">
                          Event Duration
                        </label>
                      </div>
                      <div className="flex items-center justify-center gap-2  w-full">
                        <div className=" flex flex-col w-3/4  gap-3 ">
                          <div className="flex  ">
                            <DatePicker
                              selected={dateRange.start}
                              onChange={(date) =>
                                setDateRange({ ...dateRange, start: date })
                              }
                              className="w-60 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholderText="Start Date"
                              minDate={new Date()}
                              required
                            />
                          </div>
                          {/* <div className="w-60   flex justify-center">
                            <span className="mx-2 p-1 text-gray-500 text-center">
                              to
                            </span>
                          </div> */}
                          <div>
                            <DatePicker
                              selected={dateRange.end}
                              onChange={(date) =>
                                setDateRange({ ...dateRange, end: date })
                              }
                              className=" w-60 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholderText="End Date"
                              minDate={dateRange.start || new Date()}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Status</h3>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="status"
                                value="active"
                                checked={status === "active"}
                                onChange={() => setStatus("active")}
                                className="w-4 h-4 text-blue-600 border-gray-300"
                              />
                              <span className="ml-2 text-sm font-medium text-gray-700">
                                Active
                              </span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="status"
                                value="inactive"
                                checked={status === "inactive"}
                                onChange={() => setStatus("inactive")}
                                className="w-4 h-4 text-blue-600 border-gray-300"
                              />
                              <span className="ml-2 text-sm font-medium text-gray-700">
                                Inactive
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold">Upload Banner</h3>
                        <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
                          <label className="cursor-pointer w-full h-full flex items-center justify-center">
                            {file ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={file}
                                  alt="Uploaded Banner"
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={handleReupload}
                                  className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
                                >
                                  Re-upload
                                </button>
                              </div>
                            ) : (
                              <div className="text-center">
                                <svg
                                  className="w-8 h-8 mb-2 text-gray-500"
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
                                  <span className="font-semibold">
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
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pay */}

                  <div className="w-full bg-gray-100 p-3 rounded-lg">
                    <div className="text-xl font-semibold mb-4">
                      Bank Details
                    </div>
                    <div className="flex gap-4">
                      <div className="flex  w-1/2 ">
                        <div className="flex flex-col gap-3  w-full">
                          <div className="flex  items-center">
                            <div className="w-full">
                              <div className="space-y-2  ">
                                <label className="block text-sm font-medium text-gray-700">
                                  Bank Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Enter Bank Name"
                                />
                              </div>
                              <div className=" space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Account Holder Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Enter Account Holder Name"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="  gap-3  items-center">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Account Number
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Account Number"
                              />
                            </div>

                            <div className="w-full">
                              <div className="space-y-2 ">
                                <label className="block text-sm font-medium text-gray-700">
                                  IFSC Code
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Enter IFSC Code"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 ">
                        <div className="flex flex-col  gap-3">
                          <h3 className="text-lg font-semibold">
                            Upload QR Code
                          </h3>
                          <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
                            <label className="cursor-pointer w-full h-full flex items-center justify-center">
                              {qrFile ? (
                                <div className="relative w-full h-full">
                                  <img
                                    src={qrFile}
                                    alt="Uploaded QR Code"
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                  <button
                                    type="button"
                                    onClick={handleQrReupload}
                                    className="absolute bottom-2 right-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
                                  >
                                    Re-upload
                                  </button>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <svg
                                    className="w-8 h-8 mb-2 text-gray-500"
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
                                    <span className="font-semibold">
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
                                onChange={handleQrChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </section>

              <section>
                <div className="border w-full max-w-4xl shadow-md rounded-lg container mx-auto px-4 py-8">
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddCategory}
                      className="mb-4 border flex items-center   gap-2 bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      <Plus size={20} />
                      Add Category
                    </button>
                  </div>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isExpanded
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <section className="mb-6">
                      <form
                        id="addEvent"
                        className="bg-white rounded-lg shadow-md p-6"
                        onSubmit={handleSubmit}
                      >
                        <h2 className="text-xl font-semibold mb-6 flex items-center justify-between">
                          {editIndex !== null
                            ? `Edit Event Details (Index: ${editIndex + 1})`
                            : `Event Details Form (New Index: ${
                                eventsData.length + 1
                              })`}
                          <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {isExpanded ? (
                              <ChevronUp size={24} />
                            ) : (
                              <ChevronDown size={24} />
                            )}
                          </button>
                        </h2>

                        <div className="w-full flex  gap-2 ">
                          <div className="flex w-1/4 gap-2">
                            <div className="flex flex-col  gap-4">
                              <label
                                htmlFor="category"
                                className=" text-sm font-medium text-gray-700"
                              >
                                Category
                              </label>
                              <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                          </div>

                          <div className="w-3/4  gap-2 flex  h-20">
                            <div className="w-1/3">
                              <div className="flex flex-col  gap-4">
                                <label
                                  htmlFor="laps"
                                  className=" text-sm font-medium text-gray-700"
                                >
                                  No. of Laps
                                </label>
                                <input
                                  type="number"
                                  id="laps"
                                  name="laps"
                                  value={formData.laps}
                                  onChange={handleChange}
                                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>
                            <div className="w-1/3">
                              <div className="flex flex-col gap-4">
                                <label
                                  htmlFor="entryPrice"
                                  className=" text-sm font-medium text-gray-700"
                                >
                                  Entry Price
                                </label>
                                <input
                                  type="number"
                                  id="entryPrice"
                                  name="entryPrice"
                                  value={formData.entryPrice}
                                  onChange={handleChange}
                                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>
                            <div className="w-1/3">
                              <div className="flex flex-col gap-4">
                                <label
                                  htmlFor="participants"
                                  className=" text-sm font-medium text-gray-700"
                                >
                                  No. of Participants
                                </label>
                                <input
                                  type="number"
                                  id="participants"
                                  name="participants"
                                  value={formData.participants}
                                  onChange={handleChange}
                                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                          >
                            {editIndex !== null ? "Update" : "Add"}
                          </button>
                        </div>
                      </form>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-gray-50 text-gray-700">
                            <tr>
                              <th className="px-6 py-4 font-medium">#</th>
                              <th className="px-6 py-4 font-medium">
                                Event Name
                              </th>
                              <th className="px-6 py-4 font-medium">
                                Category
                              </th>
                              <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {eventsData.map((event, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{event.eventName}</td>
                                <td className="px-6 py-4">{event.category}</td>
                                <td className="px-6 py-4 space-x-2">
                                  <button
                                    onClick={() => handleEdit(index)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => handleDelete(index)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>
                </div>
              </section>

              {/* Events List Table */}
              {/* <section className="flex h-screen">
                
                <div
                  className={`w-full ${
                    isPanelOpen ? "md:w-1/2" : "w-full"
                  } transition-all duration-300 p-6`}
                >
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-4xl mx-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Event Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Event Type
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Start Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                            End Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Add Details
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Check
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event, index) => (
                          <tr key={index} className="bg-white border-b">
                            <td className="px-6 py-4">{event.eventName}</td>
                            <td className="px-6 py-4">{event.eventType}</td>
                            <td className="px-6 py-4">
                              {event.startDate?.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              {event.endDate?.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">{event.status}</td>
                            <td className="px-6 py-4">
                              <Link
                                to="form"
                                smooth={true}
                                onClick={() => handleEdit(index)}
                                className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600"
                              >
                                View
                              </Link>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => openPanel(index)}
                                className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600"
                              >
                                Add Event Details
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => toViewAllDetails(index)}
                                className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600"
                              >
                                Check
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div
                  className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
                    isPanelOpen
                      ? "translate-x-0 w-full md:w-1/2"
                      : "translate-x-full"
                  } transition-transform duration-300 ease-in-out overflow-auto p-6`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Add Event Details</h2>
                    <button
                      onClick={closePanel}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      ✖
                    </button>
                  </div>
                  <NewEventForm closePanel={closePanel} event={events} />
                </div>
              </section> */}
            </div>
          )}

          {isClose && (
            <div
              className="top-0 right-0 border h-fit w-fit border-red-500 cursor-pointer"
              onClick={closeTheComponent}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          {isOpen && <CheckAll />}
        </div>
      </section>
    </>
  );
};
export default Events;
