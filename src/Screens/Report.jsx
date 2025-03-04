/* eslint-disable react-hooks/exhaustive-deps */
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Report = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [committee, setCommittee] = useState([]);

  const { eventId } = useParams();
  console.log("Event ID before payload:", eventId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventId) {
      console.error("Error: eventId is undefined or invalid.");
      return;
    }

    const payload = [
      {
        name,
        role,
        eventid: parseInt(eventId, 10),
      },
    ];

    try {
      const response = await axios.post(
        `${BASE_URL}/api/EventOrgcommitee`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Added Successfully");
      console.log("Success:", response.data);
      fetchEventOrgCommittee();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
    setName("");
    setRole("");
  };

  const fetchEventOrgCommittee = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/EventOrgcommitee?eventId=${eventId}`
      );

      console.log("Full API Response:", response.data);

      if (response.data?.$values?.length > 0) {
        setCommittee(response.data.$values);
        console.log("Comjhgfdyfgytfdfgt", committee);
      } else {
        console.warn("No data found for this eventId.");
        setCommittee([]);
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleDelete = async (eventid) => {
    console.log("event", eventid);

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/EventOrgcommitee?OrgId=${eventId}`
      );
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventOrgCommittee();
    }
  }, [eventId]);

  useEffect(() => {
    console.log("Updated committee state:", committee);
  }, [committee]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

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
                {committee.length > 0 ? (
                  committee.map((member, index) => (
                    <tr key={index}>
                      <td className="border p-2 text-center">{member.name}</td>
                      <td className="border p-2 text-center">{member.role}</td>
                      <td className="border p-2 text-center">
                        <button
                          className="p-1 bg-red-400 border text-black rounded-md"
                          onClick={() => handleDelete(member.eventid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border p-2 text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
