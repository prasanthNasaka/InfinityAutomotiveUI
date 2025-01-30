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
    const updatedVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(updatedVehicles);
  };

  return (
    <div className="flex flex-col items-center w-3/4 p-3 shadow-lg mx-auto">
      {/* Form Section */}
      <div className="w-full flex gap-8">
        <div className="w-2/3">
          <div className="flex w-full gap-2">
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Vehicle Make
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                placeholder="Enter vehicle make"
                required
              />
            </div>

            <div className="mb-4 w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter model"
                required
              />
            </div>
          </div>

          <div className="flex w-full gap-2">
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                CC
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                placeholder="Enter CC"
                required
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder="Enter registration number"
                required
              />
            </div>
          </div>

          <div className="flex w-full gap-2">
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Engine Number
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                value={engineNo}
                onChange={(e) => setEngineNo(e.target.value)}
                placeholder="Enter engine number"
                required
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Chassis Number
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                value={chasisNo}
                onChange={(e) => setChasisNo(e.target.value)}
                placeholder="Enter chassis number"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-cyan-600 text-white rounded"
            >
              {editIndex !== null ? "Update" : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="w-1/3">
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Upload File
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
              className="flex items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <p className="text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
            </label>
            {file && <p className="text-sm text-gray-600 mt-2">File: {file.name}</p>}
          </div>
        </div>
      </div>

      {/* Table Section */}
      {vehicles.length > 0 && (
        <table className="mt-6 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Vehicle Make</th>
              <th className="border p-2">Model</th>
              <th className="border p-2">CC</th>
              <th className="border p-2">Reg No</th>
              <th className="border p-2">Engine No</th>
              <th className="border p-2">Chassis No</th>
              <th className="border p-2">File</th>
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
                <td className="border p-2">{vehicle.file ? vehicle.file.name : "No File"}</td>
                <td className="border p-2">
                  <button onClick={() => handleView(index)}>View</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Vehicledetails;
