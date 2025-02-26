
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";

const Emp_Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    company: "", // Add company field to form data
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch the employee data when the component mounts
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/User`);
      const employees = response.data;

      // Handle response format
      if (employees && Array.isArray(employees.$values)) {
        setEmployeeList(employees.$values); // Extract data from $values
      } else {
        console.error("API response is not in the expected format:", employees);
        setEmployeeList([]); // Set an empty array if response format is unexpected
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setEmployeeList([]); // Reset list on error
    }
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validateForm = () => {
    let formErrors = {};

    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.confirmPassword)
      formErrors.confirmPassword = "Confirm Password is required";
    if (!formData.role) formErrors.role = "Role is required";
    if (!formData.company) formErrors.company = "Company is required"; // Validate company field
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return; // Only submit if validation is successful

    const employee = {
      email: formData.username,
      password: formData.password,
      role: formData.role,
      company: formData.company, // Add company data here
    };

    try {
      let response;

      if (isEdit) {
        // Update existing employee
        const updatedEmployee = {
          ...employee,
          id: employeeList[editIndex].id, // Include the existing employee's id
        };
        response = await axios.post(
          `${BASE_URL}/api/User/${updatedEmployee.id}`,
          updatedEmployee
        );

        if (response.status === 200) {
          const updatedList = [...employeeList];
          updatedList[editIndex] = updatedEmployee;
          setEmployeeList(updatedList);
        }
      } else {
        // Add new employee
        response = await axios.post(`${BASE_URL}/api/User`, employee);

        if (response.status === 201) {
          fetchEmployees(); // Re-fetch employee list after adding new employee
        }
      }

      // Reset form after successful submit
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        role: "",
        company: "", // Reset the company field
      });
      setErrors({});
      setIsEdit(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
      company: "", // Reset company field
    });
    setErrors({});
    setIsEdit(false);
    setEditIndex(null);
  };

  // Handle editing an employee
  const handleEdit = (index) => {
    setFormData({
      username: employeeList[index].email,
      password: employeeList[index].password,
      confirmPassword: employeeList[index].password,
      role: employeeList[index].role,
      company: employeeList[index].company, // Fill company data when editing
    });
    setIsEdit(true);
    setEditIndex(index);
  };

  // Handle deleting an employee
  // const handleDelete = async (index) => {
  //   try {
  //     const employeeId = employeeList[index].id;
  //     const response = await axios.delete(`${BASE_URL}/api/User/${employeeId}`);
  //     if (response.status === 200) {
  //       const updatedList = employeeList.filter((_, i) => i !== index);
  //       setEmployeeList(updatedList);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting employee:", error);
  //   }
  // };

  // Fetch employee data when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <section className="w-full h-full">
        {/* Your Header and Sidebar here */}
        <div className="w-full h-24 overflow-y-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-cyan-700">
          <Newheader />
        </div>

        <div className="flex w-full h-[calc(100vh-6rem)]">
          {/* Sidebar */}
          <div className="bg-gray-100">
            {/* MainSideBar */}
            <MainSideBar />
          </div>

          {/* Form Area */}
          <div className="flex-1 p-6 space-y-6 overflow-auto bg-gray-100">
            {/* Login Form Section */}
            <div className="bg-white p-6 flex flex-col items-center rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-700">
                Login
              </h3>
              <div className="space-y-4 w-1/2 ">
                {["email", "password", "confirmPassword", "company"].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {field === "email"
                          ? "Email"
                          : field === "password"
                          ? "Password"
                          : field === "confirmPassword"
                          ? "Confirm Password"
                          : "Company"}
                      </label>
                      <input
                        type={
                          field === "password" || field === "confirmPassword"
                            ? "password"
                            : field === "email"
                            ? "email"
                            : "text"
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className={`w-full p-3 border-2 rounded-md ${
                          errors[field] ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-black`}
                        placeholder={`Enter ${
                          field === "email"
                            ? "Email"
                            : field === "password"
                            ? "Password"
                            : field === "confirmPassword"
                            ? "Confirm Password"
                            : "Company Name"
                        }`}
                      />
                      {errors[field] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Role Dropdown */}
              <div className="w-1/2 gap-2 flex flex-col">
                <label className="block text-sm font-semibold text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option>Admin</option>
                  <option>Scrutineer</option>
                  <option>Racer</option>
                  <option>Audions</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>

              <div className="flex w-1/2 gap-4 mt-4">
                <button
                  onClick={handleCancel}
                  className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-1/2 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition duration-300"
                >
                  {isEdit ? "Update" : "Submit"}
                </button>
              </div>
            </div>

            {/* Employee Table Section */}
            <div className="bg-white flex flex-col items-center p-6 w-full rounded-lg shadow-lg mt-6">
              <h3 className="text-xl font-semibold text-cyan-700 mb-4">
                Employee List
              </h3>
              <table className="w-3/4 text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-left">Username</th>
                    <th className="px-4 py-2 text-left">Company</th>{" "}
                    {/* New Company column */}
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {employeeList.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{employee.email}</td>
                      <td className="px-4 py-2">{employee.company}</td>{" "}
                      {/* Display company here */}
                      <td className="px-4 py-2">{employee.role}</td>
                      <td className="py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            // onClick={() => handleDelete(index)}
                            className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
                          >
                            Delete
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

export default Emp_Login;
