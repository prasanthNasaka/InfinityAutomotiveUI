/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { LuBike } from "react-icons/lu";
import { BASE_URL, IMAGE_URL } from "../constants/global-const";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import AutoCompleteSearch from "../Components/CustomAutoComplete";

const RegistrationDeskPopUp = () => {
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
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [DrvtableData, setDrvTableData] = useState([]);
  const [eventId, setEventId] = useState(false);
  const [addDocVerify, setAddDocVerify] = useState(97);

  const handleEventChange = (event) => {
    const selectedEventId = event.target.value;

    setEventId(selectedEventId);
    setSelectedEvent(selectedEventId);
    setSelectedCategory("");
    setTableData([]);

    if (selectedEventId) {
      fetch(`${BASE_URL}/api/eventcategories?event_id=${selectedEventId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.$values)) {
            setCategories(data.$values);
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
          if (data && Array.isArray(data.$values)) {
            const updatedData = data.$values.map((item) => ({
              ...item,
              driverPhotoUrl: item.driverPhoto
                ? `${IMAGE_URL}${item.driverPhoto}`
                : null,
              hasPhoto: !!item.driverPhoto,
            }));

            console.log("Updated Data:", updatedData);
            setTableData(updatedData);
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
        (d) => d.driverId === item.driverId
      );
      console.log("Filtered Table Data:", FilteredDrvData);

      setDrvTableData(FilteredDrvData);
      setSelectedDriver(item);

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
      referenceNumber &&
      !error
    );
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
        documentStatus: parseInt(addDocVerify) || 97, //97 pending 98 verified
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
    } catch {
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUpdatedData = async () => {
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
  };

  useEffect(() => {
    fetchUpdatedData();
  }, []);

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="flex h-[calc(100vh-6rem)] overflow-hidden">
        <div className=" h-full"></div>

        <div className="flex-1 p-3 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg  border mb-6">
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

                  <div className="w-full flex p-2  gap-2 tab:flex-col items-center">
                    <div className="w-1/2 tab:w-full flex items-center px-2">
                      <div className="w-1/2">
                        <label
                          htmlFor="contestantNumber"
                          className="block text-md"
                        >
                          Contestant Number
                        </label>
                        <input
                          id="contestantNumber"
                          type="text"
                          value={value}
                          onChange={numberInput}
                          disabled
                          className="p-2 w-full bg-gray-50 border border-gray-300 rounded-lg"
                        />
                        {error && (
                          <span className="text-sm text-red-500">{error}</span>
                        )}
                      </div>

                      <div className="w-1/2 flex flex-col">
                        <label htmlFor="referenceNumber" className="text-md">
                          Number:
                        </label>
                        <input
                          id="referenceNumber"
                          type="text"
                          value={referenceNumber}
                          onChange={(e) => setReferenceNumber(e.target.value)}
                          placeholder="Enter Ref Number"
                          className="p-2 w-full bg-gray-50 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="w-1/2  tab:w-full flex items-center justify-end px-2">
                      <div className="w-2/3 flex justify-center items-end">
                        <button
                          type="button"
                          disabled={!isFormValid() || isSubmitting}
                          onClick={handleSubmit}
                          className={`w-full px-6 py-2.5 text-white font-medium rounded-lg text-sm transition-all flex items-center justify-center
          ${
            isFormValid() && !isSubmitting
              ? "bg-cyan-500 hover:bg-cyan-600 hover:text-black duration-300"
              : "bg-gray-400 cursor-not-allowed"
          }`}
                        >
                          {isSubmitting ? "Submitting..." : "Add Contestant"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {DrvtableData && DrvtableData.length > 0 && (
                  <div className="min-h-auto ">
                    <div className="border rounded-lg p-2  overflow-hidden bg-white shadow-md">
                      <div className="overflow-x-auto border-b-2">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                            <tr>
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
                                <td className="px-6 py-2 whitespace-nowrap font-medium text-gray-900">
                                  {index + 1}
                                </td>

                                <td className="px-6 py-2 whitespace-nowrap">
                                  {event.regNumb}
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                  {event.evtCategory}
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap flex gap-2 justify-center  ">
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
                    </div>
                  </div>
                )}
              </div>
            </div>
            {tableData && tableData.length > 0 && (
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
                            Driver Photo
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Vehicle
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">Class</th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Contestant Number
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-center uppercase">
                        {tableData.map((event, index) => (
                          <tr
                            key={event.regId}
                            className="bg-white hover:bg-gray-50"
                          >
                            <td className="px-6 py-2 whitespace-nowrap font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-gray-900">
                              {event.drivername}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap flex justify-center">
                              <div className="border w-10 h-10 rounded-full">
                                {event.driverPhotoUrl ? (
                                  <img
                                    src={event.driverPhotoUrl}
                                    alt="Driver"
                                    className="w-10 h-10 rounded-full"
                                  />
                                ) : (
                                  <IoPerson size={24} />
                                )}
                              </div>
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
      <Toaster position="bottom-center" reverseOrder={true} />
    </section>
  );
};

export default RegistrationDeskPopUp;
