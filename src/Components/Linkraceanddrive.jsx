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
import { HandCoins, Trash } from "lucide-react";

const Linkraceanddrive = () => {
  const [amountPaidChecked, setAmountPaidChecked] = useState(false);
  const [amountPaidForSelectedChecked, setAmountPaidForSelectedChecked] =
    useState(false);
  const [childCheckboxChecked, setChildCheckboxChecked] = useState(false);
  // const [selectedReferenceNumber, setSelectedReferenceNumber] = useState("");
  const [driverData, setDriverData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
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
  const [selectedRows, setSelectedRows] = useState({});
  const [isOpen, setIsOpen] = useState(false);


  const handleAmountPaidChange = (e) => {
    setAmountPaidChecked(e.target.checked);
  };

  const handleChildCheckboxChange = (e, id) => {
    setChildCheckboxChecked(e.target.checked);
    setSelectedRows((prev) => ({
      ...prev,
      [id]: e.target.checked,
    }));
  };

  const onInpuChange = () => {
    console.log("uytrertyhgfgv");
  };

  const handleEventChange = (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    setSelectedCategory("");
    setTableData([]);

    if (eventId) {
      fetch(`${BASE_URL}/api/eventcategories?event_id=${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.$values)) {
            setCategories(data.$values);
          } else {
            setCategories([]);
          }
        })
        .catch((error) => {
          setCategories([]);
        });

      fetch(`${BASE_URL}/api/Registration/event/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.$values)) {
            setTableData(data.$values);
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
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
        (d) => d.driverId == item.driverId
      );
      console.log("FilteredDrvData", FilteredDrvData);
      setDrvTableData(FilteredDrvData);
      setSelectedDriver(item);

      if (item) {
        setDriverImageUrl(
          item.driverPhoto ? `${IMAGE_URL}${item.driverPhoto}` : null
        );
      } else {
        setDriverImageUrl("");
      }
    } else if (type === "vehicle") {
      setSelectedVehicle(item);

      if (item) {
        setVehicleImageUrl(
          item.vehiclePhoto ? `${IMAGE_URL}${item.vehiclePhoto}` : null
        );
      } else {
        setVehicleImageUrl("");
      }
    }
  };
  const handleAmountPaidForSelectedClick = () => {
    setAmountPaidForSelectedChecked((prevChecked) => {
      const newCheckedState = !prevChecked;

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          selectedRows[event.id]
            ? { ...event, amountPaid: newCheckedState }
            : event
        )
      );

      return newCheckedState;
    });
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
      (!amountPaidChecked || (amountPaidChecked && referenceNumber)) &&
      !error
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.success("Successfully added");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/api/Registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vechId: parseInt(selectedVehicle?.vehicleId) || 0,
          driverId: parseInt(selectedDriver?.driverId) || 0,
          eventId: parseInt(selectedEvent) || 0,
          eventcategoryId: parseInt(selectedCategory) || 0,
          contestantNo: parseInt(value) || 0,
          amountPaid: amountPaidChecked,
          referenceNo: referenceNumber || "",
        }),
      });
      if (response.code === 201) {
        handleGetData();
      }
      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSelectedEvent("");
      setSelectedCategory("");
      setSelectedDriver(null);
      setSelectedVehicle(null);
      setValue("");
      setAmountPaidChecked(false);
      setReferenceNumber("");
      setVehicleImageUrl("");
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
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

  const handleEdit = (eventId) => {
    console.log("eventid", eventId);
    const event_id = eventId.eventId;
    fetch(`${BASE_URL}/api/EventRegistration/${event_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vechId: parseInt(selectedVehicle?.vehicleId) || 0,
        driverId: parseInt(selectedDriver?.driverId) || 0,
        eventId: parseInt(selectedEvent) || 0,
        eventcategoryId: parseInt(selectedCategory) || 0,
        contestantNo: parseInt(value) || 0,
        amountPaid: amountPaidChecked,
        referenceNo: referenceNumber || "",
      }),
    })
      .then((response) => response.json())
      .then(() => {
        handleGetData();
      })
      .catch((error) => console.error("Error editing event:", error));
  };

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      fetch(`${BASE_URL}/api/EventRegistration/${eventId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            handleGetData();
          } else {
            throw new Error("Failed to delete event");
          }
        })
        .catch((error) => console.error("Error deleting event:", error));
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/EventRegistration/ActiveEvents`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.$values)) {
          setEvents(data.$values);
        } else {
          console.error("Expected an array of events, but received:", data);
          setEvents([]);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="w-full h-24 overflow-y-hidden shadow-lg">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-6rem)] overflow-hidden">
        <div className=" h-full">
          <div className="h-full ">
            <MainSideBar />
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border mb-6">
              <div className="p-2">
                <h3 className="text-2xl font-semibold text-center text-gray-900">
                  Registration
                </h3>
              </div>

              <div className="p-4">
                <div className="w-full h-full border-1 shadow-md p-2 border mb-4 rounded-lg">
                  <div className="w-full flex p-2 gap-2 tab:flex-col">
                    <div className="w-1/2 tab:w-full">
                      <label className="text-sm font-medium text-gray-900">
                        Event Name
                      </label>
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
                      <label className="text-sm font-medium text-gray-900">
                        Event Class
                      </label>
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

                          <div className="w-1/2 flex flex-col gap-4 justify-center">
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
                          <div className="w-1/2 flex flex-col gap-4 justify-center">
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
                        <div className="relative">
                          <input
                            value={value}
                            onChange={numberInput}
                            type="text"
                            className="peer block w-full appearance-auto border-b-2 border-gray-100 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 
                     focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-200 dark:text-black dark:focus:border-blue-500"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder=" "
                          />
                          <label
                            htmlFor="Contestent Number"
                            className="absolute left-2 top-3 text-sm text-gray-500 transition-all 
                     peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 
                     peer-focus:top-1 peer-focus:scale-75 peer-focus:text-cyan-600"
                          >
                            Contestant Number
                          </label>
                        </div>
                        {error && (
                          <span className="text-sm text-red-500">{error}</span>
                        )}
                      </div>

                      <div className="w-1/3 flex justify-end ">
                        <button
                        onClick={() => setIsOpen(true)}
                          type="button"
                          className="tab:w-full px-6 py-2.5 bg-cyan-500 text-white hover:bg-cyan-600 hover:text-black transition-all duration-300
                            
font-medium rounded-md text-sm "
                        >
                          Show List
                        </button>
                      </div>

                      <div className="w-1/3 flex ml-8 items-center  p-2 rounded">
                        <input
                          type="checkbox"
                          id="documentVerified"
                          className="accent-cyan-600 w-4 h-4 border-gray-100 hover:cursor-pointer"
                        />
                        <label
                          htmlFor="documentVerified"
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
                          htmlFor="amountPaid"
                          className="text-md text-black hover:cursor-pointer"
                        >
                          Amount Paid
                        </label>
                      </div>

                      {amountPaidChecked && (
                        <div className="w-1/3 flex items-center mr-24">
                          <label className="text-md" htmlFor="referenceNumber">
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
                          className={`tab:w-full px-6 py-2.5 text-white font-medium rounded-lg text-sm transition-all 
          ${
            isFormValid() && !isSubmitting
              ? "bg-cyan-600 hover:bg-cyan-700 hover:text-white transition-all duration-300"
              : "bg-gray-400 cursor-not-allowed"
          }`}
                        >
                          {isSubmitting ? "Submitting..." : "Add Contestant"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal Content */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-gray-800">Popup Modal</h2>
            <p className="mt-2 text-gray-600">Blocked Contest</p>

            <span></span>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

                {DrvtableData.length > 0 && (
                  <div className="min-h-auto ">
                    <div className="border rounded-lg p-2  overflow-hidden bg-white shadow-md">
                      <div className="overflow-x-auto border-b-2">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                            <tr>
                              <th className="px-6 py-3 whitespace-nowrap">
                                {/* <button className="p-2 bg-cyan-500 hover:bg-cyan-600 border  text-white rounded-lg transition-colors"> */}
                                  Select
                                {/* </button> */}
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
                                    name=""
                                    id=""
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
                                <td className="px-6 py-2 whitespace-nowrap flex gap-2">
                                  {/* {event.contestantNo} */}
                                  <input
                                    className="border border-gary-100 rounded-lg p-2"
                                    value={event.contestantNo}
                                    onChange={onInpuChange}
                                    type="text"
                                  />
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                  <span
                                    className={`p-2 rounded-full text-xs ${
                                      event.amountPaid
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {event.amountPaid ? "Paid" : "Pending"}
                                  </span>

                                 
                                </td>

                                <td className="px-6 py-2 whitespace-nowrap">
                                  <span
                                    className={`p-2 rounded-full text-xs ${
                                      event.documentStatus === "0"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {event.documentStatus === "0"
                                      ? "Pending "
                                      : "Verified"}
                                  </span>
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                  <span
                                    className={`p-2 rounded-full text-xs ${
                                      event.scrutinyStatus === "0"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : event.scrutinyStatus === "1"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {event.scrutinyStatus === "0"
                                      ? "Pending"
                                      : event.scrutinyStatus === "1"
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
                              type="button"
                              className="tab:w-full px-6 py-2.5 bg-cyan-500 text-white hover:bg-cyan-600 hover:text-black transition-all duration-300 font-medium rounded-md text-sm "
                            >
                              Document Verified for Selected
                            </button>
                           
                          </div>

                          <div className="flex w-1/2 justify-end items-center gap-1 ">
                            <button
                              onClick={handleAmountPaidForSelectedClick}
                              type="button"
                              className={`tab:w-full px-6 py-2.5 font-medium rounded-md text-sm transition-all duration-300 ${
                                amountPaidForSelectedChecked
                                  ? "bg-cyan-500 text-white"
                                  : "bg-gray-500 text-white hover:bg-gray-600 hover:text-white"
                              }`}
                            >
                              {amountPaidForSelectedChecked
                                ? "Amount Paid Selected"
                                : "Select Amount Paid"}
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
                                Number:
                              </label>
                              <input
                                placeholder="Enter Ref Number"
                                className="p-2 bg-gray-50 border border-gray-100 rounded-lg"
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="w-1/3 flex justify-end">
                            <button
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
                    </div>
                  </div>
                )}
              </div>
            </div>
            {tableData.length > 0 && (
              <div className="min-h-auto">
                <div className="border rounded-lg overflow-hidden bg-white shadow-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                        <tr>
                          <th className="px-6 py-3 whitespace-nowrap">SL.No</th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Driver Name
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Vehicle
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">Class</th>
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
                        {tableData.map((event, index) => (
                          <tr
                            key={event.eventid}
                            className="bg-white hover:bg-gray-50"
                          >
                            <td className="px-6 py-2 whitespace-nowrap font-medium text-gray-900">
                              {index + 1}
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
                                  event.amountPaid === true
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {event.amountPaid === true ? "Paid" : "Pending"}
                              </span>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap">
                              <span
                                className={`p-2 rounded-full text-xs ${
                                  event.documentStatus === "0"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {event.documentStatus === "0"
                                  ? "Pending"
                                  : "Verified"}
                              </span>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              <span
                                className={`p-2 rounded-full text-xs ${
                                  event.scrutinyStatus === "0"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : event.scrutinyStatus === "1"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {event.scrutinyStatus === "0"
                                  ? "Pending"
                                  : event.scrutinyStatus === "1"
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
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};

export default Linkraceanddrive;
