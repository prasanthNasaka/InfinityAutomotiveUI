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

import Modal from "./Modal";

const Events = () => {
  const dispatch = useDispatch();
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

  const handleSubmit = (e) => {
    e.preventDefault();

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
      setFile(URL.createObjectURL(e.target.files[0])); // Create a preview URL
    }
  };

  const handleQrChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setQrFile(URL.createObjectURL(e.target.files[0])); // Create a preview URL
    }
  };

  const handleReupload = () => {
    setFile(null); // Reset the file
  };

  const handleQrReupload = () => {
    setQrFile(null);
  };

  

  return (
    <>
      <section className="w-full h-full">
        <div className="h-24 w-full">
          <Newheader />
        </div>

        <div className="flex h-[calc(100vh-6rem)] ">
          <div className="bg-gray-100">
            <MainSideBar />
          </div>
          {/* body */}
          <div id="form" className=" border w-full overflow-auto">
            <section className="h-auto w-full flex p-2 justify-center items-center  ">
              <form
                className="h-auto w-3/4 flex flex-col items-center gap-4 rounded-lg bg-gray-100/10 border shadow-lg p-6"
                onSubmit={handleSubmit}
              >
                <h2 className="text-xl font-semibold ">
                  {selectedEvent ? "Edit Event" : "Event Form"}
                </h2>

                <div className="flex flex-col w-full">
                  <div className="w-full flex items-center justify-between mb-4">
                    <label
                      htmlFor="events"
                      className="text-sm font-medium text-gray-900 w-1/4"
                    >
                      Event Type
                    </label>
                    <select
                      id="Etype"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
                    >
                      <option value="">Select Event Type</option>
                      <option>Autocross</option>
                      <option>Drag</option>
                      <option>Sprint</option>
                      <option>Rally</option>
                    </select>
                  </div>

                  <div className="w-full flex items-center justify-between mb-4">
                    <label
                      htmlFor="Ename"
                      className="text-sm font-medium text-gray-900 w-1/4"
                    >
                      Event Name
                    </label>
                    <input
                      type="text"
                      id="Ename"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                      placeholder="Enter Your Event Name"
                      required
                    />
                  </div>

                  <div className="w-full flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-900 w-1/4">
                      Date Range
                    </label>
                    <div className="flex w-3/4 gap-4">
                      <DatePicker
                        selected={dateRange.start}
                        onChange={(date) =>
                          setDateRange({ ...dateRange, start: date })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                        placeholderText="Start Date"
                        minDate={new Date()}
                        required
                      />
                      <span className="mx-2 pt-1 text-gray-500">to</span>
                      <DatePicker
                        selected={dateRange.end}
                        onChange={(date) =>
                          setDateRange({ ...dateRange, end: date })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                        placeholderText="End Date"
                        minDate={dateRange.start || new Date()}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col  w-full">
                  {/* Bank details */}
                  <div className="w-full flex">
                    <div className="w-1/2 ">
                      <div className="w-full  flex items-center justify-between mb-4">
                        <label
                          htmlFor="Ename"
                          className="text-sm font-medium text-gray-900 w-1/4"
                        >
                          Bank Name
                        </label>
                        <input
                          type="text"
                          id="Ename"
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                          placeholder="Enter Your Event Name"
                          required
                        />
                      </div>
                      <div className="w-full flex items-center justify-between mb-4">
                        <label
                          htmlFor="Ename"
                          className="text-sm font-medium text-gray-900 w-1/4"
                        >
                          Account Number
                        </label>
                        <input
                          type="text"
                          id="Ename"
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                          placeholder="Enter Your Event Name"
                          required
                        />
                      </div>
                      <div className="w-full flex items-center justify-between mb-4">
                        <label
                          htmlFor="Ename"
                          className="text-sm font-medium text-gray-900 w-1/4"
                        >
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          id="Ename"
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                          placeholder="Enter Your Event Name"
                          required
                        />
                      </div>
                      <div className="w-full flex items-center justify-between mb-4">
                        <label
                          htmlFor="Ename"
                          className="text-sm font-medium text-gray-900 w-1/4"
                        >
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          id="Ename"
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                          placeholder="Enter Your Event Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center h-full w-1/2 ">
                      <div className="flex justify-center ">
                        <span className=" text-lg font-medium text-gray-900">
                          Upload QR Code
                        </span>
                      </div>
                      <div className="flex items-center justify-center w-full rounded-lg p-4">
                        <label
                          htmlFor="qr-dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
                            {!qrFile && (
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500"
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
                            )}

                            {qrFile ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={qrFile}
                                  alt="Uploaded banner preview"
                                  className="w-full h-full object-fill rounded-lg"
                                />
                                <div className="absolute bottom-4 right-4">
                                  <button
                                    type="button"
                                    onClick={handleQrReupload}
                                    className="bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 focus:outline-none"
                                  >
                                    Re-upload
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="mb-2 text-sm text-gray-500">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                  SVG, PNG, JPG, or GIF (MAX. 800x400px)
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            id="qr-dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleQrChange}
                            aria-label="Upload file"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* upload section */}

                <div className="w-full h-full flex justify-between">
                  {/* status */}
                  <div className="w-1/2 ">
                    <div className="flex flex-col items-start">
                      <span className="block text-sm font-medium text-gray-900">
                        Status
                      </span>
                      <div className="flex mt-2">
                        <label className="flex items-center mr-4">
                          <input
                            type="radio"
                            name="status"
                            value="active"
                            checked={status === "active"}
                            onChange={() => setStatus("active")}
                            className="w-4 h-4 text-blue-600 border-gray-300"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-900">
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
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            Inactive
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center h-full w-1/2 ">
                    <div className="flex justify-center ">
                      <span className=" text-lg font-medium text-gray-900">
                        Upload Banner
                      </span>
                    </div>
                    <div className="flex items-center justify-center w-full rounded-lg p-4">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
                          {!file && (
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500"
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
                          )}

                          {file ? (
                            <div className="relative w-full h-full">
                              <img
                                src={file}
                                alt="Uploaded banner preview"
                                className="w-full h-full object-fill rounded-lg"
                              />
                              <div className="absolute bottom-4 right-4">
                                <button
                                  type="button"
                                  onClick={handleReupload}
                                  className="bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 focus:outline-none"
                                >
                                  Re-upload
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                SVG, PNG, JPG, or GIF (MAX. 800x400px)
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          aria-label="Upload file"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-center items-center gap-4">
                  {/* Cancel Button (Only if editing an event) */}
                  {selectedEvent && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4"
                    >
                      Cancel
                    </button>
                  )}
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-cyan-500 text-white py-2 px-4 rounded-lg mt-4"
                  >
                    {selectedEvent ? "Update Event" : "Submit"}
                  </button>
                </div>
              </form>
            </section>

            <section className="h-auto">
              {/* Events list table */}
              <section className="h-auto">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
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
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event, index) => (
                        <tr key={index} className="bg-white dark:bg-gray-800">
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
                              className="bg-yellow-500 text-white py-1 px-4 rounded-lg"
                            >
                              View
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={openModal}
                              className="bg-yellow-500 text-white py-1 px-4 rounded-lg"
                            >
                              Add Event Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </section>

            {/* Modal for NewEventForm */}
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              className="overflow-auto  bg-black"
            >
              <NewEventForm closeModal={closeModal} />
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
