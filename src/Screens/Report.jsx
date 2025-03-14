/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/global-const";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AxiosInstance from "../Components/AxiosInstance";

const Report = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [committee, setCommittee] = useState([]);

  const { eventId } = useParams();

  const fetchEventOrgCommittee = async () => {
    try {
      const response = await AxiosInstance.get(
        `${BASE_URL}/api/EventOrgcommitee?eventId=${eventId}`
      );

      console.log("Full API Response:", response.data);

      if (Array.isArray(response.data)) {
        setCommittee(response.data);
      } else {
        console.warn("Unexpected API response format:", response.data);
        setCommittee([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load committee members.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      payload: [
        {
          name,
          role,
          eventid: parseInt(eventId, 10),
        },
      ],
    };

    try {
      const response = await AxiosInstance.post(
        `${BASE_URL}/api/EventOrgcommitee`,
        payload, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Added Successfully");
      console.log("Success:", response.data);
      fetchEventOrgCommittee();
      setName("");
      setRole("");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to add member.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(
        `${BASE_URL}/api/EventOrgcommitee?OrgId=${id}`
      );

      toast.success("Deleted Successfully");
      setCommittee((prevCommittee) =>
        prevCommittee.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete member.");
    }
  };

  // Fetch data when eventId changes
  useEffect(() => {
    if (eventId) {
      fetchEventOrgCommittee();
    }
  }, [eventId]);

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

        <div className="flex w-full p-8 h-auto flex-col">
          {/* Form */}
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
                className="w-1/3 p-3 border border-gray-300 rounded"
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
                className="w-1/3 p-3 border border-gray-300 rounded"
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

          {/* Table */}
          <div className="flex w-full p-8 h-fit">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {committee.length > 0 ? (
                  committee.map((member) => (
                    <tr key={member.id}>
                      <td className="border p-2 text-center">{member.name}</td>
                      <td className="border p-2 text-center">{member.role}</td>
                      <td className="border p-2 text-center">
                        <button
                          className="p-1 bg-red-400 border text-black rounded-md"
                          onClick={() => handleDelete(member.id)}
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
