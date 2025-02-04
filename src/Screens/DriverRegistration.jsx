import { useState } from "react";
import Head from "../Screens/Head";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";

const DriverRegistration = () => {
  const [name, setName] = useState("shafi");
  const [dob, setDob] = useState("2025-02-03");
  const [bloodGroup, setBloodGroup] = useState("O-");
  const [drivingLicEnd, setDrivingLicEnd] = useState("2025-02-03");
  const [fmsciLicEnd, setFmsciLicEnd] = useState("2025-02-03");
  const [phone, setPhone] = useState("0123456789");
  const [email, setEmail] = useState("shafi@gmail.com");
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [drivingLicNumber, setDrivingLicNumber] = useState("DL123456");
  const [fmsciLicNumber, setFmsciLicNumber] = useState("FMSCI123");

  const handleSave = async () => {
    if (
      !name ||
      !dob ||
      !bloodGroup ||
      !drivingLicNumber ||
      !drivingLicEnd ||
      !fmsciLicNumber ||
      !fmsciLicEnd ||
      !phone ||
      !email
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

    // Prepare FormData to send to the API
    const formData = new FormData();
    formData.append("drivername", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("fmsciNumb", fmsciLicNumber);
    formData.append("fmsciValidTill", fmsciLicEnd);
    formData.append("dlNumb", drivingLicNumber);
    formData.append("dlValidTill", drivingLicEnd);
    formData.append("dob", dob);
    formData.append("bloodgroup", bloodGroup);
    formData.append("status", true);
    formData.append("vehicles", []);

    if (file) formData.append("driverPhoto", file);
    if (upload) formData.append("dlPhoto", upload);

    try {
      const response = await axios.post(`${BASE_URL}/Drivers`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Driver registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering driver:", error);
      setError(
        "An error occurred while registering the driver. Please try again."
      );
    }
    console.log("Form Data:", formData);
  };

  const handleCancel = () => {
    setName("shafi");
    setDob("2025-02-03");
    setBloodGroup("O-");
    setDrivingLicEnd("2025-02-03");
    setFmsciLicEnd("2025-02-03");
    setPhone("0123456789");
    setEmail("shafi@gmail.com");
    setFile(null);
    setUpload(null);
    setError("");
    setDrivingLicNumber("DL123456");
    setFmsciLicNumber("FMSCI123");
  };

  return (
    <>
      <div className="h-24 w-full">
        <Head />
      </div>
      <div className="flex h-auto  ">
        <div className="flex-1 p-8 bg-white ">
          <div className="w-3/4  mx-auto p-3 rounded-sm shadow-lg ">
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
                    onChange={(e) => {
                      setImage(URL.createObjectURL(e.target.files[0]));
                      setFile(e.target.files[0]);
                    }}
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

                    {image && (
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </label>
                </div>
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

                <div className="flex w-full gap-2">
                  <div className="mb-4 w-1/2">
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
                  <div className="mb-4 w-1/2">
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
                <div className="flex w-full gap-2">
                  <div className="mb-4 w-1/2">
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
                  <div className="mb-4 w-1/2">
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

            <div className="flex flex-col lg:flex-row gap-2">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-full lg:w-1/2">
                <div className="flex gap-6 items-center">
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
                        onChange={(e) => {
                          setFile(URL.createObjectURL(e.target.files[0]));
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
                        {file && (
                          <img
                            src={file}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="w-2/3">
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Driving License Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                        value={drivingLicNumber}
                        onChange={(e) => setDrivingLicNumber(e.target.value)}
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
                        value={drivingLicEnd}
                        onChange={(e) => setDrivingLicEnd(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-full lg:w-1/2">
                <div className="flex gap-6 items-center">
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
                        onChange={(e) => {
                          setUpload(URL.createObjectURL(e.target.files[0]));
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
                            src={upload}
                            alt="FMSCI License Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="w-2/3">
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        FMSCI License Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                        value={fmsciLicNumber}
                        onChange={(e) => setFmsciLicNumber(e.target.value)}
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
                        value={fmsciLicEnd}
                        onChange={(e) => setFmsciLicEnd(e.target.value)}
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
                Cancel
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
