/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../constants/global-const";
import AutoCompleteSearch from "../Components/CustomAutoComplete";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import AxiosInstance from "../Components/AxiosInstance";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Styles from "../constants/Styles";
import PhoneInput from "react-phone-input-2";

const Registration = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [dlValidTill, setDlValidTill] = useState("");
  const [fmsciValidTill, setFmsciValidTill] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [dlNumb, setDlNumb] = useState("");
  const [fmsciNumb, setFmsciNumb] = useState("");
  const [driverData, setDriverData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState(false);
  const [selecteddetails, setSelectedDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamMemberOf, setTeamMemberOf] = useState("");
  const [isAddingTeam, setIsAddingTeam] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !dob ||
      !bloodGroup ||
      !dlNumb.trim() ||
      !dlValidTill ||
      !fmsciNumb.trim() ||
      !fmsciValidTill ||
      !phone.trim() ||
      !email.trim()
    ) {
      toast.error("All fields are mandatory.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address.");
      return;
    }

    if (!isAgreed) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    try {
      let finalTeamId = teamMemberOf || 28;

      if (isAddingTeam && teamMemberOf.trim()) {
        const response = await AxiosInstance.post(`${BASE_URL}/api/Teams`, {
          teamName: teamMemberOf.trim(),
          status: true,
        });

        finalTeamId = response.data.teamId;
        toast.success("New team created successfully!");
      }

      const formData = new FormData();
      formData.append("driverName", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("fmsciNumb", fmsciNumb);
      formData.append("fmsciValidTill", fmsciValidTill);
      formData.append("dlNumb", dlNumb);
      formData.append("dlValidTill", dlValidTill);
      formData.append("dob", dob);
      formData.append("bloodGroup", bloodGroup);
      formData.append("teamMemberOf", finalTeamId);
      if (file) formData.append("driverPhoto", file);
      if (upload) formData.append("fmsciLicPhoto", upload);
      if (image) formData.append("dlPhoto", image);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      let response;

      if (isEditing) {
        if (!selecteddetails || !selecteddetails.driverId) {
          throw new Error("Driver ID is required for editing.");
        }

        response = await AxiosInstance.put(
          `${BASE_URL}/api/drivers/${selecteddetails.driverId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Driver updated successfully");
      } else {
        if (!name || !phone || !email) {
          throw new Error("Driver name, phone, and email are required.");
        }

        response = await AxiosInstance.post(
          `${BASE_URL}/api/drivers`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Driver registered successfully");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Server response:", error.response.data);
        if (error.response.data.errors) {
          toast.error("Validation errors occurred. Check console for details.");
        } else {
          console.error("Server error occurred. Please try again.");
        }
      } else {
        console.error("An unexpected error occurred: " + error.message);
      }
    }

    setName("");
    setDob("");
    setBloodGroup("");
    setDlValidTill("");
    setFmsciValidTill("");
    setPhone("");
    setEmail("");
    setFile(null);
    setUpload(null);
    setImage(null);
    setError("");
    setDlNumb("");
    setFmsciNumb("");
    setTeamMemberOf("");
    setIsAddingTeam(false);
  };

  const handleCancel = () => {
    setName("");
    setDob("");
    setBloodGroup("");
    setDlValidTill("");
    setFmsciValidTill("");
    setPhone("");
    setEmail("");
    setFile(null);
    setUpload(null);
    setImage(null);
    setError("");
    setDlNumb("");
    setFmsciNumb("");
    setTeamMemberOf("");
  };
  const handleDriverDataReceived = (data) => {
    setDriverData(data);
  };

  const handleDriverSelect = async (driver) => {
    if (!driver?.driverId) {
      console.warn("Invalid driver selection:", driver);
      return;
    }

    setSelectedDriver(driver);
    setLoading(true);

    try {
      const response = await AxiosInstance.get(`/api/drivers/ById`, {
        params: { id: driver.driverId },
      });
      console.log("response", response);

      if (response.data) {
        setSelectedDetails(response.data);
        setDrivers((prevDrivers) => {
          const driversArray = Array.isArray(prevDrivers) ? prevDrivers : [];

          return driversArray.map((d) =>
            d.driverId === driver.driverId ? response.data : d
          );
        });
      } else {
        console.warn("Unexpected response format:", response);
      }
    } catch (err) {
      console.error("Error fetching driver details:", err);
      setError(
        err.response?.data?.message || "Failed to fetch driver details."
      );
    } finally {
      setLoading(false);
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

    setFile(selectedFile);
    toast.success(" Image uploaded successfully!");
  };

  useEffect(() => {
    if (selecteddetails !== null) {
      setIsEditing(true);
      setName(selecteddetails.drivername || "");
      setDlNumb(selecteddetails.dlNumb || "");
      setFmsciNumb(selecteddetails.fmsciNumb || "");
      setPhone(selecteddetails.phone || "");
      setBloodGroup(selecteddetails.bloodgroup || "");
      setDob(selecteddetails.dob || "");
      setFmsciValidTill(selecteddetails.fmsciValidTill || "");
      setDlValidTill(selecteddetails.dlValidTill || "");
      setEmail(selecteddetails.email || "");
      setFile(
        selecteddetails.driverPhoto
          ? `${IMAGE_URL}${selecteddetails.driverPhoto}`
          : null
      );
      setImage(
        selecteddetails.dlPhoto
          ? `${IMAGE_URL}${selecteddetails.dlPhoto}`
          : null
      );
      setUpload(
        selecteddetails.fmsciLicPhoto
          ? `${IMAGE_URL}${selecteddetails.fmsciLicPhoto}`
          : null
      );
    } else {
      setIsEditing(false);
    }
  }, [selecteddetails]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await AxiosInstance.get(`${BASE_URL}/api/Teams`);
        console.log(response);

        setTeams(response.data);
      } catch (error) {
        toast.error("Error loading teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="w-full h-screen flex flex-col">
      <Toaster position="bottom-center" reverseOrder={false} />
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
              <div className="p-2 ml-2 flex ">
                <h2
                  style={Styles.heading}
                  className="text-3xl font-bold  text-center"
                >
                  Racer Details
                </h2>
              </div>
              <div className=" mt-4 ">
                <div className="w-full  h-full border-1  p-2 border mb-4 rounded-lg">
                  <div className="w-full justify-center flex h-auto p-2">
                    <div data-tooltip-id="my-tooltip-1" className="w-1/2  p-3">
                      <AutoCompleteSearch
                        searchType="Driver"
                        onDataReceived={handleDriverDataReceived}
                        onSelect={handleDriverSelect}
                      />
                      <ReactTooltip
                        id="my-tooltip-1"
                        place="bottom"
                        variant="info"
                        content="Search for Racer"
                      />
                    </div>
                  </div>
                  <div className="w-full  rounded-md  overflow-auto">
                    {error && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3 h-auto items-center ">
                      <div className="w-3/4 p-2 flex  flex-col gap-2 ">
                        <div className="flex gap-2">
                          <div className="w-1/2">
                            <label
                              style={Styles.label}
                              className="block text-sm font-bold text-gray-700 mb-1"
                            >
                              Name
                            </label>
                            <input
                              style={Styles.input}
                              type="text"
                              className="w-full p-3 border border-gray-300 rounded"
                              value={name}
                              onChange={(e) =>
                                setName(e.target.value.toUpperCase())
                              }
                              placeholder="Enter your name"
                              required
                            />
                          </div>
                          <div className="w-1/2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                              Team
                            </label>
                            <div className="relative flex items-center gap-2">
                              {isAddingTeam ? (
                                <input
                                  type="text"
                                  className="w-full p-3 border border-gray-300 rounded"
                                  placeholder="Enter new team name"
                                  value={teamMemberOf}
                                  onChange={(e) =>
                                    setTeamMemberOf(e.target.value)
                                  }
                                  required
                                />
                              ) : (
                                <select
                                  className="w-full p-3 border border-gray-300 rounded max-h-48 overflow-y-auto"
                                  value={teamMemberOf}
                                  onChange={(e) =>
                                    setTeamMemberOf(e.target.value)
                                  }
                                  required
                                >
                                  <option value="">Select a team</option>
                                  {teams
                                    .filter((team) => team.status)
                                    .map((team) => (
                                      <option
                                        key={team.teamId}
                                        value={team.teamId}
                                      >
                                        {team.teamName}
                                      </option>
                                    ))}
                                </select>
                              )}

                              <button
                                type="button"
                                onClick={() => setIsAddingTeam(!isAddingTeam)}
                                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                title={isAddingTeam ? "Cancel" : "Add new team"}
                              >
                                {isAddingTeam ? "✕" : "+"}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex w-full gap-2">
                          <div className=" w-1/2">
                            <label
                              style={Styles.label}
                              className="block text-sm font-bold text-gray-700 mb-1"
                            >
                              Date Of Birth
                            </label>
                            <input
                              style={Styles.input}
                              type="date"
                              className="w-full p-3 border border-gray-300 rounded"
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              required
                            />
                          </div>
                          <div className=" w-1/2">
                            <label
                              style={Styles.label}
                              className="block text-sm font-bold text-gray-700 mb-1"
                            >
                              Blood Group
                            </label>
                            <select
                              style={Styles.select}
                              className="w-full p-3.5 border border-gray-300 rounded"
                              value={bloodGroup}
                              onChange={(e) => setBloodGroup(e.target.value)}
                              required
                            >
                              <option value="">Select Blood Group</option>
                              <option value="76">A+</option>
                              <option value="77">A-</option>
                              <option value="78">B+</option>
                              <option value="79">B-</option>
                              <option value="80">O+</option>
                              <option value="81">O-</option>
                              <option value="82">AB+</option>
                              <option value="83">AB-</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex w-full gap-2 items-center">
                          <div className="w-1/2">
                            <label
                              style={Styles.label}
                              className="block text-sm font-bold text-gray-700 "
                            >
                              Phone Number
                            </label>
                            <PhoneInput
                              country={"in"}
                              value={phone}
                              onChange={(phone) => setPhone(phone)}
                              placeholder="        Enter your  phone number"
                              className="  border-gray-300 rounded"
                              inputStyle={{
                                width: "100%",
                                padding: "16px",
                                borderRadius: "0.375rem",
                                border: "1px solid #D1D5DB",
                              }}
                              inputProps={{
                                required: true,
                              }}
                            />
                          </div>

                          <div className=" w-1/2 ">
                            <label
                              style={Styles.label}
                              className="block text-sm font-bold text-gray-700 "
                            >
                              Email Address
                            </label>
                            <input
                              style={Styles.input}
                              type="email"
                              className="w-full p-3 border border-gray-300 rounded"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-1/4 h-full">
                        <label
                          style={Styles.tableheading}
                          className="block text-sm font-bold text-gray-700 mb-2"
                        >
                          Upload Photo
                        </label>
                        <div className="flex items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            className="hidden"
                            onChange={handleFileChange}
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
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

                            {file ? (
                              <img
                                src={
                                  file instanceof File
                                    ? URL.createObjectURL(file)
                                    : file
                                }
                                alt="Driver Photo"
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

                    <div className="flex flex-col lg:flex-row gap-2">
                      <div className="bg-gray-100 p-4 rounded-lg border  mt-6 w-full lg:w-1/2">
                        <div className="flex gap-3 flex-col items-center ">
                          <div className="w-full">
                            <label
                              style={Styles.tableheading}
                              className="block text-sm font-bold text-gray-700 mb-2"
                            >
                              Upload License
                            </label>
                            <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
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

                          <div className="w-full gap-3 flex">
                            <div className="w-1/2">
                              <label
                                style={Styles.label}
                                className="block text-sm font-bold text-gray-700 mb-1"
                              >
                                Driving License Number
                              </label>
                              <input
                                type="text"
                                className="h-[40px] w-full p-3 border border-gray-300 rounded-[8px] focus:outline-none"
                                value={dlNumb}
                                onChange={(e) =>
                                  setDlNumb(e.target.value.toUpperCase())
                                }
                                placeholder="Enter your license number"
                                required
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
                                className="h-[40px] w-full p-3 border border-gray-300 rounded-[8px] focus:outline-none"
                                value={dlValidTill}
                                onChange={(e) => setDlValidTill(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 p-4 rounded-lg border mt-6 w-full lg:w-1/2">
                        <div className="flex gap-3 flex-col items-center ">
                          <div className="w-full">
                            <label
                              style={Styles.tableheading}
                              className="block text-sm font-bold text-gray-700 mb-2"
                            >
                              Upload FMSCI License
                            </label>
                            <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
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

                          <div className="w-full gap-3 flex">
                            <div className="w-1/2">
                              <label
                                style={Styles.label}
                                className="block text-sm font-bold text-gray-700 mb-1"
                              >
                                FMSCI License Number
                              </label>
                              <input
                                type="text"
                                className="h-[40px] rounded-[8px] w-full p-3 border border-gray-300 focus:outline-none"
                                value={fmsciNumb}
                                onChange={(e) =>
                                  setFmsciNumb(e.target.value.toUpperCase())
                                }
                                placeholder="Enter your license number"
                                required
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
                                className="h-[40px] rounded-[8px] w-full p-3 border border-gray-300  focus:outline-none"
                                value={fmsciValidTill}
                                onChange={(e) =>
                                  setFmsciValidTill(e.target.value)
                                }
                                required
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
                          required
                        />
                        <label
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
                          <button
                            onClick={handleCancel}
                            className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={handleSave}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
