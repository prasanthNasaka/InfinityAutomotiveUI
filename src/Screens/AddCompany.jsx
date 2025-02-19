/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import Loader from "../Components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      website: "",
    },
    contact: { phone: "", email: "", contactPerson: "" },
    login: { username: "", password: "" },
  });

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [companies, setCompanies] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prevData) => {
      let updatedData = { ...prevData };
      let target = updatedData;

      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;

      return { ...updatedData };
    });

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors({});
    setSuccess(false);

    const formattedData = {
      CompanyName: formData.name,
      Street: formData.address.street,
      City: formData.address.city,
      State: formData.address.state,
      Zip: formData.address.zip,
      Country: formData.address.country,
      Website: formData.address.website,
      Employees: {
        EmpName: formData.contact.contactPerson,
        Email: formData.contact.email,
        Phone: formData.contact.phone,
      },

      userInfo: {
        Username: formData.login.username,
        Password: formData.login.password,
        usertype: 1,
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/companies`,
        formattedData
      );
      console.log("Added Company:", response.data);
      toast.success("Added Company:", response.data);
      setCompanies((prevCompanies) => [...prevCompanies, response.data]);

      setSuccess(true);
      setFormData({
        name: "",
        address: {
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          website: "",
        },
        contact: { phone: "", email: "", contactPerson: "" },
        login: { username: "", password: "" },
      });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/companies`);

        if (
          response.data &&
          response.data.$values &&
          Array.isArray(response.data.$values)
        ) {
          setCompanies(response.data.$values);
        } else {
          setCompanies([]);
          console.error("Unexpected response format:", response.data);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Failed to fetch companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);
  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="h-24 w-full shadow-md p-1">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>
        <div className="flex w-full p-8 h-auto flex-col  overflow-auto">
          <form
            className="w-full mx-auto p-3 rounded-md shadow-lg h-fit "
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              Company Details
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
                placeholder="Enter company name"
                required
              />
              {validationErrors.CompanyName && (
                <p className="text-red-500 text-sm">
                  {validationErrors.CompanyName[0]}
                </p>
              )}
            </div>

            <div className="flex space-x-4">
              <div className="flex-1 p-4 border rounded-md shadow">
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["street", "city", "state", "zip", "country", "website"].map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-sm font-bold capitalize mb-1">
                          {field}
                        </label>
                        <input
                          type="text"
                          name={`address.${field}`}
                          value={formData.address[field]}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                          placeholder={`Enter ${field}`}
                          required
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex-1 p-4 border rounded-md shadow">
                <h3 className="text-lg font-semibold mb-2">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {["contactPerson", "phone", "email"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-bold capitalize mb-1">
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
                        name={`contact.${field}`}
                        value={formData.contact[field]}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder={`Enter ${field}`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 border rounded-md shadow w-1/2">
              <h3 className="text-lg font-semibold mb-2">Login Details</h3>
              <div className="grid grid-cols-1 gap-4">
                {["username", "password"].map((field) => (
                  <div key={field}>
                    <input
                      type={field.includes("password") ? "password" : "text"}
                      name={`login.${field}`}
                      value={formData.login[field]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder={`Enter ${field}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-5">
              <button
                type="button"
                className="px-6 py-3 bg-gray-300 text-black rounded"
                onClick={() =>
                  setFormData({
                    name: "",
                    address: {
                      street: "",
                      city: "",
                      state: "",
                      zip: "",
                      country: "",
                      website: "",
                    },
                    contact: { phone: "", email: "", contactPerson: "" },
                    login: { username: "", password: "" },
                  })
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-cyan-600 text-white rounded"
              >
                save
              </button>
            </div>
          </form>
          <div className="flex w-full p-8 h-auto">
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-4">Company List</h3>

              {loading && (
                <p>
                  <Loader />
                </p>
              )}
              {error && <p className="text-red-500">{error}</p>}

              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Company Name</th>
                    <th className="border p-2">Contact Person</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Phone</th>
                    <th className="border p-2">City</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length > 0 ? (
                    companies.map((company, index) => (
                      <tr key={index}>
                        <td className="border p-2 text-center">
                          {company.companyName}
                        </td>
                        <td className="border p-2 text-center">
                          {company.employees?.$values?.length > 0
                            ? company.employees.$values[0].empName
                            : "N/A"}
                        </td>
                        <td className="border p-2 text-center">
                          {company.employees?.$values?.length > 0
                            ? company.employees.$values[0].email
                            : "N/A"}
                        </td>
                        <td className="border p-2 text-center">
                          {company.employees?.$values?.length > 0
                            ? company.employees.$values[0].phone
                            : "N/A"}
                        </td>
                        <td className="border p-2 text-center">
                          {company.city}, {company.country}
                        </td>
                        <td className="border p-2 text-center">
                          {company.status || "Active"}
                        </td>
                        <td className="border p-2 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              type="button"
                              className="p-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                            >
                              <CiEdit className="w-6 h-6" />
                            </button>
                            <button
                              type="button"
                              className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
                            >
                              <MdOutlineDelete className="w-6 h-6" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center p-2">
                        No companies to display
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
