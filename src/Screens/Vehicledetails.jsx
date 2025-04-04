/* eslint-disable no-unused-vars */
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useState, useEffect } from "react";
import { BASE_URL, IMAGE_URL } from "../constants/global-const";
import axios from "axios";
import AutoCompleteSearch from "../Components/CustomAutoComplete";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import AxiosInstance from "../Components/AxiosInstance";
import Styles from "../constants/Styles";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Vehicledetails = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selecteddetails, setSelectedDetails] = useState(null);
  const [Vehicles, setVehicles] = useState(false);
  const [error, setError] = useState("");

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
  const [isEditing, setIsEditing] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

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
      toast.error("All fields are mandatory.");
      return;
    }

    if (!isAgreed) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

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
    formData.append("Status", 1);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      let response;

      if (isEditing) {
        if (!selecteddetails || !selecteddetails.vehicleId) {
          throw new Error("Vehicle ID is required for editing.");
        }

        response = await AxiosInstance.put(
          `${BASE_URL}/api/Vehicle/${selecteddetails.vehicleId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Vehicle updated successfully:", response.data);
      } else {
        response = await AxiosInstance.post(
          `${BASE_URL}/api/Vehicle`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Vehicle registered successfully:", response.data);
      }
    } catch (error) {
      console.error("Error during operation:", error);
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          toast.error("Validation errors occurred. Check console for details.");
        } else {
          toast.error("Server error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred: " + error.message);
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
  };

  const handleVehicleDataReceived = (data) => {
    setVehicleData(data);
  };

  const handleVehicleSelect = async (vehicle) => {
    setSelectedVehicle(vehicle);
    if (vehicle.vehicleId) {
      setLoading(true);
      try {
        const response = await AxiosInstance.get(
          `${BASE_URL}/api/Vehicle/${vehicle.vehicleId}`
        );
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

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setImage(selectedFile);
    toast.success(" Image uploaded successfully!");
  };
  const handleUploadChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setUpload(selectedFile);
    toast.success(" Image uploaded successfully!");
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
    toast.success(" Image uploaded successfully!");
  };

  useEffect(() => {
    if (selecteddetails !== null) {
      setIsEditing(true);
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
    } else {
      setIsEditing(false);
    }
  }, [selecteddetails]);
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
              <div className="bg-white mb-6">
                <div className="w-full  bg-white   overflow-auto">
                  <div className="p-2 ml-2 flex ">
                    <h2
                      style={Styles.heading}
                      className="text-3xl font-bold mb-6 text-center"
                    >
                      Vehicle Details
                    </h2>
                  </div>
                  <div className="  ">
                    <form className="w-full  h-full border-1  p-2 border  rounded-lg">
                      <div className="w-full justify-center flex h-auto p-2">
                        <div className="w-1/2 p-3">
                          <div data-tooltip-id="my-tooltip-1">
                            <AutoCompleteSearch
                              searchType="vehicle"
                              onDataReceived={handleVehicleDataReceived}
                              onSelect={handleVehicleSelect}
                            />
                          </div>

                          <ReactTooltip
                            id="my-tooltip-1"
                            place="bottom"
                            variant="info"
                            content="Search for vehicles"
                          />
                        </div>
                      </div>
                      <div className="flex  gap-2 h-auto  items-center ">
                        <div className="w-full  mt-4 flex gap-3  items-center">
                          <div className="w-3/4 flex gap-3">
                            <div className="flex flex-col gap-3 w-1/2 ">
                              <div>
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold"
                                >
                                  Vehicle Make
                                </label>
                                <input
                                  style={Styles.input}
                                  type="text"
                                  className="w-full p-2 border rounded"
                                  value={vehicleMake}
                                  onChange={(e) =>
                                    setVehicleMake(e.target.value.toUpperCase())
                                  }
                                  placeholder="Enter vehicle make"
                                />
                              </div>

                              <div>
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold"
                                >
                                  Model
                                </label>
                                <input
                                  style={Styles.input}
                                  type="text"
                                  className="text-black w-full p-2 border rounded"
                                  value={model}
                                  onChange={(e) => setModel(e.target.value)}
                                  placeholder="Enter model"
                                />
                              </div>
                              <div>
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold"
                                >
                                  Engine CC
                                </label>
                                <input
                                  style={Styles.input}
                                  type="text"
                                  className="w-full p-2 border rounded"
                                  value={cc}
                                  onChange={(e) => setCc(e.target.value)}
                                  placeholder="Enter CC"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-3 w-1/2">
                              <div>
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold"
                                >
                                  Registration No
                                </label>
                                <input
                                  style={Styles.input}
                                  type="text"
                                  className="w-full p-2 border rounded"
                                  value={regNo}
                                  onChange={(e) => setRegNo(e.target.value)}
                                  placeholder="Enter registration number"
                                />
                              </div>
                              <div>
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold"
                                >
                                  Engine No
                                </label>
                                <input
                                  style={Styles.input}
                                  type="text"
                                  className="w-full p-2 border rounded"
                                  value={engineNo}
                                  onChange={(e) => setEngineNo(e.target.value)}
                                  placeholder="Enter engine number"
                                />
                              </div>
                              <div>
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold"
                                >
                                  Chassis No
                                </label>
                                <input
                                  style={Styles.input}
                                  type="text"
                                  className="w-full p-2 border rounded"
                                  value={chasisNo}
                                  onChange={(e) => setChasisNo(e.target.value)}
                                  placeholder="Enter chassis number"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="w-1/4 h-full">
                            <div className="w-full flex">
                              <label
                                style={Styles.tableheading}
                                className="block  text-sm font-bold text-gray-700 mb-2"
                              >
                                Vehicle Image
                              </label>
                            </div>
                            <div className="flex items-center justify-center w-full h-auto  border-gray-300  rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                              <input
                                data-tooltip-id="my-tooltip-2"
                                type="file"
                                accept="image/*"
                                className="hidden "
                                id="file-upload"
                                onChange={handleFileChange}
                              />
                              <label
                                style={Styles.label}
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
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
                                {file ? (
                                  <img
                                    src={
                                      file instanceof File
                                        ? URL.createObjectURL(file)
                                        : file
                                    }
                                    alt="Vehicle Photo"
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <p className="text-gray-500 text-sm">
                                    Click to upload
                                  </p>
                                )}
                              </label>
                            </div>
                            {file && (
                              <p className="text-sm text-gray-600 mt-2">
                                File: {file.name || "Selected from search"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex  flex-col lg:flex-row gap-2">
                        <div className="p-4 bg-gray-100 rounded-lg  mt-6 w-full border lg:w-1/2">
                          <div className="flex gap-3 flex-col items-center">
                            <div className="w-full">
                              <label
                                style={Styles.tableheading}
                                className="block text-sm font-bold text-gray-700 mb-2"
                              >
                                Upload RC Book
                              </label>
                              <div className="flex items-center bg-white justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                                <input
                                  style={Styles.label}
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
                                      style={Styles.input}
                                      src={
                                        image instanceof File
                                          ? URL.createObjectURL(image)
                                          : image
                                      }
                                      alt=" RC Image Preview"
                                      className=" w-full h-full object-contain"
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

                            <div className="w-full gap-3 flex">
                              <div className="w-1/2">
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold text-gray-700 mb-1"
                                >
                                  RC Number
                                </label>
                                <input
                                  type="text"
                                  className="w-full h-[40px] p-3 border border-gray-300 rounded-[8px] focus:outline-none"
                                  value={rcNumb}
                                  onChange={(e) => setRcNumb(e.target.value)}
                                  placeholder="Enter your RC number"
                                />
                              </div>

                              <div className="w-1/2">
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold text-gray-700 mb-1"
                                >
                                  Till Date
                                </label>
                                <input
                                  type="date"
                                  className="w-full h-[40px] bg p-3 border border-gray-300 rounded-[8px] focus:outline-none"
                                  value={RCValidTill}
                                  onChange={(e) =>
                                    setRCValidTill(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-lg  mt-6 w-full border lg:w-1/2">
                          <div className="flex gap-3 flex-col items-center">
                            <div className="w-full">
                              <label
                                style={Styles.tableheading}
                                className="block text-sm font-bold text-gray-700 mb-2"
                              >
                                Upload Insurance
                              </label>
                              <div className="flex bg-white items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                                <input
                                  style={Styles.input}
                                  type="file"
                                  accept="image/*,application/pdf"
                                  className="hidden "
                                  id="fmsci-file-upload"
                                  onChange={handleUploadChange}
                                />
                                <label
                                  style={Styles.label}
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
                                      style={Styles.input}
                                      src={
                                        upload instanceof File
                                          ? URL.createObjectURL(upload)
                                          : upload
                                      }
                                      alt="Insurance Image Preview"
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

                            <div className="w-full gap-3 flex">
                              <div className="w-1/2">
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold text-gray-700 mb-1"
                                >
                                  Insurance Number
                                </label>
                                <input
                                  type="text"
                                  className="w-full h-[40px] p-3 border border-gray-300 rounded-[8px] focus:outline-none"
                                  value={insuranceNumb}
                                  onChange={(e) =>
                                    setInsuranceNumb(e.target.value)
                                  }
                                  placeholder="Enter your Insurance number"
                                />
                              </div>

                              <div className="w-1/2">
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-bold text-gray-700 mb-1"
                                >
                                  Till Date
                                </label>
                                <input
                                  type="date"
                                  className="w-full h-[40px] p-3 border border-gray-300 rounded-[8px] focus:outline-none"
                                  value={insuranceValidTill}
                                  onChange={(e) =>
                                    setInsuranceValidTill(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full  items-center">
                        <div className="w-1/2 flex items-center">
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            className="w-4 h-4  bg-gray-100 border-gray-300 rounded-sm accent-cyan-600"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                          />
                          <label
                            style={Styles.label}
                            htmlFor="link-checkbox"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            I agree with the{" "}
                            <Link
                              to="/terms"
                              className="text-cyan-600 dark:text-blue-500 hover:underline"
                            >
                              Terms and conditions
                            </Link>
                            .
                          </label>
                        </div>
                        <div className="w-1/2 ">
                          <div className="flex justify-end  gap-4 mt-4">
                            <button className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300">
                              Cancel
                            </button>

                            <button
                              onClick={handleSubmit}
                              className={`w-1/2 py-3 font-semibold rounded-md transition-all duration-300 ${
                                isAgreed
                                  ? "bg-cyan-500 text-white hover:text-black hover:bg-cyan-600"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                              disabled={!isAgreed}
                            >
                              {isEditing ? "Update" : "Save"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Vehicledetails;
