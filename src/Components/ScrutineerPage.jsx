import { useState, useEffect } from "react";
import axios from "axios";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import { BASE_URL } from "../constants/global-const";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

const ScrutineerPage = () => {
  const [formData, setFormData] = useState({
    scrutineerName: "",
    email: "",
    fmsciId: "",
    phoneNumber: "",
  });

  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const fetchScrutineers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/Scrutineer`);
      const Data = response.data.$values;
      setTableData(Data);
    } catch {
      toast.error("Failed to fetch scrutineers");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (
      !formData.scrutineerName ||
      !formData.email ||
      !formData.fmsciId ||
      !formData.phoneNumber
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      if (editIndex !== null) {
        await axios.put(
          `${BASE_URL}/api/Scrutineer/${editIndex.scrutineerId}`,
          formData
        );
        toast.success("Scrutineer updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/Scrutineer`, formData);
        toast.success("Scrutineer added successfully!");
      }
    } catch {
     
      toast.error("Failed to save scrutineer");
    } finally {
      
      await fetchScrutineers();
      setFormData({
        scrutineerName: "",
        email: "",
        fmsciId: "",
        phoneNumber: "",
      });
      setEditIndex(null);
    }
  };

  const handleEdit = (index) => {
    setFormData({
      scrutineerName: index.scrutineerName || "",
      email: index.email || "",
      fmsciId: index.fmsciId || "",
      phoneNumber: index.phoneNumber || "",
    });
    setEditIndex(index);
    toast.call("Editing scrutineer details...");
  };

  const handleDelete = async (index) => {
    console.log("index", index);

    try {
      const itemToDelete = index.scrutineerId;
      const response = await axios.delete(
        `${BASE_URL}api/Scrutineer/${itemToDelete}`
      );
      await fetchScrutineers();
      setTableData(response.$values);
      toast.success("Scrutineer deleted successfully!");
    } catch {
      toast.error("Failed to delete scrutineer");
    }
  };

  useEffect(() => {
    fetchScrutineers();
    setFormData([]);
  }, []);

  return (
    <>
      <section className="w-full h-full">
        <div className="w-full h-24 overflow-y-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-cyan-700">
          <Newheader />
        </div>

        <div className="flex w-full h-[calc(100vh-6rem)]">
          <div className="bg-gray-100">
            <MainSideBar />
          </div>

          <div className="flex-1 p-6 space-y-6 overflow-auto bg-gray-100">
            <div className="w-full h-auto bg-white border rounded-lg">
              <div className="w-full h-auto flex justify-center p-2">
                <h3 className="text-xl font-semibold text-cyan-700 mb-4">
                  Add Scrutineer
                </h3>
              </div>

              <div className="w-full h-auto flex justify-between items-center gap-3">
                <div className="w-1/2 p-2 gap-2 flex flex-col">
                  <label className="text-sm font-medium text-gray-900">
                    Enter Name
                  </label>
                  <input
                    type="text"
                    name="scrutineerName"
                    value={formData.scrutineerName}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  />
                </div>
                <div className="w-1/2 p-2 gap-2 flex flex-col">
                  <label className="text-sm font-medium text-gray-900">
                    Enter Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="w-full h-auto flex justify-between items-center gap-3">
                <div className="w-1/2 p-2 gap-2 flex flex-col">
                  <label className="text-sm font-medium text-gray-900">
                    Enter FMSCI ID
                  </label>
                  <input
                    type="text"
                    name="fmsciId"
                    value={formData.fmsciId}
                    onChange={handleChange}
                    placeholder="Enter FMSCI ID"
                    className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  />
                </div>
                <div className="w-1/2 p-2 gap-2 flex flex-col">
                  <label className="text-sm font-medium text-gray-900">
                    Enter Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="w-full h-auto flex justify-center p-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg text-sm transition-colors"
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg  h-screen overflow-auto">
              <div className="w-full h-auto flex justify-center">
                <h3 className="text-xl font-semibold text-cyan-700 mb-4">
                  Scrutiny List
                </h3>
              </div>

              {tableData.length === 0 ? ( // Corrected the condition
                <p className="text-center text-gray-500 py-4">
                  No data available.
                </p>
              ) : (
                <table className="w-full text-sm text-gray-700">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                    <tr>
                      <th className="px-4 py-2  ">SL.No</th>
                      <th className="px-4 py-2  ">Scrutineer Name</th>
                      <th className="px-4 py-2  ">Email</th>
                      <th className="px-4 py-2  ">FMSCI ID</th>
                      <th className="px-4 py-2  ">Phone Number</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-center">
                    {tableData.map((row, index) => (
                      <tr
                        key={row.scrutineerId || index}
                        className="hover:bg-gray-50 "
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2 capitalize">
                          {row.scrutineerName}
                        </td>
                        <td className="px-4 py-2">{row.email || "N/A"}</td>
                        <td className="px-4 py-2">{row.fmsciId || "N/A"}</td>
                        <td className="px-4 py-2">
                          {row.phoneNumber || "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleEdit(row)}
                              className="p-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                            >
                              <CiEdit className="size-6" />
                            </button>
                            <button
                              onClick={() => handleDelete(row)}
                              className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
                            >
                              <MdOutlineDelete className="size-6" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </section>
    </>
  );
};

export default ScrutineerPage;
