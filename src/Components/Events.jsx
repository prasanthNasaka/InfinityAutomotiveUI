import { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";

const Events = () => {
  const [eventData, setEventData] = useState({
    eventType: "Autocross",
    eventName: "Race Event",
    dateRange: { start: new Date(), end: new Date() },
    status: "active",
    location: "Race Track",
    geoLocation: "https://maps.example.com",
    bannerImage: null,
    bankDetails: {
      bankName: "HDFC",
      ifscCode: "HDFC0001234",
      accountHolderName: "John Doe",
      accountNumber: "1234567890",
      qrCode: null,
    },
    categories: [
      {
        category: "Beginner",
        participants: 10,
        laps: 5,
        entryPrice: 100,
      },
      {
        category: "Advanced",
        participants: 15,
        laps: 10,
        entryPrice: 200,
      },
    ],
  });

  const [events, setEvents] = useState([]); // To store fetched events
  const [expandedCategories, setExpandedCategories] = useState({}); // To manage expanded state of categories

  const handleInputChange = (e, field) => {
    setEventData({
      ...eventData,
      [field]: e.target.value,
    });
  };

  const handleDateChange = (date, field) => {
    setEventData({
      ...eventData,
      dateRange: {
        ...eventData.dateRange,
        [field]: date,
      },
    });
  };

  const handleBannerImageChange = (e) => {
    setEventData({
      ...eventData,
      bannerImage: e.target.files[0],
    });
  };

  const handleQRCodeChange = (e) => {
    setEventData({
      ...eventData,
      bankDetails: {
        ...eventData.bankDetails,
        qrCode: e.target.files[0],
      },
    });
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

  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now(), // Unique ID for the category
      category: "",
      participants: 0,
      laps: 0,
      entryPrice: 0,
    };
    setEventData({
      ...eventData,
      categories: [...eventData.categories, newCategory],
    });
  };

  const handleCategoryChange = (id, field, value) => {
    const updatedCategories = eventData.categories.map((cat) =>
      cat.id === id ? { ...cat, [field]: value } : cat
    );
    setEventData({
      ...eventData,
      categories: updatedCategories,
    });
  };

  const handleDeleteCategory = (id) => {
    const updatedCategories = eventData.categories.filter(
      (cat) => cat.id !== id
    );
    setEventData({
      ...eventData,
      categories: updatedCategories,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append event data to formData
    formData.append("eventtype", eventData.eventType);
    formData.append("eventname", eventData.eventName);
    formData.append("startdate", eventData.dateRange.start.toISOString());
    formData.append("enddate", eventData.dateRange.end.toISOString());
    formData.append("isactive", eventData.status === "active" ? "yes" : "no");
    formData.append("showdashboard", "yes");
    formData.append("eventstatus", 1);
    formData.append("bankname", eventData.bankDetails.bankName);
    formData.append("ifsccode", eventData.bankDetails.ifscCode);
    formData.append("accountname", eventData.bankDetails.accountHolderName);
    formData.append("accountnum", eventData.bankDetails.accountNumber);
    formData.append("location", eventData.location);
    formData.append("gmapLocation", eventData.geoLocation);

    // Append banner image
    if (eventData.bannerImage) {
      formData.append("banner", eventData.bannerImage);
    }

    // Append QR code image
    if (eventData.bankDetails.qrCode) {
      formData.append("qrpath", eventData.bankDetails.qrCode);
    }

    // Append categories
    eventData.categories.forEach((category, index) => {
      formData.append(`lstcat[${index}].category`, category.category);
      formData.append(`lstcat[${index}].participants`, category.participants);
      formData.append(`lstcat[${index}].laps`, category.laps);
      formData.append(`lstcat[${index}].entryPrice`, category.entryPrice);
    });

    console.log("formData", formData);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/EventRegistration`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper content type for file uploads
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Network response was not ok");
      }

      console.log("Success:", response.data);
      alert("Event submitted successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit event.");
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/EventRegistration`);
      console.log("Response:", response.data.$values);
      setEvents(response.data.$values);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="h-auto w-full flex flex-col p-6 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-6 rounded-lg bg-white shadow-lg p-4"
      >
        <h2 className="text-2xl font-bold text-center">Event Form</h2>
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
              <option>Autocross</option>
              <option>Drag</option>
              <option>Sprint</option>
              <option>Rally</option>
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

        {/* Event Duration */}
        <div className="w-full flex gap-2 bg-gray-50 rounded-lg p-3 h-auto">
          <div className="flex w-1/2 flex-col gap-2">
            <div className="flex items-center">
              <label className="block w-full text-sm font-bold text-gray-700">
                Event Duration
              </label>
            </div>
            <div className="flex items-center justify-center gap-2 w-full">
              <div className="flex flex-col w-3/4 gap-3">
                <div className="relative w-60">
                  <DatePicker
                    selected={eventData.dateRange.start}
                    onChange={(date) => handleDateChange(date, "start")}
                    dateFormat="dd-MM-yyyy"
                    className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                    placeholderText="Start Date (dd-mm-yyyy)"
                    minDate={new Date()}
                    required
                  />
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
                </div>

                <div className="relative w-60">
                  <DatePicker
                    selected={eventData.dateRange.end}
                    onChange={(date) => handleDateChange(date, "end")}
                    dateFormat="dd-MM-yyyy"
                    className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                    placeholderText="End Date (DD-MM-YYYY)"
                    minDate={eventData.dateRange.start || new Date()}
                    required
                  />
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex w-1/2 flex-col gap-2">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Status</h3>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={eventData.status === "active"}
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
                    value="inactive"
                    checked={eventData.status === "inactive"}
                    onChange={(e) => handleInputChange(e, "status")}
                    className="w-4 h-4 text-cyan-600 border-gray-300"
                  />
                  <span className="ml-2 text-sm font-bold text-gray-700">
                    Inactive
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Location and Geo-location */}
        <div className="w-full flex gap-2 bg-gray-50 rounded-lg p-3 h-auto">
          <div className="flex flex-col gap-2 w-3/4">
            <div className="w-full">
              <label className="block text-sm font-bold text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={eventData.location}
                onChange={(e) => handleInputChange(e, "location")}
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
                value={eventData.geoLocation}
                onChange={(e) => handleInputChange(e, "geoLocation")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter Geo Location URL"
                required
              />
            </div>
          </div>
        </div>

        {/* Upload Banner */}
        <div className="w-full flex gap-2 bg-gray-50 rounded-lg p-3 h-auto">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Upload Banner</h3>
            <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
              <label className="cursor-pointer w-full h-full flex items-center justify-center">
                {eventData.bannerImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={URL.createObjectURL(eventData.bannerImage)}
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
                      <span className="font-bold">Click to upload</span> or drag
                      and drop
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

        {/* Bank Details */}
        <div className="w-full bg-gray-100 p-3 rounded-lg">
          <div className="text-xl font-bold mb-4">Bank Details</div>
          <div className="flex gap-4">
            <div className="flex w-1/2">
              <div className="flex flex-col gap-3 w-full">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={eventData.bankDetails.bankName}
                    onChange={(e) => handleBankDetailsChange(e, "bankName")}
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
                    onChange={(e) => handleBankDetailsChange(e, "ifscCode")}
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

            {/* Upload QR Code */}
            <div className="w-1/2">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">Upload QR Code</h3>
                <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
                  <label className="cursor-pointer w-full h-full flex items-center justify-center">
                    {eventData.bankDetails.qrCode ? (
                      <div className="relative w-full h-full">
                        <img
                          src={URL.createObjectURL(
                            eventData.bankDetails.qrCode
                          )}
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
                                qrCode: null,
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
                          <span className="font-bold">Click to upload</span> or
                          drag and drop
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

        {/* Categories */}
        {eventData.categories.map((category, index) => (
          <div key={category.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Category {index + 1}</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedCategories({
                      ...expandedCategories,
                      [category.id]: !expandedCategories[category.id],
                    })
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expandedCategories[category.id] ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>

            {expandedCategories[category.id] && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={category.category}
                      onChange={(e) =>
                        handleCategoryChange(
                          category.id,
                          "category",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="block text-sm font-bold text-gray-700">
                        Participants
                      </label>
                      <input
                        type="number"
                        value={category.participants}
                        onChange={(e) =>
                          handleCategoryChange(
                            category.id,
                            "participants",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700">
                        Laps
                      </label>
                      <input
                        type="number"
                        value={category.laps}
                        onChange={(e) =>
                          handleCategoryChange(
                            category.id,
                            "laps",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        value={category.entryPrice}
                        onChange={(e) =>
                          handleCategoryChange(
                            category.id,
                            "entryPrice",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Category and Submit Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddCategory}
            className="flex items-center gap-2 bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            <Plus size={20} />
            Add Category
          </button>
          <button
            type="submit"
            className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Submit Event
          </button>
        </div>
      </form>

      {/* Event Table */}
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4">Event List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Event Name</th>
              <th className="border border-gray-300 p-2">Event Type</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Bank Name</th>
              <th className="border border-gray-300 p-2">Account Number</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.$id}>
                <td className="border border-gray-300 p-2">
                  {event.eventname}
                </td>
                <td className="border border-gray-300 p-2">
                  {event.eventtype}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(event.startdate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(event.enddate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">{event.isactive}</td>
                <td className="border border-gray-300 p-2">{event.location}</td>
                <td className="border border-gray-300 p-2">{event.bankname}</td>
                <td className="border border-gray-300 p-2">
                  {event.accountnum}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
