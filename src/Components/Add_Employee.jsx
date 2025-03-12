// import { useState, useEffect } from "react";
// import MainSideBar from "./MainSideBar";
// import Newheader from "./Newheader";
// import axios from "axios";
// import { BASE_URL } from "../constants/global-const";
// import { CiEdit } from "react-icons/ci";
// import { MdOutlineDelete } from "react-icons/md";
// import toast, { Toaster } from "react-hot-toast"; // Importing toast
// import AxiosInstance from "./AxiosInstance";

// const EmployeeTypes = {
//   OTHERS: 0,
//   EMPLOYEE: 86,
//   ORGANISER: 87,
//   SCRUTINEER: 88,
// };

// const Add_Employee = () => {
//   const [formData, setFormData] = useState({
//     empId: null,
//     empName: "",
//     phone: "",
//     email: "",
//     role: EmployeeTypes.OTHERS,
//     otherInfo: "",
//   });

//   const [employeeList, setEmployeeList] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: null });
//     }
//   };

//   // Validate Form
//   const validateForm = () => {
//     let formErrors = {};
//     if (!formData.empName.trim()) formErrors.empName = "Employee Name is required";
//     if (!formData.phone.trim()) formErrors.phone = "Phone number is required";
//     if (!formData.email.trim()) formErrors.email = "Email is required";
//     if (!formData.otherInfo.trim()) formErrors.otherInfo = "Other info is required";
//     if (formData.role === EmployeeTypes.OTHERS) formErrors.role = "Please select a role";

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (formData.email && !emailRegex.test(formData.email)) {
//       formErrors.email = "Invalid email format";
//     }

//     const phoneRegex = /^[0-9]{10}$/;
//     if (formData.phone && !phoneRegex.test(formData.phone)) {
//       formErrors.phone = "Phone number must be 10 digits";
//     }

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   // Add Employee
//   const handleAddEmployee = async () => {
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const payload = {
//         empName: formData.empName.trim(),
//         email: formData.email.trim(),
//         phone: formData.phone.trim(),
//         otherInfo: formData.otherInfo.trim(),
//         employeeType: formData.role,
//         status: 0, // Updated to match API
//         comId: 0, // Updated to match API
//       };

//       const response = await AxiosInstance.post(`api/Employee`, payload);
//       if (response.status === 201) {
//         const newEmployee = response.data;
//         setEmployeeList((prev) => [...prev, newEmployee]);
//         resetForm();
//         toast.success("Employee added successfully!"); // Success toast
//       }
//     } catch (error) {
//       console.error("Error adding employee:", error);
//       toast.error(error.response?.data?.message || "Failed to add employee"); // Error toast
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit Employee
//   const handleEdit = (employee) => {
//     setFormData({
//       empId: employee.empId,
//       empName: employee.empName || "",
//       phone: employee.phone || "",
//       email: employee.email || "",
//       role: employee.employeeType || EmployeeTypes.OTHERS,
//       otherInfo: employee.otherInfo || "",
//     });
//   };

//   // Update Employee
//   const handleUpdateEmployee = async () => {
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const payload = {
//         empName: formData.empName.trim(),
//         email: formData.email.trim(),
//         phone: formData.phone.trim(),
//         otherInfo: formData.otherInfo.trim(),
//         employeeType: formData.role,
//         status: 0, // Updated to match API
//         comId: 0, // Updated to match API
//       };

//       const response = await axios.put(`
//         ${BASE_URL}/api/Employee/${formData.empId}`,
//         payload
//       );

//       if (response.status === 200) {
//         const updatedEmployeeList = employeeList.map((emp) =>
//           emp.empId === response.data.empId ? response.data : emp
//         );
//         setEmployeeList(updatedEmployeeList);
//         resetForm();
//         toast.success("Employee updated successfully!"); // Success toast
//       }
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       toast.error(error.response?.data?.message || "Failed to update employee"); // Error toast
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Employee
//   const handleDeleteEmployee = async (id) => {
//     try {
//       setLoading(true);
//       await axios.delete(`${BASE_URL}/api/Employee/${id}`);
//       setEmployeeList(employeeList.filter((employee) => employee.empId !== id));
//       toast.success("Employee deleted successfully!"); // Success toast
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//       toast.error("Failed to delete employee"); // Error toast
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       empId: null,
//       empName: "",
//       phone: "",
//       email: "",
//       role: EmployeeTypes.OTHERS,
//       otherInfo: "",
//     });
//     setErrors({});
//   };

//   // Fetch Employees
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         setLoading(true);
//         const response = await AxiosInstance.get(`${BASE_URL}/api/Employee`);
//         setEmployeeList(response.data);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//         setEmployeeList([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return (
//     <section className="w-full h-screen flex flex-col">
//       <div className="overflow-y-hidden shadow-lg ">
//         <Newheader />
//       </div>

//       <div className="flex h-[calc(100vh-1rem)] overflow-hidden">

//         <div className=" h-full">
//         <MainSideBar />
//         </div>

//         <div className="flex-1 p-6 space-y-6 overflow-auto bg-gray-100">
//         <Toaster position="bottom-center" reverseOrder={false} />
//           <div className="bg-white p-6 flex flex-col rounded-lg shadow-lg">
//             <h3 className="text-2xl font-semibold mb-4 text-cyan-700">
//               {formData.empId ? "Edit Employee" : "Organizing Committee Member"}
//             </h3>
//             <div className="space-y-4 w-1/2">
//               {["empName", "phone", "email"].map((field) => (
//                 <div key={field}>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>

//                   <input
//                     type={field === "email" ? "email" : "text"}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     maxLength={field === "phone" ? 10 : undefined}

//                     className={`w-full p-3 border-2 rounded-md ${
//                       errors[field] ? "border-red-500" : "border-gray-300"
//                     } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
//                     placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
//                   />

//                   {errors[field] && (
//                     <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
//                   )}
//                 </div>
//               ))}

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Type
//                 </label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400`}
//                 >
//                   <option value={EmployeeTypes.OTHERS}>Select Type</option>
//                   <option value={EmployeeTypes.EMPLOYEE}>Employee</option>
//                   <option value={EmployeeTypes.ORGANISER}>Organiser</option>
//                   <option value={EmployeeTypes.SCRUTINEER}>Scrutineer</option>
//                 </select>
//                 {errors.role && (
//                   <p className="text-red-500 text-sm mt-1">{errors.role}</p>
//                 )}
//               </div>

//               {/* Other Info Field */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Other Info
//                 </label>
//                 <input
//                   type="text"
//                   name="otherInfo"
//                   value={formData.otherInfo}
//                   onChange={handleChange}
//                   className={`w-full p-3 border-2 rounded-md ${
//                     errors.otherInfo ? "border-red-500" : "border-gray-300"
//                   } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
//                   placeholder="Enter Other Info"
//                 />
//                 {errors.otherInfo && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.otherInfo}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex w-1/2 gap-4 mt-4">
//               <button
//                 onClick={resetForm}
//                 className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={formData.empId ? handleUpdateEmployee : handleAddEmployee}
//                 className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Processing..."
//                   : formData.empId
//                   ? "Update"
//                   : "Submit"}
//               </button>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
//             <h3 className="text-xl font-semibold text-cyan-700 mb-4">
//               Employee List
//             </h3>
//             {employeeList.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-gray-700 border-collapse">
//                   <thead className="bg-gray-50 text-gray-600">
//                     <tr>
//                       <th className="py-3 px-4 text-left">Name</th>
//                       <th className="py-3 px-4 text-left">Phone</th>
//                       <th className="py-3 px-4 text-left">Email</th>
//                       <th className="py-3 px-4 text-left">Employee Type</th>
//                       <th className="py-3 px-4 text-left">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {employeeList.map((emp) => (
//                       <tr key={emp.empId} className="border-t hover:bg-gray-50">
//                         <td className="py-3 px-4">{emp.empName}</td>
//                         <td className="py-3 px-4">{emp.phone}</td>
//                         <td className="py-3 px-4">{emp.email}</td>
//                         <td className="py-3 px-4 text-center">
//                           {emp.employeeType === EmployeeTypes.EMPLOYEE
//                             ? "Employee"
//                             : emp.employeeType === EmployeeTypes.ORGANISER
//                             ? "Organiser"
//                             : emp.employeeType === EmployeeTypes.SCRUTINEER
//                             ? "Scrutineer"
//                             : "Others"}
//                         </td>
//                         <td className="py-3 px-4">
//                           <button
//                             onClick={() => handleEdit(emp)}
//                             className="p-2 mr-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
//                           >
//                             <CiEdit className="size-6" />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteEmployee(emp.empId)}
//                             className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
//                           >
//                             <MdOutlineDelete className="size-6" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-4">
//                 {loading ? "Loading employees..." : "No employees found."}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Add_Employee;

import { useState, useEffect } from "react";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import { BASE_URL } from "../constants/global-const";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast"; // Importing toast
import Styles from "../constants/Styles";
import AxiosInstance from "./AxiosInstance";

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

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Validate Form
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

  // Add Employee
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
        comId: 0,
      };

      const response = await AxiosInstance.post(`api/Employee`, payload);
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

  // Edit Employee
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

  // Update Employee
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
        comId: 0,
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

  // Delete Employee
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

  // Reset form
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

  // Fetch Employees
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
    <section className="w-full h-screen flex flex-col">
      <div className=" overflow-y-hidden shadow-lg ">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-1rem)] overflow-hidden">
        <div className=" h-full">
          <MainSideBar />
        </div>
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
          <div className="bg-white   mb-6">
          <Toaster position="bottom-center" reverseOrder={false} />
              <div className="bg-white p-2 flex flex-col ">
              <div className="p-2 flex">
              <h3
                  style={Styles.heading}
                  className="text-2xl font-semibold mb-4 text-cyan-700"
                >
                  {formData.empId
                    ? "Edit Employee"
                    : "Organizing Committee Member"}
                </h3>
              </div>

                
                <div className="w-full  h-full border-1 shadow-md p-2 border mb-4 rounded-lg">
                <div className="flex flex-wrap gap-4 w-full  p-4">
                  {["employee Name", "phone", "email"].map((field) => (
                    <div key={field} className="w-1/3">
                      <label
                        style={Styles.label}
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        style={Styles.select}
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        maxLength={field === "phone" ? 10 : undefined}
                        className={`w-full p-3 border-2 rounded-md ${
                          errors[field] ? "border-red-500" : "border-gray-300"
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

                  <div className="w-1/3">
                    <label
                      style={Styles.label}
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Type
                    </label>
                    <select
                      style={Styles.select}
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none "
                    >
                      <option value={EmployeeTypes.OTHERS}>Select Type</option>
                      <option value={EmployeeTypes.EMPLOYEE}>Employee</option>
                      <option value={EmployeeTypes.ORGANISER}>Organiser</option>
                      <option value={EmployeeTypes.SCRUTINEER}>
                        Scrutineer
                      </option>
                    </select>
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                    )}
                  </div>

                  <div className="w-1/3">
                    <label
                      style={Styles.label}
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Other Info
                    </label>
                    <input
                      style={Styles.select}
                      type="text"
                      name="otherInfo"
                      value={formData.otherInfo}
                      onChange={handleChange}
                      className={`w-full p-3 border-2 rounded-md ${
                        errors.otherInfo ? "border-red-500" : "border-gray-300"
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

                <div className="flex w-1/2 gap-4 mt-4">
                  <button
                    onClick={resetForm}
                    className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={
                      formData.empId ? handleUpdateEmployee : handleAddEmployee
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
            <div className="w-full  p-3 space-y-6 overflow-auto ">
             

              <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h3 style={Styles.tableheading} className="text-xl font-semibold text-cyan-700 mb-4">
                  Employee List
                </h3>
                {employeeList.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-700 border-collapse">
                      <thead className="bg-gray-50 text-gray-600">
                        <tr style={Styles.label}>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Phone</th>
                          <th className="py-3 px-4 text-left">Email</th>
                          <th className="py-3 px-4 text-left">Employee Type</th>
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeList.map((emp) => (
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
                                : emp.employeeType === EmployeeTypes.SCRUTINEER
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
                                onClick={() => handleDeleteEmployee(emp.empId)}
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
        </div>
      </div>
    </section>
  );
};

export default Add_Employee;
