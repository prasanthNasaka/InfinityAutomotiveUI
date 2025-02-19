// import { useState } from "react";
// import MainSideBar from "./MainSideBar";
// import Newheader from "./Newheader";

// const Emp_Login = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [employeeList, setEmployeeList] = useState([]);
//   const [isEdit, setIsEdit] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     let formErrors = {};

//     // Required fields check
//     if (!formData.username) formErrors.username = "Username is required";
//     if (!formData.password) formErrors.password = "Password is required";
//     if (!formData.confirmPassword)
//       formErrors.confirmPassword = "Confirm Password is required";

//     // Password matching validation
//     if (
//       formData.password &&
//       formData.confirmPassword &&
//       formData.password !== formData.confirmPassword
//     ) {
//       formErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0; // Return true if no errors
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return; // Only submit if validation is successful

//     const employee = {
//       username: formData.username,
//       password: formData.password,
//     };

//     if (isEdit) {
//       const updatedList = [...employeeList];
//       updatedList[editIndex] = employee;
//       setEmployeeList(updatedList);
//       setIsEdit(false);
//       setEditIndex(null);
//     } else {
//       setEmployeeList([...employeeList, employee]);
//     }

//     setFormData({ username: "", password: "", confirmPassword: "" }); // Reset form after submit
//     setErrors({}); // Clear errors after submit
//   };

//   const handleCancel = () => {
//     setFormData({ username: "", password: "", confirmPassword: "" });
//     setErrors({}); // Reset errors when canceling
//     setIsEdit(false);
//     setEditIndex(null);
//   };

//   const handleEdit = (index) => {
//     setFormData({
//       username: employeeList[index].username,
//       password: employeeList[index].password,
//       confirmPassword: employeeList[index].password,
//     });
//     setIsEdit(true);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const updatedList = employeeList.filter((_, i) => i !== index);
//     setEmployeeList(updatedList);
//   };

//   return (
//     <>
//       <section className="w-full h-full">
//         <div className="w-full h-24 overflow-y-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-cyan-700">
//           <Newheader />
//         </div>

//         <div className="flex w-full h-[calc(100vh-6rem)]">
//           {/* Sidebar */}
//           <div className="bg-gray-100">
//             <MainSideBar />
//           </div>

//           {/* Form Area */}
//           <div className="flex-1 p-6 space-y-6 overflow-auto bg-gray-100">
//             {/* Login Form Section */}
//             <div className="bg-white p-6 flex flex-col items-center rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-700">
//                 Login
//               </h3>
//               <div className="space-y-4 w-1/2 ">
//                 {["username", "password", "confirmPassword"].map((field) => (
//                   <div key={field}>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">
//                       {field === "username"
//                         ? "Username"
//                         : field === "password"
//                         ? "Password"
//                         : "Confirm Password"}
//                     </label>
//                     <input
//                       type={
//                         field === "password" || field === "confirmPassword"
//                           ? "password"
//                           : "text"
//                       }
//                       name={field}
//                       value={formData[field]}
//                       onChange={handleChange}
//                       className={`w-full p-3 border-2 rounded-md ${
//                         errors[field] ? "border-red-500" : "border-gray-300"
//                       } focus:outline-none focus:ring-2 focus:ring-black`}
//                       placeholder={`Enter ${
//                         field === "username"
//                           ? "Username"
//                           : field === "password"
//                           ? "Password"
//                           : "Confirm Password"
//                       }`}
//                     />
//                     {errors[field] && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors[field]}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <div className="w-1/2 gap-2 flex flex-col">
//                   <label className="block text-sm font-bold text-gray-700">
//                     Role
//                   </label>
//                   <select
//                     // value={eventData.eventType}
//                     // onChange={(e) => handleInputChange(e, "eventType")}
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
//                     required
//                   >
//                     <option value="">Select Role</option>
//                     <option>Admin</option>
//                     <option>Scrutineer</option>
//                     <option>Racer</option>
//                     <option>Audions</option>
//                   </select>
//                 </div>
//               <div className="flex w-1/2 gap-4 mt-4">
//                 <button
//                   onClick={handleCancel}
//                   className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className="w-1/2 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition duration-300"
//                 >
//                   {isEdit ? "Update" : "Submit"}
//                 </button>
//               </div>
//             </div>

