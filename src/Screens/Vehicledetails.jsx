/* eslint-disable no-unused-vars */
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useState } from "react";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";
import AutoCompleteSearch from "../Components/CustomAutoComplete";

const Vehicledetails = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selecteddetails, setSelectedDetails] = useState(null);
  const [Vehicles, setVehicles] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const [vehicleMake, setVehicleMake] = useState("");
  const [model, setModel] = useState("");
  const [cc, setCc] = useState("");
  const [regNo, setRegNo] = useState("");
  const [engineNo, setEngineNo] = useState("");
  const [chasisNo, setChasisNo] = useState("");
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(null);
  const [image, setImage] = useState(null);
  const [RCValidTill, setRCValidTill] = useState("");
  const [insuranceValidTill, setInsuranceValidTill] = useState("");
  const [rcNumb, setRcNumb] = useState("");
  const [insuranceNumb, setInsuranceNumb] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vehicleMake", vehicleMake);
    formData.append("model", model);
    formData.append("cc", cc);
    formData.append("regNo", regNo);
    formData.append("engineNo", engineNo);
    formData.append("chasisNo", chasisNo);
    if (file) formData.append("vehiclePhoto", file);
    if (upload) formData.append("insurancePhoto", upload);
    if (image) formData.append("rcPhoto", image);

    console.log("Data being sent:", Object.fromEntries(formData.entries()));

    try {
      const response = await axios.post(`${BASE_URL}/api/Vehicle`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Vehicle registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering vehicle:", error);
    }

    setVehicleMake("");
    setModel("");
    setCc("");
    setRegNo("");
    setEngineNo("");
    setChasisNo("");
    setFile(null);
    setUpload(null);
    setImage(null);
    setRcNumb("");
    setRCValidTill("");
    setInsuranceNumb("");
    setInsuranceValidTill("");
  };

  const handleCancel = () => {
    setVehicleMake("");
    setModel("");
    setCc("");
    setRegNo("");
    setEngineNo("");
    setChasisNo("");
    setFile(null);
    setImage("");
    setUpload("");
    setRcNumb("");
    setRCValidTill("");
    setInsuranceNumb("");
    setInsuranceValidTill("");
  };

  const handleVehicleDataReceived = (data) => {
    setVehicleData(data);
  };

  const handleDriverSelect = async (vehicle) => {
    console.log("vehicle", vehicle);

    setSelectedVehicle(vehicle);
    if (vehicle.driverId) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/vehicle/${vehicle.driverId}`
        );
        console.log("response", response);
        setSelectedDetails(response.data);
        setVehicles(response.data);
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section className="w-full min-h-screen">
        <div className="h-24 w-full shadow-md p-1">
          <Newheader />
        </div>

        <div className="flex h-[calc(100vh-6rem)] w-full">
          <div className="bg-gray-100">
            <MainSideBar />
          </div>
          <div className="w-full bg-white shadow-lg p-6 rounded-lg">
            <div className="w-full flex justify-center">
              <form className="w-1/2 ">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only  ">
                  Search
                </label>
                <AutoCompleteSearch
                  searchType="vehicle"
                  onDataReceived={handleVehicleDataReceived}
                  onSelect={handleDriverSelect}
                />
              </form>
            </div>

            <form className="w-full mx-auto p-3 rounded-md shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Vehicle Details
              </h2>
              <div className="w-full flex gap-8 items-center">
                <div className="flex flex-col gap-5 w-1/3">
                  <div>
                    <label className="block text-sm font-bold">
                      Vehicle Make
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      placeholder="Enter vehicle make"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold">Model</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Enter model"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold">CC</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      placeholder="Enter CC"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5 w-1/3">
                  <div>
                    <label className="block text-sm font-bold">
                      Registration No
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      placeholder="Enter registration number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold">Engine No</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={engineNo}
                      onChange={(e) => setEngineNo(e.target.value)}
                      placeholder="Enter engine number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold">
                      Chassis No
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={chasisNo}
                      onChange={(e) => setChasisNo(e.target.value)}
                      placeholder="Enter chassis number"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center w-1/3">
                  <label className="block text-sm font-bold mb-2">
                    Upload Vehicle Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {file ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Uploaded"
                        className="h-full object-cover rounded-lg"
                      />
                    ) : (
                      <p className="text-sm text-gray-500">
                        Click to upload or drag & drop
                      </p>
                    )}
                  </label>
                  {file && (
                    <p className="text-sm text-gray-600 mt-2">
                      File: {file.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-full lg:w-1/2">
                  <div className="flex gap-6 items-center overflow-scroll">
                    <div className="w-1/2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Upload RC Book
                      </label>
                      <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          id="license-file-upload"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                        <label
                          htmlFor="license-file-upload"
                          className="flex flex-col items-center justify-center w-full h-full"
                        >
                          <svg
                            className="w-6 h-6 text-gray-500"
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
                          {image && (
                            <img
                              src={URL.createObjectURL(image)}
                              alt="FMSCI License Preview"
                              className="w-full h-full object-fill"
                            />
                          )}
                        </label>
                      </div>
                      {image && (
                        <p className="text-sm text-gray-600 mt-2">
                          File: {image.name}
                        </p>
                      )}
                    </div>

                    <div className="w-1/2">
                      <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          RC Number
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                          value={rcNumb}
                          onChange={(e) => setRcNumb(e.target.value)}
                          placeholder="Enter your RC number"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          Till Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                          value={RCValidTill}
                          onChange={(e) => setRCValidTill(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-full lg:w-1/2">
                  <div className="flex gap-6 items-center">
                    <div className="w-1/2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Upload Insurance
                      </label>
                      <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          id="fmsci-file-upload"
                          onChange={(e) => {
                            setUpload(e.target.files[0]);
                          }}
                        />
                        <label
                          htmlFor="fmsci-file-upload"
                          className="flex flex-col items-center justify-center w-full h-full"
                        >
                          <svg
                            className="w-6 h-6 text-gray-500"
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
                          {upload && (
                            <img
                              src={URL.createObjectURL(upload)}
                              alt="FMSCI License Preview"
                              className="w-full h-full object-fill"
                            />
                          )}
                        </label>
                      </div>
                      {upload && (
                        <p className="text-sm text-gray-600 mt-2">
                          File: {upload.name}
                        </p>
                      )}
                    </div>

                    <div className="w-1/2">
                      <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          Insurance Number
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                          value={insuranceNumb}
                          onChange={(e) => setInsuranceNumb(e.target.value)}
                          placeholder="Enter your Insurance number"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          Till Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                          value={insuranceValidTill}
                          onChange={(e) =>
                            setInsuranceValidTill(e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-5">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-300 text-black rounded "
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 bg-cyan-600 text-white rounded "
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Vehicledetails;
