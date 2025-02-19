import { useState, useEffect } from "react";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

const Add_Employee = () => {
  const [formData, setFormData] = useState({
    contactPerson: "",
    phone: "",
    email: "",
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.contactPerson) formErrors.contactPerson = "Contact Person is required";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    if (!formData.email) formErrors.email = "Email is required";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      formErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAddEmployee = async () => {
    if (!validateForm()) return;

    try {
      if (isEdit) {
        // Update existing employee via PUT request
        await axios.put(`https://your-api-endpoint.com/employees/${employeeList[editIndex].id}`, formData);
        const updatedList = [...employeeList];
        updatedList[editIndex] = formData;
        setEmployeeList(updatedList);
        setIsEdit(false);
        setEditIndex(null);
      } else {
        // Add new employee via POST request
        const response = await axios.post("https://your-api-endpoint.com/employees", formData);
        setEmployeeList([...employeeList, response.data]);
      }
      setFormData({ contactPerson: "", phone: "", email: "" });
      setErrors({});
    } catch (error) {
      console.error("Error adding/updating employee:", error);
    }
  };

  const handleCancel = () => {
    setFormData({ contactPerson: "", phone: "", email: "" });
    setErrors({});
    setIsEdit(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(employeeList[index]);
    setIsEdit(true);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`https://your-api-endpoint.com/employees/${employeeList[index].id}`);
      const updatedList = employeeList.filter((_, i) => i !== index);
      setEmployeeList(updatedList);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };



   // Fetch employees from the API on mount
   useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://your-api-endpoint.com/employees");
        setEmployeeList(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);


  return (
    <section className="w-full h-full">
      <div className="w-full h-24 overflow-y-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-cyan-700">
        <Newheader />
      </div>

      <div className="flex w-full h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-auto bg-gray-100">
          <div className="bg-white p-6 flex flex-col rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-cyan-700">
              {isEdit ? "Edit Employee" : "Add Employee"}
            </h3>
            <div className="space-y-4 w-1/2">
              {["contactPerson", "phone", "email","DOB"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {field === "contactPerson" ? "Contact Person" : field}
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-md ${
                      errors[field] ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    placeholder={`Enter ${field}`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
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
                onClick={handleAddEmployee}
                className="w-1/2 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition duration-300"
              >
                {isEdit ? "Update" : "Submit"}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-xl font-semibold text-cyan-700 mb-4">
              Employee List
            </h3>
            <div className="overflow-auto max-h-96">
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-left">Contact Person</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employeeList.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{employee.contactPerson}</td>
                      <td className="px-4 py-2">{employee.phone}</td>
                      <td className="px-4 py-2">{employee.email}</td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => handleEdit(index)}
                            className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                          >
                            <CiEdit className="size-6" />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Add_Employee;
