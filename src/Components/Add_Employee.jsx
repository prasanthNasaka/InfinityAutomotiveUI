

import { useState, useEffect } from "react";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";

const Add_Employee = () => {
  const [formData, setFormData] = useState({
    empId: null,
    empName: "",
    phone: "",
    email: "",
    role: "Others", // Default role is "Others"
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate Form
  const validateForm = () => {
    let formErrors = {};
    if (!formData.empName) formErrors.empName = "Employee Name is required";
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

  // Add Employee
  const handleAddEmployee = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        empName: formData.empName,
        email: formData.email,
        phone: Number(formData.phone),
        role: formData.role,
      };

      console.log("Payload to send:", payload);

      const response = await axios.post(`${BASE_URL}/api/Employee`, payload);

      console.log("Employee Added Successfully:", response.data);
      setEmployeeList([...employeeList, response.data]);

      setFormData({
        empId: null,
        empName: "",
        phone: "",
        email: "",
        role: "Others",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding employee:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Status Code:", error.response.status);
      }
    }
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setFormData({
      empId: employee.empId,
      empName: employee.empName,
      phone: employee.phone.toString(),
      email: employee.email,
      role: employee.role || "Others",
    });
  };

  // Update Employee
  const handleUpdateEmployee = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        empId: formData.empId,
        empName: formData.empName,
        email: formData.email,
        phone: Number(formData.phone),
        role: formData.role,
      };

      const response = await axios.put(
        `${BASE_URL}/api/Employee/${formData.empId}`,
        payload
      );

      const updatedEmployeeList = employeeList.map((emp) =>
        emp.empId === response.data.empId ? response.data : emp
      );
      setEmployeeList(updatedEmployeeList);

      setFormData({
        empId: null,
        empName: "",
        phone: "",
        email: "",
        role: "Others",
      });
      setErrors({});
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/Employee`);
        if (response.data && Array.isArray(response.data)) {
          setEmployeeList(response.data);
        } else {
          console.error(
            "Error: API response doesn't contain expected array",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <section className="w-full h-full">
      <Newheader />

      <div className="flex w-full h-[calc(100vh-6rem)]">
        <MainSideBar />

        <div className="flex-1 p-6 space-y-6 overflow-auto bg-gray-100">
          <div className="bg-white p-6 flex flex-col rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-cyan-700">
              {formData.empId ? "Edit Employee" : "Add Employee"}
            </h3>
            <div className="space-y-4 w-1/2">
              {["empName", "phone", "email"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {field === "empName" ? "Employee Name" : field}
                  </label>

                  <input
                    type={
                      field === "email" ? "email" : field === "phone" ? "tel" : "text"
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-md ${
                      errors[field] ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    placeholder={`Enter ${field}`}
                  />

                  {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full p-3 border-2 rounded-md ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                >
                  <option value="Others">Others</option>
                  <option value="Employee">Employee</option>
                  <option value="Scrutineer">Scrutineer</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>
            </div>

            <div className="flex w-1/2 gap-4 mt-4">
              <button
                onClick={() =>
                  setFormData({
                    empId: null,
                    empName: "",
                    phone: "",
                    email: "",
                    role: "Others",
                  })
                }
                className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={formData.empId ? handleUpdateEmployee : handleAddEmployee}
                className="w-1/2 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition duration-300"
                disabled={loading}
              >
                {loading ? "Processing..." : formData.empId ? "Update" : "Submit"}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-xl font-semibold text-cyan-700 mb-4">Employee List</h3>
            <table className="w-full text-sm text-gray-700 border-collapse">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map((emp) => (
                  <tr key={emp.empId} className="border-t">
                    <td className="py-3 px-4">{emp.empName}</td>
                    <td className="py-3 px-4">{emp.phone}</td>
                    <td className="py-3 px-4">{emp.email}</td>
                    <td className="py-3 px-4">{emp.role}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="text-cyan-600 hover:text-cyan-800"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Add_Employee;
