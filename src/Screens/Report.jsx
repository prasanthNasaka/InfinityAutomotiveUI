import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import { useParams } from "react-router-dom";

const Report = () => {
  const { eventId } = useParams();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = [
      {
        name,
        role,
        eventid: eventId,
      },
    ];

    try {
      const response = await axios.post(
        `${BASE_URL}/api/EventOrgcommitee`,
        payload
      );

      console.log("Success:", response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <>
      <div className="h-24 w-full shadow-md p-1">
        <Newheader />
      </div>
      <div className="flex h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>

        <div className="flex w-full p-8 h-auto flex-col ">
          <form
            className="w-full mx-auto p-8 rounded-md shadow-lg h-fit"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className=" w-1/3 p-3 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                className=" w-1/3 p-3 border border-gray-300 rounded"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter your Role"
                required
              />
            </div>

            <div className="flex justify-end w-1/3">
              <button className="px-6 py-3 bg-cyan-600 text-white rounded">
                Add
              </button>
            </div>
          </form>

          <div className="flex w-full p-8 h-fit">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2"> Name</th>
                  <th className="border p-2">Role </th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-center">Saad</td>
                  <td className="border p-2 text-center">Racer</td>
                  <td className="border p-2 text-center">
                    <button className="p-1 bg-red-400 border  text-black rounded-md transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
