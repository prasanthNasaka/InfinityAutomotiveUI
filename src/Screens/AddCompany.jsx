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
  const [image, setImage] = useState(null);

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
      const formPayload = new FormData();
      formPayload.append("CompanyName", formData.name);
      formPayload.append("Abbr", formData.abbr);
      formPayload.append("Street", formData.address.street);
      formPayload.append("City", formData.address.city);
      formPayload.append("State", formData.address.state);
      formPayload.append("Zip", formData.address.zip);
      formPayload.append("Country", formData.address.country);
      formPayload.append("Website", formData.address.website);

      if (image) {
        formPayload.append("Companylogo", image);
      }

      const response = await AxiosInstance.put(
        `/api/companies/${formData.companyId}`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Update successful");
      fetchCompanies();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Error updating company");
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

    try {
      const formPayload = new FormData();
      formPayload.append("CompanyName", formData.name);
      formPayload.append("Abbr", formData.abbr);
      formPayload.append("Street", formData.address.street);
      formPayload.append("City", formData.address.city);
      formPayload.append("State", formData.address.state);
      formPayload.append("Zip", formData.address.zip);
      formPayload.append("Country", formData.address.country);
      formPayload.append("Website", formData.address.website);
      if (image) {
        formPayload.append("Companylogo", image);
      }

      formPayload.append("Employees.EmpName", formData.contact.contactPerson);
      formPayload.append("Employees.Email", formData.contact.email);
      formPayload.append("Employees.Phone", formData.contact.phone);
      formPayload.append("Employees.OtherInfo", "Admin user for the company");
      formPayload.append("Employees.EmployeeType", 1);
      formPayload.append("Employees.Status", 1);

      formPayload.append("UserInfo.Id", 0);
      formPayload.append("UserInfo.Username", formData.login.username);
      formPayload.append("UserInfo.Password", formData.login.password);
      formPayload.append("UserInfo.Usertype", 100);
      formPayload.append("UserInfo.Compid", 0);
      formPayload.append("UserInfo.EmpId", 0);
      formPayload.append("UserInfo.IsActive", true);

      const response = await AxiosInstance.post("/api/companies", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Company added successfully!");
      setCompanies((prevCompanies) => [...prevCompanies, response.data]);

      // Reset form
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
      setImage(null);
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
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
    toast.success(" Image uploaded successfully!");
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
        <div className="flex w-full p-8 h-auto flex-col gap-4 overflow-auto">
          <form
            className="w-full mx-auto p-3 rounded-md shadow h-fit "
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              Company Details
            </h2>

            <div className="flex flex-wrap md:flex-nowrap gap-6">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter company name"
                  required
                />

                <div className="mt-4">
                  <label className="text-sm font-bold mb-1 flex">
                    Abbreviation
                  </label>
                  <input
                    type="text"
                    name="abbr"
                    value={formData.abbr}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter Abbreviation"
                    maxLength={3}
                    required
                  />
                </div>

                {validationErrors.CompanyName && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.CompanyName[0]}
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2 flex flex-col  pb-2">
                <label className="block text-sm font-bold mb-1">
                  Upload Company Logo
                </label>
                <div className="flex items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    id="company-logo-upload"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="company-logo-upload"
                    className="flex flex-col items-center justify-center w-full h-full"
                  >
                    {image ? (
                      <img
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : image
                        }
                        alt="Company Logo Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="text-gray-500 text-sm">Click to upload</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              {/* First Row: Address & Contact Information */}
              <div className="flex gap-4">
                <div className="w-1/2 p-4 border rounded-md shadow">
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold capitalize mb-1">
                        Street
                      </label>
                      <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter street"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold capitalize mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold capitalize mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter state"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold capitalize mb-1">
                        Zip
                      </label>
                      <input
                        type="text"
                        name="address.zip"
                        value={formData.address.zip}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter zip"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold capitalize mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter country"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold capitalize mb-1">
                        Website
                      </label>
                      <input
                        type="text"
                        name="address.website"
                        value={formData.address.website}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter website"
                        required
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        className="px-6 py-3 bg-cyan-600 text-white rounded"
                        onClick={() => {
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
                          });
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

                <div className="w-1/2 p-4 border rounded-md shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-bold capitalize mb-1">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        name="contact.contactPerson"
                        value={formData.contact.contactPerson}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter Contact Person"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold capitalize mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="contact.phone"
                        value={formData.contact.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter Phone"
                        maxLength={10}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold capitalize mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="contact.email"
                        value={formData.contact.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/2 p-4 border rounded-md shadow">
                <h3 className="text-lg font-semibold mb-2">Login Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      type="text"
                      name="login.username"
                      value={formData.login.username}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="login.password"
                      value={formData.login.password}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-5">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-300 text-black rounded"
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
                  Save
                </button>
              </div>
            </div>
          </form>
          <div className="w-full p-4">
            <h3 className="text-2xl font-bold mb-4">Company List</h3>
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
                      <td className="border p-2 text-center">{company.city}</td>
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
    </section>
  );
};

export default AddCompany;
