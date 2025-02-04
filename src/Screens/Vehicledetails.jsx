import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useState } from "react";

const Vehicledetails = () => {
  const [vehicleMake, setVehicleMake] = useState("");
  const [model, setModel] = useState("");
  const [cc, setCc] = useState("");
  const [regNo, setRegNo] = useState("");
  const [engineNo, setEngineNo] = useState("");
  const [chasisNo, setChasisNo] = useState("");
  const [file, setFile] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    if (!vehicleMake || !model || !cc || !regNo || !engineNo || !chasisNo) {
      alert("Please fill all fields.");
      return;
    }

    const newVehicle = {
      vehicleMake,
      model,
      cc,
      regNo,
      engineNo,
      chasisNo,
      file,
    };

    if (editIndex !== null) {
      const updatedVehicles = [...vehicles];
      updatedVehicles[editIndex] = newVehicle;
      setVehicles(updatedVehicles);
      setEditIndex(null);
    } else {
      setVehicles([...vehicles, newVehicle]);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setVehicleMake("");
    setModel("");
    setCc("");
    setRegNo("");
    setEngineNo("");
    setChasisNo("");
    setFile(null);
    setEditIndex(null);
  };

  const handleView = (index) => {
    const selectedVehicle = vehicles[index];
    setVehicleMake(selectedVehicle.vehicleMake);
    setModel(selectedVehicle.model);
    setCc(selectedVehicle.cc);
    setRegNo(selectedVehicle.regNo);
    setEngineNo(selectedVehicle.engineNo);
    setChasisNo(selectedVehicle.chasisNo);
    setFile(selectedVehicle.file);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  return (
    <>
      <section className="w-full min-h-screen">
        {/* Header */}
        <div className="h-24 w-full shadow-md">
          <Newheader />
        </div>

        <div className="flex h-[calc(100vh-6rem)] w-full">
          {/* Sidebar */}
          <div className="bg-gray-100">
            <MainSideBar />
          </div>

          {/* Main Content */}
          <div className="w-3/4 mx-auto flex flex-col items-center mt-10">
            {/* Form Section */}
            <div className="w-2/3 bg-white shadow-lg p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-center mb-4">
                Vehicle Details
              </h2>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Vehicle Make
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    placeholder="Enter vehicle make"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Model
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Enter model"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    CC
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                    placeholder="Enter CC"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    placeholder="Enter registration number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Engine Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={engineNo}
                    onChange={(e) => setEngineNo(e.target.value)}
                    placeholder="Enter engine number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Chassis Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={chasisNo}
                    onChange={(e) => setChasisNo(e.target.value)}
                    placeholder="Enter chassis number"
                    required
                  />
                </div>
              </div>

              {/* Upload Section */}
              <div className="mt-4">
                <label className="block text-sm font-bold text-gray-700">
                  Upload Image
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
                  className="flex items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      className="h-full object-cover"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      Click to upload or drag & drop
                    </p>
                  )}
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-cyan-600 text-white rounded"
                >
                  {editIndex !== null ? "Update" : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Table Section */}
            {vehicles.length > 0 && (
              <div className="mt-6 w-2/3">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Vehicle Make</th>
                      <th className="border p-2">Model</th>
                      <th className="border p-2">CC</th>
                      <th className="border p-2">Reg No</th>
                      <th className="border p-2">Engine No</th>
                      <th className="border p-2">Chassis No</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle, index) => (
                      <tr key={index}>
                        <td className="border p-2">{vehicle.vehicleMake}</td>
                        <td className="border p-2">{vehicle.model}</td>
                        <td className="border p-2">{vehicle.cc}</td>
                        <td className="border p-2">{vehicle.regNo}</td>
                        <td className="border p-2">{vehicle.engineNo}</td>
                        <td className="border p-2">{vehicle.chasisNo}</td>
                        <td className="border p-2">
                          <button onClick={() => handleView(index)}>View</button>
                          <button onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Vehicledetails;
