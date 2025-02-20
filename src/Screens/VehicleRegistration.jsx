/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { BASE_URL, IMAGE_URL } from "../constants/global-const";
import axios from "axios";
import { X } from "lucide-react";

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-8 py-4 rounded shadow-lg">
      {message}
      <button onClick={onClose} className="ml-4 text-gray-300 hover:text-white">
        <X />
      </button>
    </div>
  );
};

const VehicleRegistration = ({ closePopup }) => {
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
  const [status, setStatus] = useState(1);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !regNo.trim() ||
      !chasisNo.trim() ||
      !engineNo.trim() ||
      !vehicleMake.trim() ||
      !model.trim() ||
      !cc.trim() ||
      !rcNumb.trim() ||
      !RCValidTill ||
      !insuranceNumb.trim() ||
      !insuranceValidTill ||
      !file ||
      !upload ||
      !image
    ) {
      setError("All fields are mandatory.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("RegNumb", regNo);
    formData.append("ChasisNumb", chasisNo);
    formData.append("EngNumber", engineNo);
    formData.append("Make", vehicleMake);
    formData.append("Model", model);
    formData.append("Cc", cc);
    formData.append("VehicleOf", 1);
    formData.append("RcNum", rcNumb);
    formData.append("RcUpto", RCValidTill);
    formData.append("IcNum", insuranceNumb);
    formData.append("IcUpto", insuranceValidTill);
    formData.append("VehiclePhoto", file);
    formData.append("RcImage", image);
    formData.append("InsuranceImage", upload);
    formData.append("Status", true);

    console.log("Data being sent:", Object.fromEntries(formData.entries()));

    try {
      const response = await axios.post(`${BASE_URL}/api/Vehicle`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast(" ✅ Vehicle registered successfully!", response.data);
    } catch (error) {
      console.error("Error registering vehicle:", error);
      if (error.response && error.response.data) {
        console.error("Server response:", error.response.data);
        if (error.response.data.errors) {
          console.error("Validation errors:", error.response.data.errors);
        }
      }
    }

    setRegNo("");
    setChasisNo("");
    setEngineNo("");
    setVehicleMake("");
    setModel("");
    setCc("");
    setRcNumb("");
    setRCValidTill("");
    setInsuranceNumb("");
    setInsuranceValidTill("");
    setFile(null);
    setUpload(null);
    setImage(null);
    setError("");
  };

  const handleCancel = (e) => {
    e.preventDefault();

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
    closePopup();
  };

  const handleVehicleDataReceived = (data) => {
    setVehicleData(data);
  };

  const handleVehicleSelect = async (vehicle) => {
    setSelectedVehicle(vehicle);
    console.log("Vehicle", vehicle);
    if (vehicle.vehicleId) {
      console.log(vehicle.vehicleId);

      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/Vehicle/${vehicle.vehicleId}`
        );
        console.log("response", response);
        setSelectedDetails(response.data);
        console.log("dfghgfdf", response.data);

        setVehicles(response.data);
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selecteddetails) {
      console.log("selectedVehicle:", selecteddetails);

      setVehicleMake(selecteddetails.make || "");
      setModel(selecteddetails.model || "");
      setCc(selecteddetails.cc || "");
      setRegNo(selecteddetails.regNumb || "");
      setEngineNo(selecteddetails.engNumber || "");
      setChasisNo(selecteddetails.chasisNumb || "");
      setRcNumb(selecteddetails.rcNum || "");
      setInsuranceNumb(selecteddetails.icNum || "");
      setRCValidTill(selecteddetails.rcUpto || "");
      setInsuranceValidTill(selecteddetails.icUpto || "");

      setFile(
        selecteddetails.vehiclePhoto
          ? `${IMAGE_URL}${selecteddetails.vehiclePhoto}`
          : null
      );
      setImage(
        selecteddetails.rcImage
          ? `${IMAGE_URL}${selecteddetails.rcImage}`
          : null
      );
      setUpload(
        selecteddetails.insuranceImage
          ? `${IMAGE_URL}${selecteddetails.insuranceImage}`
          : null
      );
    }
  }, [selecteddetails]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setImage(selectedFile);
    showToast("✅ Image uploaded successfully!");
  };
  const handleUploadChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setUpload(selectedFile);
    showToast("✅ Image uploaded successfully!");
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
    showToast("✅ Image uploaded successfully!");
  };
  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
      <div className="flex justify-center items-center">
        <div className="fixed border inset-0 bg-black opacity-100 flex justify-center items-center z-50 transition-opacity duration-1000 ease-in-out ">
          <div className="bg-white w-4/6  h-auto lappy:w-5/6 lappy:h-5/6 lappy:overflow-y-scroll rounded-lg shadow-lg p-4">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 transition z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center">
              Vehicle Details
            </h2>
            <div className="w-full flex gap-8 items-center lappy:flex-col">
              <div className="flex flex-col gap-5 w-1/3 lappy:w-full">
                <div >
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

              <div className="flex flex-col gap-5 w-1/3 lappy:w-full">
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
                  <label className="block text-sm font-bold">Chassis No</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={chasisNo}
                    onChange={(e) => setChasisNo(e.target.value)}
                    placeholder="Enter chassis number"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-1/3 lappy:w-full">
                <label className="block text-sm font-bold mb-2">
                  Upload Vehicle Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {file ? (
                    <img
                      src={
                        file instanceof File ? URL.createObjectURL(file) : file
                      }
                      alt="Driver Photo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-500 text-sm">Click to upload</p>
                  )}
                </label>
                {file && (
                  <p className="text-sm text-gray-600 mt-2">
                    File: {file.name || "Selected from search"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-full lg:w-1/2 ">
                <div className="flex gap-6 items-center lappy:flex-col">
                  <div className="w-1/2 lappy:w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Upload RC Book
                    </label>
                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        id="license-file-upload"
                        onChange={handleImageChange}
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
                        {image ? (
                          <img
                            src={
                              image instanceof File
                                ? URL.createObjectURL(image)
                                : image
                            }
                            alt="Driving License Preview"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <p className="text-gray-500 text-sm">
                            Click to upload
                          </p>
                        )}
                      </label>
                    </div>
                    {image && (
                      <p className="text-sm text-gray-600 mt-2">
                        File: {image.name || "Selected from search"}
                      </p>
                    )}
                  </div>

                  <div className="w-1/2 lappy:w-full">
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
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-full lg:w-1/2">
                <div className="flex gap-6 items-center lappy:flex-col">
                  <div className="w-1/2 lappy:w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Upload Insurance
                    </label>
                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        id="fmsci-file-upload"
                        onChange={handleUploadChange}
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
                        {upload ? (
                          <img
                            src={
                              upload instanceof File
                                ? URL.createObjectURL(upload)
                                : upload
                            }
                            alt="FMSCI License Preview"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <p className="text-gray-500 text-sm">
                            Click to upload
                          </p>
                        )}
                      </label>
                    </div>
                    {upload && (
                      <p className="text-sm text-gray-600 mt-2">
                        File: {upload.name || "Selected from search"}
                      </p>
                    )}
                  </div>

                  <div className="w-1/2 lappy:w-full">
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
                        onChange={(e) => setInsuranceValidTill(e.target.value)}
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
                Clear
              </button>
              <button
                className="px-6 py-3 bg-cyan-600 text-white rounded "
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleRegistration;
