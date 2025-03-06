// import { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../constants/global-const";
// import MainSideBar from "./MainSideBar";
// import Newheader from "./Newheader";

// const Emp_Login = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//     company: "",
//   });
//   const [employeeList, setEmployeeList] = useState([]);
//   const [isEdit, setIsEdit] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [errors, setErrors] = useState({});

//   // Fetch the employee data when the component mounts
//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/api/User`);
//       const employees = response.data;

//       // Ensure that you're accessing the $values array properly
//       if (employees && Array.isArray(employees.$values)) {
//         setEmployeeList(employees.$values); // Now it will set the employeeList correctly
//       } else {
//         console.error("API response is not in the expected format:", employees);
//         setEmployeeList([]); // Reset list if response format is unexpected
//       }
//     } catch (error) {
//       console.error("Error fetching employee data:", error);
//       setEmployeeList([]); // Reset list on error
//     }
//   };

//   // Handle input changes in the form
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Validate form data
//   const validateForm = () => {
//     let formErrors = {};

//     if (!formData.username) formErrors.username = "Username is required";
//     if (!formData.password) formErrors.password = "Password is required";
//     if (!formData.confirmPassword)
//       formErrors.confirmPassword = "Confirm Password is required";
//     if (!formData.role) formErrors.role = "Role is required";
//     if (!formData.company) formErrors.company = "Company is required";
//     if (formData.password !== formData.confirmPassword)
//       formErrors.confirmPassword = "Passwords do not match";

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   // Handle form submission (Add or Update)
//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     const employee = {
//       email: formData.username,
//       password: formData.password,
//       role: formData.role,
//       companyName: formData.company,
//     };

//     try {
//       let response;

//       if (isEdit) {
//         // Update existing employee
//         const updatedEmployee = {
//           ...employee,
//           id: employeeList[editIndex].id, // Include the existing employee's id
//         };
//         response = await axios.put(
//           `${BASE_URL}/api/User/${updatedEmployee.id}`,
//           updatedEmployee
//         );

//         if (response.status === 200) {
//           const updatedList = [...employeeList];
//           updatedList[editIndex] = updatedEmployee;
//           setEmployeeList(updatedList);
//         }
//       } else {
//         // Add new employee
//         response = await axios.post(`${BASE_URL}/api/User`, employee);

//         if (response.status === 201) {
//           fetchEmployees(); // Re-fetch employee list after adding new employee
//         }
//       }

//       // Reset form after successful submit
//       setFormData({
//         username: "",
//         password: "",
//         confirmPassword: "",
//         role: "",
//         company: "",
//       });
//       setErrors({});
//       setIsEdit(false);
//       setEditIndex(null);
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   // Handle cancel action
//   const handleCancel = () => {
//     setFormData({
//       username: "",
//       password: "",
//       confirmPassword: "",
//       role: "",
//       company: "",
//     });
//     setErrors({});
//     setIsEdit(false);
//     setEditIndex(null);
//   };

//   // Handle editing an employee
//   const handleEdit = (index) => {
//     const employee = employeeList[index];

//     setFormData({
//       username: employee.email, // Populating the email field
//       password: employee.password, // Populating the password field
//       confirmPassword: employee.password, // Populating the confirmPassword field
//       role: employee.role, // Populating the role field
//       company: employee.companyname || "", // Make sure to handle company field, fallback to empty string if it's null
//     });

//     setIsEdit(true);
//     setEditIndex(index);
//   };

//   // Handle deleting an employee
//   const handleDelete = async (index) => {
//     try {
//       const employeeId = employeeList[index].id;
//       const response = await axios.delete(`${BASE_URL}/api/User/${employeeId}`);
//       if (response.status === 200) {
//         const updatedList = employeeList.filter((_, i) => i !== index);
//         setEmployeeList(updatedList);
//       }
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//     }
//   };

//   // Fetch employee data when the component mounts
//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   return (
//     <>
//       <section className="w-full h-full">
//         <div className="w-full h-24 overflow-y-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-cyan-700">
//           <Newheader />
//         </div>

//         <div className="flex w-full h-[calc(100vh-6rem)]">
//           <div className="bg-gray-100">
//             <MainSideBar />
//           </div>

