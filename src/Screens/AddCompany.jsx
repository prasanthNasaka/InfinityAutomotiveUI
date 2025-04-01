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
import AxiosInstance from "../Components/AxiosInstance";
import Styles from "../constants/Styles";

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    abbr: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      website: "",
    },
    companyId: null,

    contact: { phone: "", email: "", contactPerson: "" },
    login: { username: "", password: "" },
  });

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (company) => {
    setFormData({
      name: company.companyName || "",
      abbr: company.abbr || "",

      address: {
        street: company.street || "",
        city: company.city || "",
        state: company.state || "",
        zip: company.zip || "",
        country: company.country || "",
        website: company.website || "",
      },
      companyId: company.companyId || null,

      contact: {
        phone: "",
        email: "",
        contactPerson: "",
      },
      login: {
        username: "",
        password: "",
      },
    });
    setIsEditing(true);
  };

  const updateCompany = async () => {
    try {
      const response = await AxiosInstance.put(
        `/api/companies/${formData.companyId}`,
        {
          companyName: formData.name,
          Abbr: formData.abbr,
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zip: formData.address.zip,
          country: formData.address.country,
          website: formData.address.website,
          contact: {},
          login: {},
        }
      );

      toast.success("Update successful:", response.data);
    } catch (error) {
      toast.error("Error updating company:", error);
    }
  };

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors({});
    setSuccess(false);

    const formattedData = {
      companyName: formData.name,
      abbr: formData.abbr,
      street: formData.address.street,
      city: formData.address.city,
      state: formData.address.state,
      zip: formData.address.zip,
      country: formData.address.country,
      website: formData.address.website,
      employees: {
        empName: formData.contact.contactPerson,
        email: formData.contact.email,
        comId: 0,
        phone: formData.contact.phone,
        otherInfo: "Admin user for the company",
        employeeType: 1,
        status: 1,
      },
      userInfo: {
        id: 0,
        username: formData.login.username,
        password: formData.login.password,
        usertype: 100,
        compid: 0,
        empId: 0,
        isActive: true,
      },
    };

    try {
      const response = await AxiosInstance.post(
        "/api/companies",
        formattedData
      );

      toast.success("Company added successfully!");

      setCompanies((prevCompanies) => [...prevCompanies, response.data]);

      setFormData({
        name: "",
        abbr: "",
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

      setSuccess(true);
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

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("/api/companies");

      if (response.data && Array.isArray(response.data)) {
        setCompanies(response.data);
      } else if (
        response.data?.$values &&
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

  const handleDelete = async (companyId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/companies/${companyId}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <section className="w-full h-screen flex flex-col">
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className=" overflow-y-hidden shadow-lg ">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-1rem)] overflow-hidden">
        <div className=" h-full">
          <MainSideBar />
        </div>
        <div className="flex-1 p-2  overflow-y-auto">
          <div className=" max-w-10xl mx-auto">
            <form className="bg-white mb-6  " onSubmit={handleSubmit}>
              <div className="p-2 ml-2 flex ">
                <h2
                  style={Styles.heading}
                  className="text-3xl font-bold  text-center"
                >
                  Company Details
                </h2>
              </div>

              <div className="mt-4">
                <div className="w-full  h-full border-1  p-2 border mb-4 rounded-lg">
                  <div className="w-full h-auto gap-3 flex items-center p-1">
                    <div className="w-1/2 h-auto flex flex-col gap-2 ">
                      <div className="w-full h-auto">
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold mb-1"
                        >
                          Company Name
                        </label>
                        <input
                          style={Styles.input}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-1/2 p-2 border rounded"
                          placeholder="Enter company name"
                          required
                        />
                      </div>
                      <div className="w-full h-auto">
                        <label
                          style={Styles.label}
                          className=" text-sm font-bold mb-1 flex"
                        >
                          Abbrivation
                        </label>

                        <input
                          style={Styles.input}
                          type="text"
                          name="abbr"
                          value={formData.abbr}
                          onChange={handleChange}
                          className="w-1/2 p-2 border rounded"
                          placeholder="Enter Abbr name"
                          maxLength={3}
                          required
                        />
                        {validationErrors.CompanyName && (
                          <p className="text-red-500 text-sm">
                            {validationErrors.CompanyName[0]}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-1/2 h-auto flex flex-col gap-4 ">
                      <div className=" w-full">
                        <div className="grid grid-cols-1 gap-2">
                          {["username", "password"].map((field) => (
                            <div key={field}>
                              <label
                                style={Styles.label}
                                className="block text-sm font-bold capitalize mb-1"
                              >
                                Enter {field}
                              </label>
                              <input
                                style={Styles.input}
                                type={
                                  field.includes("password")
                                    ? "password"
                                    : "text"
                                }
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
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-4">
                    <div className="flex-1 p-4 border rounded-md ">
                      <h3
                        style={Styles.tableheading}
                        className="text-lg font-semibold mb-2"
                      >
                        Address
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "street",
                          "city",
                          "state",
                          "zip",
                          "country",
                          "website",
                        ].map((field) => (
                          <div key={field}>
                            <label
                              style={Styles.label}
                              className="block text-sm font-bold capitalize mb-1"
                            >
                              {field}
                            </label>
                            <input
                              style={Styles.input}
                              type="text"
                              name={`address.${field}`}
                              value={formData.address[field]}
                              onChange={handleChange}
                              className="w-full p-2 border rounded"
                              placeholder={`Enter ${field}`}
                              required
                            />
                          </div>
                        ))}
                      </div>

                      {isEditing && (
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            className="px-6 py-3 bg-cyan-600 text-white rounded"
                            onClick={() => {
                              const companyId = formData.companyId;
                              updateCompany(companyId);
                              setIsEditing(false);
                            }}
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-4 border rounded-md ">
                      <h3
                        style={Styles.tableheading}
                        className="text-lg font-semibold mb-2"
                      >
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {["contactPerson", "phone", "email"].map((field) => (
                          <div key={field}>
                            <label
                              style={Styles.label}
                              className="block text-sm font-bold capitalize mb-1"
                            >
                              {field === "contactPerson"
                                ? "Contact Person"
                                : field}
                            </label>
                            <input
                              style={Styles.input}
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
                              maxLength={field === "phone" ? 10 : undefined}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-auto flex justify-end items-center">
                    <div className="w-1/2 justify-end  mt-3 flex gap-4">
                      <button
                        type="button"
                        className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-300"
                        onClick={() =>
                          setFormData({
                            name: "",
                            abbr: "",
                            address: {
                              street: "",
                              city: "",
                              state: "",
                              zip: "",
                              country: "",
                              website: "",
                            },
                            contact: {
                              phone: "",
                              email: "",
                              contactPerson: "",
                            },
                            login: { username: "", password: "" },
                          })
                        }
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
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
                      <th className="border p-2">State</th>
                      <th className="border p-2">Street</th>
                      <th className="border p-2">Website</th>
                      <th className="border p-2">City</th>
                      <th className="border p-2">Country</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.length > 0 ? (
                      companies.map((company) => (
                        <tr key={company.companyId}>
                          <td className="border p-2 text-center">
                            {company.companyName}
                          </td>
                          <td className="border p-2 text-center">
                            {company.state}
                          </td>
                          <td className="border p-2 text-center">
                            {company.street}
                          </td>
                          <td className="border p-2 text-center">
                            {company.website}
                          </td>
                          <td className="border p-2 text-center">
                            {company.city}
                          </td>
                          <td className="border p-2 text-center">
                            {company.country}
                          </td>
                          <td className="border p-2 text-center">
                            {company.status || "Active"}
                          </td>
                          <td className="border p-2 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                type="button"
                                className="p-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                                onClick={() => handleEdit(company)}
                              >
                                <CiEdit className="w-6 h-6" />
                              </button>
                              <button
                                type="button"
                                className="p-2 bg-gray-50 border hover:bg-red-300 text-black rounded-lg transition-colors"
                                onClick={() => handleDelete(company.companyId)}
                              >
                                <MdOutlineDelete className="w-6 h-6" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center p-2">
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
    </section>
  );
};

export default AddCompany;
