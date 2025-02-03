import { useState } from "react";
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";

const Registration = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [drivingLicStart, setDrivingLicStart] = useState("");
  const [drivingLicEnd, setDrivingLicEnd] = useState("");
  const [fmsciLicStart, setFmsciLicStart] = useState("");
  const [fmsciLicEnd, setFmsciLicEnd] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(null);
  const [error, setError] = useState("");
  const [drivingLicNumber, setDrivingLicNumber] = useState("");
  const [tillDate, setTillDate] = useState("");
  const [fmsciLicNumber, setFmsciLicNumber] = useState("");

  const handleSave = () => {
    if (
      !name ||
      !dob ||
      !bloodGroup ||
      !drivingLicStart ||
      !drivingLicEnd ||
      !fmsciLicStart ||
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
    console.log("Saved successfully", {
      name,
      dob,
      bloodGroup,
      drivingLicStart,
      drivingLicEnd,
      fmsciLicStart,
      fmsciLicEnd,
      phone,
      email,
      file: file ? URL.createObjectURL(file) : null,
      upload: upload ? URL.createObjectURL(upload) : null,
    });
    handleCancel();
  };

  const handleCancel = () => {
    setName("");
    setDob("");
    setBloodGroup("");
    setDrivingLicStart("");
    setDrivingLicEnd("");
    setFmsciLicStart("");
    setFmsciLicEnd("");
    setPhone("");
    setEmail("");
    setFile(null);
    setUpload(null);
    setError("");
  };

  return (
    <>
      <div className="h-24 w-full">
        <Newheader />
      </div>
      <div className="flex h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>
        <div className="flex-1 p-8 bg-white justify-end">
          <form className="flex items-center w-1/2 mx-auto mb-6   ">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  w-full pl-5 p-2.5"
                placeholder="Search Your Details.."
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-cyan-600 rounded-lg"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>

          <div className="w-3/4 mx-auto p-3 rounded-sm shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Racer Details
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="flex gap-8">
              <div className="w-1/3">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="flex items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-full"
                  >
                    <svg
                      className="w-6 h-6 mb-2 text-gray-500"
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
                    <p className="mb-1 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF
                    </p>
                  </label>
                </div>
              </div>

              <div className="w-2/3">
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="flex w-full  gap-2">
                  <div className="mb-4 w-1/2 ">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      DOB
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded "
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
                      className="w-full p-3.5 border border-gray-300 rounded  "
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
                <div className="flex w-full  gap-2">
                  <div className="mb-4 w-1/2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded "
                      value={name}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone Number"
                      required
                      maxLength={10}
                    />
                  </div>
                  <div className="mb-4 w-1/2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Email Address{" "}
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded "
                      value={name}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Email Address"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-1/2">
                <div className="flex gap-6 items-center">
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Upload License
                    </label>
                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        id="license-file-upload"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <label
                        htmlFor="license-file-upload"
                        className="flex flex-col items-center justify-center w-full h-full"
                      >
                        <svg
                          className="w-6 h-6 mb-2 text-gray-500"
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
                          <span className="font-semibold">Click to upload</span>
                          or drag & drop
                        </p>
                        <p className="text-xs text-gray-500">JPG, PNG, PDF</p>
                      </label>
                    </div>
                    {file && (
                      <p className="text-sm text-gray-600 mt-2">
                        File: {file.name}
                      </p>
                    )}
                  </div>

                  <div className="w-2/3">
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Driving License Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={tillDate}
                        onChange={(e) => setTillDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 w-1/2">
                <div className="flex gap-6 items-center">
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Upload FMSCI License
                    </label>
                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        id="license-file-upload"
                        onChange={(e) => setUpload(e.target.files[0])}
                      />
                      <label
                        htmlFor="license-file-upload"
                        className="flex flex-col items-center justify-center w-full h-full"
                      >
                        <svg
                          className="w-6 h-6 mb-2 text-gray-500"
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
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag & drop
                        </p>
                        <p className="text-xs text-gray-500">JPG, PNG, PDF</p>
                      </label>
                    </div>
                    {upload && (
                      <p className="text-sm text-gray-600 mt-2">
                        File: {upload.name}
                      </p>
                    )}
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
                        value={tillDate}
                        onChange={(e) => setTillDate(e.target.value)}
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
                onClick={handleSave}
                className="px-6 py-3 bg-cyan-600 text-white rounded "
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

export default Registration;
