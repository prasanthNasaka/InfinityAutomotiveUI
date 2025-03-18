import { useState, useEffect } from "react";
// import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import { CiEdit } from "react-icons/ci";
import Styles from "../constants/Styles";
import AxiosInstance from "./AxiosInstance";
// import { MdOutlineDelete } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";

const userTypeMapping = {
  102: "Manager",
  103: "Entry Desk",
  104: "Registration Desk",
  105: "Scrutineer",
};

const Emp_Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: 0,
    employeeId: "",
    compid: 1,
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch the employee list from the Employee API
  const fetchEmployees = async () => {
    try {
      const response = await AxiosInstance.get(`${BASE_URL}/api/Employee`);
      const employees = response.data || [];
      setEmployeeList(employees);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Error fetching employee data"); // Show toast on error
    }
  };

  // Fetch the user list from the UserInfo API
  const fetchUsers = async () => {
    try {
      const response = await AxiosInstance.get(`${BASE_URL}/api/UserInfo`);
      const users = response.data.data || [];
      setUserList(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data"); // Show toast on error
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validateForm = () => {
    let formErrors = {};

    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.role) formErrors.role = "Role is required";
    if (!formData.employeeId) formErrors.employeeId = "Employee is required";

    if (!isEdit) {
      if (!formData.password) formErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword) {
        formErrors.confirmPassword = "Passwords do not match";
      }
    } else if (
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation Errors:", errors);
      return;
    }

    const employee = {
      id: isEdit ? userList[editIndex].id : 0,
      username: formData.username,
      password: formData.password || "",
      usertype: parseInt(formData.role, 10),
      compid: formData.compid,
      empId: parseInt(formData.employeeId, 10),
      isActive: true,
    };

    try {
      const response = isEdit
        ? await AxiosInstance.put(`${BASE_URL}/api/UserInfo`, employee) // Update
        : await AxiosInstance.post(`${BASE_URL}/api/UserInfo/SignUp`, employee); // Create

      if (response.status === 200 || response.status === 201) {
        // Show different success messages based on whether it's an update or create
        if (isEdit) {
          toast.success("User Updated Successfully!"); // Success message for update
        } else {
          toast.success("User Created Successfully!"); // Success message for creation
        }

        fetchUsers(); // Refresh user list
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
      toast.error(error.response?.data?.title || "Error submitting data"); // Show error toast
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      role: 0,
      employeeId: "",
      compid: 1,
    });
    setErrors({});
    setIsEdit(false);
    setEditIndex(null);
  };

  // Handle edit action
  const handleEdit = (index) => {
    const user = userList[index];
    setFormData({
      username: user.username || "",
      password: "", // Prompt user to enter the password again
      confirmPassword: "",
      role: user.usertype || 0,
      employeeId: user.empId.toString(),
      compid: user.compid || 1,
    });
    setIsEdit(true);
    setEditIndex(index);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchEmployees();
    fetchUsers();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <section className="w-full h-screen flex flex-col">
        <div className="overflow-y-hidden shadow-lg">
          <Newheader />
        </div>

        <div className="flex overflow-hidden h-[calc(100vh-1rem)]">
          <div className="h-full">
            <MainSideBar />
          </div>

          <div className="flex-1 p-2 overflow-y-auto">
            <div className="max-w-full mx-auto">
              <div className="bg-white mb-6">
                <div className="bg-white w-full flex flex-col items-center rounded-lg ">
                  {errors.submit && (
                    <p className="text-red-500 mb-4">{errors.submit}</p>
                  )}
                  <div className="space-y-4 w-full">
                    <div className="space-y-6 overflow-auto mb-2">
                      <div className="bg-white flex flex-col items-center rounded-lg w-full">
                        <div className="flex w-full p-2">
                          <h3
                            style={Styles.heading}
                            className="text-2xl font-semibold mb-4 text-center text-cyan-700"
                          >
                            {isEdit ? "Edit Employee Login" : "Employee Login"}
                          </h3>
                        </div>

                        {/* Form Container */}
                        <div className="w-full p-2">
                          {/* First Row - Username & Employee Selection */}
                          <div className="flex items-center gap-4">
                            <div className="w-1/2">
                              <label
                                style={Styles.label}
                                className="block text-sm font-semibold text-gray-700 mb-1"
                              >
                                User Name
                              </label>
                              <input
                                style={Styles.select}
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                readOnly={isEdit}
                                className={`w-full p-3 border-2 rounded-md ${
                                  errors.username
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-black ${
                                  isEdit ? "bg-gray-100" : ""
                                }`}
                                placeholder="Enter User Name"
                              />
                              {errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.username}
                                </p>
                              )}
                            </div>

                            <div className="w-1/2">
                              <label
                                style={Styles.label}
                                className="block text-sm font-semibold text-gray-700"
                              >
                                Employee
                              </label>
                              <select
                                style={Styles.select}
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                required
                              >
                                <option value="">Select Employee</option>
                                {employeeList.map((employee) => (
                                  <option
                                    key={employee.empId}
                                    value={employee.empId}
                                  >
                                    {employee.empName}
                                  </option>
                                ))}
                              </select>
                              {errors.employeeId && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.employeeId}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Second Row - Password & Confirm Password */}
                          <div className="flex gap-4 mt-4">
                            {["password", "confirmPassword"].map((field) => (
                              <div className="w-1/2" key={field}>
                                <label
                                  style={Styles.label}
                                  className="block text-sm font-semibold text-gray-700 mb-1"
                                >
                                  {field === "password"
                                    ? "Password"
                                    : "Confirm Password"}
                                  {isEdit &&
                                    " (Leave blank to keep current password)"}
                                </label>
                                <input
                                  style={Styles.select}
                                  type="password"
                                  name={field}
                                  value={formData[field]}
                                  onChange={handleChange}
                                  className={`w-full p-3 border-2 rounded-md ${
                                    errors[field]
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } focus:outline-none focus:ring-2 focus:ring-black`}
                                  placeholder={`Enter ${
                                    field === "password"
                                      ? "Password"
                                      : "Confirm Password"
                                  }${isEdit ? " (optional)" : ""}`}
                                />
                                {errors[field] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors[field]}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Third Row - User Type */}
                          <div className="w-full mt-4">
                            <label
                              style={Styles.label}
                              className="block text-sm font-semibold text-gray-700"
                            >
                              User Type
                            </label>
                            <select
                              style={Styles.select}
                              name="role"
                              value={formData.role}
                              onChange={handleChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                              required
                            >
                              <option value={0}>Select Role</option>
                              {Object.entries(userTypeMapping).map(
                                ([key, value]) => (
                                  <option key={key} value={key}>
                                    {value}
                                  </option>
                                )
                              )}
                            </select>
                            {errors.role && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.role}
                              </p>
                            )}
                          </div>

                          {/* Buttons */}
                          <div className="flex w-full gap-4 mt-4">
                            <button
                              onClick={resetForm}
                              className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSubmit}
                              className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                            >
                              {isEdit ? "Update" : "Submit"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full p-1 space-y-6 overflow-auto">
                {/* User List Table */}
                <div className="bg-white flex flex-col items-center p-6 w-full rounded-lg shadow-lg">
                  <div className="w-full h-auto flex">
                    <h3
                      style={Styles.tableheading}
                      className="text-xl font-semibold text-cyan-700 mb-4"
                    >
                      User List
                    </h3>
                  </div>

                  <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr style={Styles.label}>
                        <th className="px-4 py-2 text-left">Employee Name</th>
                        <th className="px-4 py-2 text-left">Username</th>
                        <th className="px-4 py-2 text-left">User Type</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {userList.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2">{user.empName || "N/A"}</td>
                          <td className="px-4 py-2">
                            {user.username || "N/A"}
                          </td>
                          <td className="px-4 py-2">
                            {userTypeMapping[user.usertype] || "N/A"}
                          </td>
                          <td className="py-2 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEdit(index)}
                                className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                              >
                                <CiEdit className="size-6" />
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
        </div>
      </section>
    </>
  );
};

export default Emp_Login;
