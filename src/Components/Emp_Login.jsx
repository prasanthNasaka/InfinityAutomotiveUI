/* eslint-disable react/prop-types */
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
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("none");

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


  const options = [
    { value: 5, label: "5 per page" },
    { value: 10, label: "10 per page" },
    { value: 20, label: "20 per page" },
    { value: 50, label: "50 per page" },
  ];

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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? "none" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortingIcon = ({ direction }) => {
    if (direction === "asc") return <FaSortUp className="ms-1" />;
    if (direction === "desc") return <FaSortDown className="ms-1" />;
    return <FaSort className="ms-1" />;
  };

  const getSortedData = () => {
    if (sortDirection === "none" || !sortField) return [...userList];

    return [...userList].sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredData = getSortedData().filter((user) => {
    return (
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.empName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handleOptionClick = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1);
    setIsDropdownOpen(false);
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
                        <div className="flex w-full ml-2  p-2">
                          <h3
                            style={Styles.heading}
                            className="text-2xl font-semibold mb-4 text-center text-cyan-700"
                          >
                            {isEdit ? "Edit Employee Login" : "Employee Login"}
                          </h3>
                        </div>

                        {/* Form Container */}
                        <div className="w-full p-3 gap-2 border rounded-lg">
                          <div className="w-full flex justify-center">
                            <ReactTooltip
                              id="my-tooltip-1"
                              place="bottom"
                              variant="info"
                              content="Please Select Employee Name"
                            />

                            <ReactTooltip
                              id="my-tooltip-2"
                              place="bottom"
                              variant="info"
                              content="Please Enter Username"
                            />

                            <ReactTooltip
                              id="my-tooltip-3"
                              place="bottom"
                              variant="info"
                              content="Please Select Role"
                            />
                            <div className="w-1/2">
                              <label
                                style={Styles.label}
                                className="block text-sm font-semibold text-gray-700"
                              >
                                Employee
                              </label>
                              <select
                                data-tooltip-id="my-tooltip-1"
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

                          <div className="flex items-end justify-center gap-3 w-full ">
                            <div className="w-1/2 ">
                              <label
                                style={Styles.label}
                                className="block text-sm font-semibold text-gray-700 mb-1"
                              >
                                User Name
                              </label>
                              <input
                                data-tooltip-id="my-tooltip-2"
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
                            <div className="w-1/2 ">
                              <label
                                style={Styles.label}
                                className="block text-sm font-semibold text-gray-700"
                              >
                                User Type
                              </label>
                              <select
                                data-tooltip-id="my-tooltip-3"
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
                          </div>

                          <div className="flex gap-3">
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

                          {/* Buttons */}
                          <div className="w-full flex justify-end mt-3 ">
                            <div className="flex w-1/2  gap-4 ">
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
              </div>
              <div className="w-full">
                <div className="w-full bg-white rounded-lg">
                  <div className="w-full h-auto rounded-t-lg p-2 flex  items-center border bg-gray-50 border-b">
                    <h3 style={Styles.tableheading} className="text-xl font-semibold text-cyan-700">
                      User List
                    </h3>
                  </div>
                  <div className="w-full h-auto border flex justify-between items-center p-2">
                    <div className="w-1/2 ">
                      <input
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                    <div className="w-1/2 flex justify-end">
                      <div className="w-full flex relative justify-end items-center">
                        <label
                          htmlFor="pageType-select"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Page Type
                        </label>
                        <button
                          id="pageType-select"
                          className="w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          aria-haspopup="true"
                          aria-expanded={isDropdownOpen}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{`${recordsPerPage} per page`}</span>
                            <svg
                              className="h-4 w-4 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" />
                            </svg>
                          </div>
                        </button>
                        {isDropdownOpen && (
                          <div className="absolute mt-1 top-12 w-1/2 rounded-md bg-white shadow-lg">
                            <ul className="py-1">
                              {options.map((option, index) => (
                                <li
                                  key={index}
                                  className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() =>
                                    handleOptionClick(option.value)
                                  }
                                >
                                  {option.label}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" border rounded-b-lg overflow-hidden bg-white shadow-md">
                    <table className="w-full text-sm text-gray-700  border-collapse">
                      <thead className="bg-gray-50 text-gray-600">
                        <tr>
                          <th
                            className="px-4 py-2 text-left cursor-pointer"
                            onClick={() => handleSort("empName")}
                          >
                            <div className="flex items-center justify-center gap-1">
                            Employee Name
                            <SortingIcon
                              direction={
                                sortField === "empName" ? sortDirection : "none"
                              }
                            />
                            </div>
                          </th>
                          <th
                            className="px-4 py-2 text-left cursor-pointer"
                            onClick={() => handleSort("username")}
                          >
                             <div className="flex items-center justify-center gap-1">

                            Username
                            <SortingIcon
                              direction={
                                sortField === "username"
                                  ? sortDirection
                                  : "none"
                              }
                            />
                            </div>
                          </th>
                          <th
                            className="px-4 py-2 text-left cursor-pointer"
                            onClick={() => handleSort("usertype")}
                          >
                             <div className="flex items-center justify-center gap-1">
                            User Type
                            <SortingIcon
                              direction={
                                sortField === "usertype"
                                  ? sortDirection
                                  : "none"
                              }
                            />
                            </div>
                          </th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentRecords.map((user, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            
                            <td className="px-4 py-2">
                            <div className="flex items-center justify-center gap-1">
                              {user.empName || "N/A"}
                              </div>
                            </td>
                            <td className="px-4 py-2">
                            <div className="flex items-center justify-center gap-1">
                              {user.username || "N/A"}
                              </div>
                            </td>
                            <td className="px-4 py-2">
                            <div className="flex items-center justify-center gap-1">
                              {userTypeMapping[user.usertype] || "N/A"}
                              </div>
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
                  <div className="flex justify-end px-2 items-center space-x-2 m-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-cyan-500 text-white hover:bg-cyan-700"
                      }`}
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-md ${
                            currentPage === page
                              ? "bg-cyan-700 text-white"
                              : "bg-gray-200 hover:bg-gray-400"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-cyan-500 text-white hover:bg-cyan-700"
                      }`}
                    >
                      Next
                    </button>
                  </div>
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
