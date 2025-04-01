import { useState, useEffect } from "react";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import { BASE_URL } from "../constants/global-const";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Styles from "../constants/Styles";
import AxiosInstance from "./AxiosInstance";
import { Tooltip as ReactTooltip } from "react-tooltip";


const EmployeeTypes = {
  OTHERS: 0,
  EMPLOYEE: 86,
  ORGANISER: 87,
  SCRUTINEER: 88,
};

const Add_Employee = () => {
  const [formData, setFormData] = useState({
    empId: null,
    empName: "",
    phone: "",
    email: "",
    role: EmployeeTypes.OTHERS,
    otherInfo: "",
  });

  const [employeeList, setEmployeeList] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredData = employeeList.filter((emp) => {
    return (
      emp.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone.includes(searchQuery) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeType.toString().includes(searchQuery)
    );
  });

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const options = [
    { value: 10, label: "10 per page" },
    { value: 20, label: "20 per page" },
    { value: 50, label: "50 per page" },
  ];

  const handleOptionClick = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.empName.trim())
      formErrors.empName = "Employee Name is required";
    if (!formData.phone.trim()) formErrors.phone = "Phone number is required";
    if (!formData.email.trim()) formErrors.email = "Email is required";
    if (!formData.otherInfo.trim())
      formErrors.otherInfo = "Other info is required";
    if (formData.role === EmployeeTypes.OTHERS)
      formErrors.role = "Please select a role";

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
      setLoading(true);
      const payload = {
        empName: formData.empName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        otherInfo: formData.otherInfo.trim(),
        employeeType: formData.role,
        status: 0,
        comId: 2, // Set the comId to the required value
      };

      const response = await AxiosInstance.post(
        `${BASE_URL}/api/Employee`,
        payload
      );
      if (response.status === 201) {
        setEmployeeList((prev) => [...prev, response.data]);
        resetForm();
        toast.success("Employee added successfully!");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error(error.response?.data?.message || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      empId: employee.empId,
      empName: employee.empName || "",
      phone: employee.phone || "",
      email: employee.email || "",
      role: employee.employeeType || EmployeeTypes.OTHERS,
      otherInfo: employee.otherInfo || "",
    });
  };

  const handleUpdateEmployee = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const payload = {
        empName: formData.empName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        otherInfo: formData.otherInfo.trim(),
        employeeType: formData.role,
        status: 0,
        comId: 2, // Ensure comId is included for updates as well
      };

      const response = await AxiosInstance.put(
        `api/Employee/${formData.empId}`,
        payload
      );
      if (response.status === 200) {
        const updatedEmployeeList = employeeList.map((emp) =>
          emp.empId === response.data.empId ? response.data : emp
        );
        setEmployeeList(updatedEmployeeList);
        resetForm();
        toast.success("Employee updated successfully!");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error(error.response?.data?.message || "Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      setLoading(true);
      await AxiosInstance.delete(`api/Employee/${id}`);
      setEmployeeList(employeeList.filter((employee) => employee.empId !== id));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      empId: null,
      empName: "",
      phone: "",
      email: "",
      role: EmployeeTypes.OTHERS,
      otherInfo: "",
    });
    setErrors({});
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await AxiosInstance.get(`${BASE_URL}/api/Employee`);
        setEmployeeList(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployeeList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <section className="w-full h-screen flex flex-col">
        <div className="overflow-y-hidden shadow-lg">
          <Newheader />
        </div>
        <div className="flex h-[calc(100vh-1rem)] overflow-hidden">
          <div className="h-full">
            <MainSideBar />
          </div>
          <div className="flex-1 p-2 overflow-y-auto">
            <div className="max-w-full mx-auto">
              <div className="bg-white mb-6">
                <div className="bg-white flex flex-col">
                  <div className="p-2 ml-2 flex">
                    <h3
                      style={Styles.heading}
                      className="text-2xl font-semibold mb-4 text-cyan-700"
                    >
                      {formData.empId
                        ? "Edit Employee"
                        : "Organizing Committee Member"}
                    </h3>
                  </div>
                  <div className="w-full h-full border-1 p-4  border mb-4 rounded-lg">
                    <div className="w-full h-auto flex gap-2 ">
                      <div className="flex flex-col gap-2 w-1/2  ">
                        {["empName", "phone", "email"].map((field) => (
                          <div key={field} className="w-full">
                            <label
                              style={Styles.label}
                              className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                              style={Styles.input}
                              type={field === "email" ? "email" : "text"}
                              name={field}
                              value={formData[field]}
                              onChange={handleChange}
                              maxLength={field === "phone" ? 10 : undefined}
                              className={`w- p-3 border-2 rounded-md ${
                                errors[field]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:outline-none `}
                              placeholder={`Enter ${
                                field.charAt(0).toUpperCase() + field.slice(1)
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

                      <div className="w-1/2 flex flex-col gap-2">
                        <div className="w-full flex-items-center ">
                          <label
                            style={Styles.label}
                            className="block text-sm font-semibold text-gray-700 mb-1"
                          >
                            Type
                          </label>
                          <select
                          data-tooltip-id="my-tooltip-1"
                            style={Styles.select}
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none "
                          >
                            <option value={EmployeeTypes.OTHERS}>
                              Select Type
                            </option>
                            <option value={EmployeeTypes.EMPLOYEE}>
                              Employee
                            </option>
                            <option value={EmployeeTypes.ORGANISER}>
                              Organiser
                            </option>
                            <option value={EmployeeTypes.SCRUTINEER}>
                              Scrutineer
                            </option>
                          </select>
                          {errors.role && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.role}
                            </p>
                          )}
                        </div>
                        <ReactTooltip
                          id="my-tooltip-1"
                          place="bottom"
                          variant="info"
                          content="Please Select Type"
                        />
                        <div className="w-full">
                          <label
                            style={Styles.label}
                            className="block text-sm font-semibold text-gray-700 mb-1"
                          >
                            Other Info
                          </label>
                          <input
                            style={Styles.input}
                            type="text"
                            name="otherInfo"
                            value={formData.otherInfo}
                            onChange={handleChange}
                            className={`  w-full p-3 border-2 rounded-md ${
                              errors.otherInfo
                                ? "border-red-500"
                                : "border-gray-300"
                            } focus:outline-none `}
                            placeholder="Enter Other Info"
                          />
                          {errors.otherInfo && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.otherInfo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                   <div className="w-full flex justify-end">
                   <div className="flex w-1/2 justify-end  gap-4 mt-4">
                      <button
                        onClick={resetForm}
                        className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={
                          formData.empId
                            ? handleUpdateEmployee
                            : handleAddEmployee
                        }
                        className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                        disabled={loading}
                      >
                        {loading
                          ? "Processing..."
                          : formData.empId
                          ? "Update"
                          : "Submit"}
                      </button>
                    </div>
                   </div>
                   
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full bg-white rounded-lg">
                  <div className="w-full h-auto rounded-t-lg p-2 flex justify-center items-center border bg-gray-50 border-b">
                    <h3
                      style={Styles.tableheading}
                      className="text-xl font-semibold text-cyan-700"
                    >
                      Employee List
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
                  {employeeList.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-gray-700 border-collapse">
                        <thead className="bg-gray-50 text-gray-600">
                          <tr style={Styles.label}>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Phone</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">
                              Employee Type
                            </th>
                            <th className="py-3 px-4 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRecords.map((emp) => (
                            <tr
                              key={emp.empId}
                              className="border-t hover:bg-gray-50"
                            >
                              <td className="py-3 px-4">{emp.empName}</td>
                              <td className="py-3 px-4">{emp.phone}</td>
                              <td className="py-3 px-4">{emp.email}</td>
                              <td className="py-3 px-4 text-center">
                                {emp.employeeType === EmployeeTypes.EMPLOYEE
                                  ? "Employee"
                                  : emp.employeeType === EmployeeTypes.ORGANISER
                                  ? "Organiser"
                                  : emp.employeeType ===
                                    EmployeeTypes.SCRUTINEER
                                  ? "Scrutineer"
                                  : "Others"}
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  onClick={() => handleEdit(emp)}
                                  className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                                >
                                  <CiEdit className="size-6" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteEmployee(emp.empId)
                                  }
                                  className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
                                >
                                  <MdOutlineDelete className="size-6" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      {loading ? "Loading employees..." : "No employees found."}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {filteredData.length > 0 && (
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
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Add_Employee;
