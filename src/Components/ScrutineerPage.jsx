import { useState } from "react";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const ScrutineerPage = () => {
  const [formData, setFormData] = useState({
    scrutineerName: "",
    raceName: "",
    vehicleNumber: "",
    inspectionStatus: "",
    comments: "",
  });
  const [scrutinyList, setScrutinyList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.scrutineerName)
      formErrors.scrutineerName = "Scrutineer Name is required";
    if (!formData.raceName) formErrors.raceName = "Race Name is required";
    if (!formData.vehicleNumber)
      formErrors.vehicleNumber = "Vehicle Number is required";
    if (!formData.inspectionStatus)
      formErrors.inspectionStatus = "Inspection Status is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAddScrutiny = () => {
    if (!validateForm()) return;

    if (isEdit) {
      const updatedList = [...scrutinyList];
      updatedList[editIndex] = formData;
      setScrutinyList(updatedList);
      setIsEdit(false);
      setEditIndex(null);
    } else {
      setScrutinyList([...scrutinyList, formData]);
    }
    setFormData({
      scrutineerName: "",
      raceName: "",
      vehicleNumber: "",
      inspectionStatus: "",
      comments: "",
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      scrutineerName: "",
      raceName: "",
      vehicleNumber: "",
      inspectionStatus: "",
      comments: "",
    });
    setErrors({});
    setIsEdit(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(scrutinyList[index]);
    setIsEdit(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = scrutinyList.filter((_, i) => i !== index);
    setScrutinyList(updatedList);
  };

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
            {/* Scrutineer Form Section */}
            <div className="bg-white p-6 flex flex-col items-center rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-700">
                {isEdit ? "Edit Scrutiny" : "Add Scrutiny"}
              </h3>
              <div className="space-y-4 w-3/4">
                {[
                  "scrutineerName",
                  "raceName",
                  "vehicleNumber",
                  "inspectionStatus",
                  "comments",
                ].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {field === "scrutineerName"
                        ? "Scrutineer Name"
                        : field === "raceName"
                        ? "Event Name"
                        : field === "vehicleNumber"
                        ? "Vehicle Number"
                        : field === "inspectionStatus"
                        ? "Inspection Status"
                        : "Comments"}
                    </label>
                    <input
                      type={field === "comments" ? "text" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full p-3 border-2 rounded-md ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      placeholder={`Enter ${
                        field === "scrutineerName" ? "Scrutineer Name" : field
                      }`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex w-1/2 gap-4 mt-4">
                <button
                  onClick={handleCancel}
                  className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddScrutiny}
                  className="w-1/2 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition duration-300"
                >
                  {isEdit ? "Update" : "Submit"}
                </button>
              </div>
            </div>

            {/* Scrutiny Table Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
              <h3 className="text-xl font-semibold text-cyan-700 mb-4">
                Scrutiny List
              </h3>
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-left">Scrutineer Name</th>
                    <th className="px-4 py-2 text-left">Race Name</th>
                    <th className="px-4 py-2 text-left">Vehicle Number</th>
                    <th className="px-4 py-2 text-left">Inspection Status</th>
                    <th className="px-4 py-2 text-left">Comments</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {scrutinyList.map((scrutiny, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{scrutiny.scrutineerName}</td>
                      <td className="px-4 py-2">{scrutiny.raceName}</td>
                      <td className="px-4 py-2">{scrutiny.vehicleNumber}</td>
                      <td className="px-4 py-2">{scrutiny.inspectionStatus}</td>
                      <td className="px-4 py-2">{scrutiny.comments}</td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors "
                          >
                            <CiEdit className="size-6" />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors "
                          >
                            <MdOutlineDelete className="size-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScrutineerPage;