//             {/* Employee Table Section */}
//             <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
//               <h3 className="text-xl font-semibold text-cyan-700 mb-4">
//                 Employee List
//               </h3>
//               <table className="w-full text-sm text-gray-700">
//                 <thead className="bg-gray-50 text-gray-600">
//                   <tr>
//                     <th className="px-4 py-2 text-left">Username</th>
//                     <th className="px-4 py-2 text-left">Password</th>
//                     <th className="px-4 py-2 text-left">Actions</th>{" "}
//                     {/* Common heading */}
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-200">
//                   {employeeList.map((employee, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="px-4 py-2">{employee.username}</td>
//                       <td className="px-4 py-2">{employee.password}</td>
//                       <td className="px-4 py-2 text-center">
//                         {" "}
//                         {/* Buttons under "Actions" heading */}
//                         <div className="flex justify-center space-x-4">
//                           <button
//                             onClick={() => handleEdit(index)}
//                             className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(index)}
//                             className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
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

import { useState } from "react";
import MainSideBar from "./MainSideBar";
import Newheader from "./Newheader";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const Emp_Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "", // Added role to form data
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

    // Required fields check
    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.confirmPassword)
      formErrors.confirmPassword = "Confirm Password is required";
    if (!formData.role) formErrors.role = "Role is required"; // Added role validation

    // Password matching validation
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    if (!validateForm()) return; // Only submit if validation is successful

    const employee = {
      username: formData.username,
      password: formData.password,
      role: formData.role, // Add role to employee object
    };

    if (isEdit) {
      const updatedList = [...employeeList];
      updatedList[editIndex] = employee;
      setEmployeeList(updatedList);
      setIsEdit(false);
      setEditIndex(null);
    } else {
      setEmployeeList([...employeeList, employee]);
    }

    setFormData({ username: "", password: "", confirmPassword: "", role: "" }); // Reset form after submit
    setErrors({}); // Clear errors after submit
  };

  const handleCancel = () => {
    setFormData({ username: "", password: "", confirmPassword: "", role: "" });
    setErrors({}); // Reset errors when canceling
    setIsEdit(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData({
      username: employeeList[index].username,
      password: employeeList[index].password,
      confirmPassword: employeeList[index].password,
      role: employeeList[index].role, // Add role for edit
    });
    setIsEdit(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = employeeList.filter((_, i) => i !== index);
    setEmployeeList(updatedList);
  };

  return (
    <>
      <section className="w-full h-full">
        <div className="w-full h-24 overflow-y-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-cyan-700">
          <Newheader />
        </div>

        <div className="flex w-full h-[calc(100vh-6rem)]">
          {/* Sidebar */}
          <div className="bg-gray-100">
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
                {["username", "password", "confirmPassword"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {field === "username"
                        ? "Username"
                        : field === "password"
                        ? "Password"
                        : "Confirm Password"}
                    </label>
                    <input
                      type={
                        field === "password" || field === "confirmPassword"
                          ? "password"
                          : "text"
                      }
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full p-3 border-2 rounded-md ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-black`}
                      placeholder={`Enter ${
                        field === "username"
                          ? "Username"
                          : field === "password"
                          ? "Password"
                          : "Confirm Password"
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
              <table className="w-3/4  text-sm text-gray-700">
                <thead className="bg-gray-50  text-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-left">Username</th>
                    <th className="px-4 py-2 text-left">Role</th>{" "}
                    {/* Replaced password with role */}
                    <th className="px-4 py-2  ">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y  divide-gray-200">
                  {employeeList.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{employee.username}</td>
                      <td className="px-4 py-2">{employee.role}</td>{" "}
                      {/* Display role */}
                      <td className=" py-2 text-center">
                        {/* Flex container to center the buttons in the column */}
                        <div className="flex justify-center  gap-2">
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

export default Emp_Login;
