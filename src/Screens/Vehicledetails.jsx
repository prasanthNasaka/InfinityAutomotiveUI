import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useState } from "react";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";

const Vehicledetails = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [vehicleMake, setVehicleMake] = useState("");
  const [model, setModel] = useState("");
  const [cc, setCc] = useState("");
  const [regNo, setRegNo] = useState("");
  const [engineNo, setEngineNo] = useState("");
  const [chasisNo, setChasisNo] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vehicleMake", vehicleMake);
    formData.append("model", model);
    formData.append("cc", cc);
    formData.append("regNo", regNo);
    formData.append("engineNo", engineNo);
    formData.append("chasisNo", chasisNo);
    formData.append("vehiclePhoto", file);

    const data = {
      vehicleId: 0,
      regNumb: regNo,
      chasisNumb: chasisNo,
      fcUpto: new Date().toISOString(),
      engNumber: engineNo,
      make: vehicleMake,
      model: model,
      cc: cc,
      vehicleOf: 0,
      vehiclePhoto: file ? URL.createObjectURL(file) : "",
      status: true,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/Vehicle`, data);
      if (response.status === 201) {
        handleCancel();
      }

      console.log("response", response);

      console.log("Vehicle added:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setVehicleMake("");
    setModel("");
    setCc("");
    setRegNo("");
    setEngineNo("");
    setChasisNo("");
    // setTillDate("");
    setFile(null);
    // setEditIndex(null);
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
            <form className="flex items-center mb-6  justify-center w-full">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-1/2 ">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-full pl-6 p-3"
                  placeholder="Search Your Details.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-cyan-600 rounded-lg"
              >
                <svg
                  className="w-6 h-6"
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