//           <div className="flex-1 p-6 space-y-6 overflow-auto bg-gray-100">
//             <div className="bg-white p-6 flex flex-col items-center rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-700">
//                 {isEdit ? "Edit Employee" : "Add New Employee"}
//               </h3>
//               <div className="space-y-4 w-1/2">
//                 {["username", "password", "confirmPassword", "company"].map(
//                   (field) => (
//                     <div key={field}>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1">
//                         {field === "username"
//                           ? "Email"
//                           : field === "password"
//                           ? "Password"
//                           : field === "confirmPassword"
//                           ? "Confirm Password"
//                           : "Company Name"}
//                       </label>
//                       <input
//                         type={
//                           field === "password" || field === "confirmPassword"
//                             ? "password"
//                             : field === "username"
//                             ? "email"
//                             : "text"
//                         }
//                         name={field}
//                         value={formData[field]}
//                         onChange={handleChange}
//                         className={`w-full p-3 border-2 rounded-md ${
//                           errors[field] ? "border-red-500" : "border-gray-300"
//                         } focus:outline-none focus:ring-2 focus:ring-black`}
//                         placeholder={`Enter ${
//                           field === "username"
//                             ? "Email"
//                             : field === "password"
//                             ? "Password"
//                             : field === "confirmPassword"
//                             ? "Confirm Password"
//                             : "Company Name"
//                         }`}
//                       />
//                       {errors[field] && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors[field]}
//                         </p>
//                       )}
//                     </div>
//                   )
//                 )}

//                 <div className="w-full gap-2 flex flex-col">
//                   <label className="block text-sm font-semibold text-gray-700">
//                     Role
//                   </label>
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                     required
//                   >
//                     <option value="">Select Role</option>
//                     <option>Admin</option>
//                     <option>Scrutineer</option>
//                     <option>Racer</option>
//                     <option>Auditor</option>
//                   </select>
//                   {errors.role && (
//                     <p className="text-red-500 text-sm mt-1">{errors.role}</p>
//                   )}
//                 </div>

//                 <div className="flex w-1/2 gap-4 mt-4">
//                   <button
//                     onClick={handleCancel}
//                     className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSubmit}
//                     className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
//                   >
//                     {isEdit ? "Update" : "Submit"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white flex flex-col items-center p-6 w-full rounded-lg shadow-lg mt-6">
//               <h3 className="text-xl font-semibold text-cyan-700 mb-4">
//                 Employee List
//               </h3>
//               <table className="w-3/4 text-sm text-gray-700">
//                 <thead className="bg-gray-50 text-gray-600">
//                   <tr>
//                     <th className="px-4 py-2 text-left">Username</th>
//                     <th className="px-4 py-2 text-left">Company</th>
//                     <th className="px-4 py-2 text-left">Role</th>
//                     <th className="px-4 py-2">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-200">
//                   {employeeList.map((employee, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="px-4 py-2">{employee.email}</td>
//                       <td className="px-4 py-2">
//                         {employee.companyname || "N/A"}
//                       </td>{" "}
//                       {/* Ensure it handles null values */}
//                       <td className="px-4 py-2">{employee.role}</td>
//                       <td className="py-2 text-center">
//                         <div className="flex justify-center gap-2">
//                           <button
//                             onClick={() => handleEdit(index)}
//                             className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(index)} // Make sure handleDelete is implemented
//                             className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Emp_Login;

import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";

// User type mapping based on provided enums
const userTypeMapping = {
  100: "SuperAdmin",
  101: "Admin",
  102: "Manager",
  103: "UserDesk",
  104: "RegistrationDesk",
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
    } else if (formData.password && formData.password !== formData.confirmPassword) {
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
      emp: parseInt(formData.employeeId, 10),
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
        setErrors({ submit: "Error submitting data: " + error.response.data.title });
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
    console.log('index',index);
    
    const user = userList[index];
    setFormData({
      username: user.username || "",
      password: "", // Prompt user to enter the password again
      confirmPassword: "",
      role: user.usertype || 0,
      employeeId: user.emp.toString(), // Convert to string since this is the expected format for select inputs
      compid: user.compid || 1,
    });
    console.log("Editing user:", user);
    console.log("Form data set to:", {
      username: user.username,
      role: user.usertype,
      employeeId: user.emp.toString(),
      compid: user.compid
    });
    setIsEdit(true);
    setEditIndex(index);
  };

  // Handle delete action
  const handleDelete = async (index) => {
    const userId = userList[index].id; // Get the user ID to delete
    try {
      await axios.delete(`${BASE_URL}/api/UserInfo/${userId}`);
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchEmployees();
    fetchUsers(); // Fetch users from UserInfo API
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
            <div className="bg-white p-6 flex flex-col items-center rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-700">
                {isEdit ? "Edit Employee" : "Add New Employee"}
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
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)} // Call handleDelete on click
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