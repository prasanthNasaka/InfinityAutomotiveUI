/* eslint-disable react/prop-types */
import { useState } from "react";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

const DriverRegistration = ({ closePopup }) => {
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

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !dob ||
      !bloodGroup.trim() ||
      !dlNumb.trim() ||
      !dlValidTill ||
      !fmsciNumb.trim() ||
      !fmsciValidTill ||
      !phone.trim() ||
      !email.trim()
    ) {
      setError("All fields are mandatory.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address.");
      return;
    }

    setError("");

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
    formData.append("teamMemberOf", 0);
    if (file) formData.append("driverPhoto", file);
    if (upload) formData.append("fmsciLicPhoto", upload);
    if (image) formData.append("dlPhoto", image);

    console.log("Data being sent:", formData);

    try {
      const response = await axios.post(`${BASE_URL}/api/drivers`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Driver registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering driver:", error);
      if (error.response && error.response.data) {
        console.error("Server response:", error.response.data);
        if (error.response.data.errors) {
          console.error("Validation errors:", error.response.data.errors);
        }
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
  };
  return (
    <>
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
              Racer Details
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/3">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Upload Photo
                </label>
                <div className="flex items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <input
                    type="file"
                    accept="image/*"
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
                      <p className="text-gray-500 text-sm">Click to upload</p>
                    )}
                  </label>
                </div>
                {file && (
                  <p className="text-sm text-gray-600 mt-2">
                    File: {file.name || "Selected from search"}
                  </p>
                )}
              </div>

              <div className="w-full lg:w-2/3">
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="flex w-full gap-2 phone:flex-col ">
                  <div className="mb-4 w-1/2 phone:w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      DOB
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4 w-1/2 phone:w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Blood Group
                    </label>
                    <select
                      className="w-full p-3.5 border border-gray-300 rounded"
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
                <div className="flex w-full gap-2 phone:flex-col">
                  <div className="mb-4 w-1/2 phone:w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      maxLength={10}
                    />
                  </div>
                  <div className="mb-4 w-1/2 phone:w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
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
            </div>

            <div className="flex flex-col lg:flex-row desk:flex-col gap-2">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-full lg:w-1/2 desk:w-full">
                <div className="flex gap-6 items-center lappydesk:flex-col ">
                  <div className="w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Upload License
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
                  <div className="w-2/3 lappydesk:w-full">
                    <div className="mb-4 ">
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Driving License Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                        value={dlNumb}
                        onChange={(e) => setDlNumb(e.target.value)}
                        placeholder="Enter your license number"
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
                        value={dlValidTill}
                        onChange={(e) => setDlValidTill(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-full lg:w-1/2 desk:w-full">
                <div className="flex gap-6 items-center lappydesk:flex-col">
                  <div className="w-full">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Upload FMSCI License
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
                  <div className="w-2/3 lappydesk:w-full">
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        FMSCI License Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                        value={fmsciNumb}
                        onChange={(e) => setFmsciNumb(e.target.value)}
                        placeholder="Enter your license number"
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
                        value={fmsciValidTill}
                        onChange={(e) => setFmsciValidTill(e.target.value)}
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
                className="px-6 py-3 bg-gray-300 text-black rounded"
              >
                Clear
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-cyan-600 text-white rounded"
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

export default DriverRegistration;
