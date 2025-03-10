import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import { CiEdit } from "react-icons/ci";
// import { MdOutlineDelete } from "react-icons/md";

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
    compid: 1, // Store selected company ID
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [userList, setUserList] = useState([]); // For storing users from UserInfo API
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch the employee list from the Employee API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/Employee`);

      const employees = response.data.$values; // Get the array of employees
      console.log("Employee API Response:", employees);

      if (employees && Array.isArray(employees)) {
        setEmployeeList(employees); // Set employee list
      } else {
        console.error("API response is not in the expected format:", employees);
        setEmployeeList([]);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setEmployeeList([]);
    }
  };

  // Fetch the user list from the UserInfo API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/UserInfo`);
      console.log("UserInfo API Response:", response);

      const users = response.data.data.$values; // Get the array of users

      if (users && Array.isArray(users)) {
        setUserList(users); // Set user list
      } else {
        console.error("API response is not in the expected format:", users);
        setUserList([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserList([]);
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
      if (formData.password !== formData.confirmPassword)
        formErrors.confirmPassword = "Passwords do not match";
    } else if (
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("Validation Errors:", errors);
      return;
    }

    const employee = {
      id: isEdit ? userList[editIndex].id : 0, // Correctly set ID
      username: formData.username,
      password: formData.password || "",
      usertype: parseInt(formData.role, 10),
      compid: formData.compid,
      empId: parseInt(formData.employeeId, 10),
      isActive: true,
    };

    console.log("Submitting data:", employee);

    try {
      const response = isEdit
        ? await axios.put(`${BASE_URL}/api/UserInfo`, employee)
        : await axios.post(`${BASE_URL}/api/UserInfo/SignUp`, employee);

      if (response.status === 200 || response.status === 201) {
        console.log("Operation successful:", response.data);
        fetchUsers(); // Refresh user list
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setErrors({
          submit: "Error submitting data: " + error.response.data.title,
        });
      } else {
        setErrors({ submit: "Error submitting data: " + error.message });
      }
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
    console.log("index", index);

    const user = userList[index];
    setFormData({
      username: user.username || "",
      password: "", // Prompt user to enter the password again
      confirmPassword: "",
      role: user.usertype || 0,
      employeeId: user.empId.toString(), // Convert to string since this is the expected format for select inputs
      compid: user.compid || 1,
    });
    console.log("Editing user:", user);
    console.log("Form data set to:", {
      username: user.username,
      role: user.usertype,
      employeeId: user.empId.toString(),
      compid: user.compid,
    });
    setIsEdit(true);
    setEditIndex(index);
  };

  // Handle delete action
  // const handleDelete = async (index) => {
  //   const userId = userList[index].id; // Get the user ID to delete
  //   try {
  //     await axios.delete(`${BASE_URL}/api/UserInfo/${userId}`);
  //     fetchUsers(); // Refresh user list after deletion
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchEmployees();
    fetchUsers(); // Fetch users from UserInfo API
  }, []);

  return (
    <>
      <section className="w-full h-screen flex flex-col">
        <div className="overflow-y-hidden drop-shadow-lg">
          <Newheader />
        </div>

        <div className="flex overflow-hidden h-[calc(100vh-1rem)]">
          <div className="h-full">
            <MainSideBar />
          </div>

          <div className="flex-1 p-6 space-y-6 overflow-auto bg-gray-100">
            <div className="bg-white p-6 flex flex-col items-center rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-700">
                {isEdit ? "Edit Emp_Login" : "Emp_Login"}
              </h3>
              {errors.submit && (
                <p className="text-red-500 mb-4">{errors.submit}</p>
              )}
              <div className="space-y-4 w-1/2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    readOnly={isEdit} // Make username read-only when editing
                    className={`w-full p-3 border-2 rounded-md ${
                      errors.username ? "border-red-500" : "border-gray-300"
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

                {["password", "confirmPassword"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {field === "password" ? "Password" : "Confirm Password"}
                      {isEdit && " (Leave blank to keep current password)"}
                    </label>
                    <input
                      type="password"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full p-3 border-2 rounded-md ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-black`}
                      placeholder={`Enter ${
                        field === "password" ? "Password" : "Confirm Password"
                      }${isEdit ? " (optional)" : ""}`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="w-full gap-2 flex flex-col mt-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Employee
                  </label>
                  <select
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  >
                    <option value="">Select Employee</option>
                    {employeeList.map((employee) => (
                      <option key={employee.empId} value={employee.empId}>
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

                <div className="w-full gap-2 flex flex-col">
                  <label className="block text-sm font-semibold text-gray-700">
                    User Type
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  >
                    <option value={0}>Select Role</option>
                    {Object.entries(userTypeMapping).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                  )}
                </div>

                <div className="flex w-1/2 gap-4 mt-4">
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

            {/* User List Table */}
            <div className="bg-white flex flex-col items-center p-6 w-full rounded-lg shadow-lg mt-6">
              <h3 className="text-xl font-semibold text-cyan-700 mb-4">
                User List
              </h3>
              <table className="w-3/4 text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
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
                      <td className="px-4 py-2">{user.username || "N/A"}</td>
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
                          {/* <button
                            onClick={() => handleDelete(index)} // Call handleDelete on click
                            className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
                          >
                            <MdOutlineDelete className="size-6" />
                          </button> */}
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
