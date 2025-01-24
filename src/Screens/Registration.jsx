import { useState } from "react";
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";

const Registration = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [drivingLic, setDrivingLic] = useState("");
  const [fmsciLic, setFmsciLic] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    // Logic to save the data (e.g., API call)
    console.log("Data saved:", {
      name,
      dob,
      bloodGroup,
      drivingLic,
      fmsciLic,
      phone,
      email,
    });
  };

  const handleCancel = () => {
    // Logic to cancel the operation (e.g., clear fields)
    setName("");
    setDob("");
    setBloodGroup("");
    setDrivingLic("");
    setFmsciLic("");
    setPhone("");
    setEmail("");
  };

  const handleDelete = () => {
    // Logic to delete the data
    console.log("Data deleted");
  };

  const handleUpdate = () => {
    // Logic to update the data
    console.log("Data updated:", {
      name,
      dob,
      bloodGroup,
      drivingLic,
      fmsciLic,
      phone,
      email,
    });
  };

  return (
    <>
      <div className="h-24 w-full">
        <Newheader />
      </div>
      <div className="flex items-center justify-center">
        <div className=" h-[calc(100vh-6rem)]"><MainSideBar /></div>
        <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Registration</h2>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">DOB</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Blood Group
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              placeholder="Enter your blood group"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Driving License
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={drivingLic}
              onChange={(e) => setDrivingLic(e.target.value)}
              placeholder="Enter driving license validity"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              FMSCI License
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={fmsciLic}
              onChange={(e) => setFmsciLic(e.target.value)}
              placeholder="Enter FMSCI license validity"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Phone
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
