/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../constants/global-const";
import Loader from "../Components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import AxiosInstance from "../Components/AxiosInstance";
import Styles from "../constants/Styles";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 5, label: "5 per page" },
    { value: 10, label: "10 per page" },
    { value: 15, label: "15 per page" },
    { value: 20, label: "20 per page" },
  ];

  const handleOptionClick = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  const filteredData = companies.filter((company) =>
    Object.values(company).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.direction === "none") return 0;

    const key = sortConfig.key;
    if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // eslint-disable-next-line react/prop-types
  const SortingIcon = ({ direction }) => {
    if (direction === "none") {
      return <FaSort className="w-4 h-4 ms-1" />;
    } else if (direction === "asc") {
      return <FaSortUp className="w-4 h-4 ms-1" />;
    } else if (direction === "desc") {
      return <FaSortDown className="w-4 h-4 ms-1" />;
    }
  };

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = "none";
    }
    setSortConfig({ key, direction });
  };

  const getPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 2;

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages = [1];

      let start = Math.max(2, currentPage - maxVisiblePages);
      let end = Math.min(totalPages - 1, currentPage + maxVisiblePages);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handleEdit = (company) => {
    const logoUrl = company.comlogo ? `${IMAGE_URL}/${company.comlogo}` : "";

    setFormData({
      name: company.companyName || "",
      abbr: company.abbr || "",
      logo: logoUrl, // save the full URL
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

    setImage(logoUrl);
    setIsEditing(true);
  };

  const updateCompany = async () => {
    try {
      const payload = {
        companyName: formData.name,
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        zip: formData.address.zip,
        country: formData.address.country,
        website: formData.address.website,
        abbr: formData.abbr,
        companylogo: formData.logo || "",
      };

      const response = await AxiosInstance.put(
        `/api/companies/${formData.companyId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Update successful");
      fetchCompanies();
      setImage(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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
            <div className="p-2 ml-2 flex ">
              <h2
                style={Styles.hedaing}
                className="text-3xl font-bold  text-center"
              >
                Company Details
              </h2>
            </div>
            <form
              className="bg-white mb-6 border rounded-lg p-2"
              onSubmit={handleSubmit}
            >
              <div className="flex   gap-4">
                <div className="w-3/4 h-auto p-2 gap-4 flex items-center ">
                  <div className="w-1/2 h-auto gap-8 flex flex-col p-1">
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
                        className="w-full p-2 border rounded"
                        placeholder="Enter company name"
                        required
                      />
                    </div>

                    <div className="w-full ">
                      <label
                        style={Styles.label}
                        className="text-sm font-bold mb-1 flex"
                      >
                        Abbreviation
                      </label>
                      <input
                        style={Styles.input}
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

                  <div className="w-1/2 h-auto gap-8 flex flex-col p-1">
                    <div className="w-full h-auto ">
                      <h3 className="text-lg font-semibold mb-2">
                        Login Details
                      </h3>
                      <div className="grid grid-cols-1 gap-8">
                        <div>
                          <label style={Styles.label} htmlFor="Username">
                            UserName
                          </label>
                          <input
                            style={Styles.input}
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
                          <label style={Styles.label} htmlFor="Password">
                            Password
                          </label>
                          <input
                            style={Styles.input}
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
                  </div>
                </div>
                <div className="w-1/4  flex flex-col  p-1">
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
                          className="w-full h-full object-fill"
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
                          <p className="text-gray-500 text-sm">
                            Click to upload
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                {/* First Row: Address & Contact Information */}
                <div className="flex ">
                  <div className="w-1/2 p-4  rounded-md ">
                    <h3 className="text-lg font-semibold mb-2">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold capitalize mb-1"
                        >
                          Contact Person
                        </label>
                        <input
                          style={Styles.input}
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
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold capitalize mb-1"
                        >
                          Phone
                        </label>
                        <PhoneInput
                          country="in"
                          value={formData.contact.phone}
                          onChange={(phone) =>
                            handleChange({
                              target: { name: "contact.phone", value: phone },
                            })
                          }
                          placeholder="          Enter Phone"
                          inputStyle={{
                            ...Styles.input,
                            width: "100%",
                            padding: "8px",
                            borderRadius: "0.375rem",
                            border: "1px solid #D1D5DB",
                          }}
                          inputProps={{
                            name: "contact.phone",
                            required: true,
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold capitalize mb-1"
                        >
                          Email
                        </label>
                        <input
                          style={Styles.input}
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

                  <div className="w-1/2 p-4  rounded-md ">
                    <h3 className="text-lg font-semibold mb-2">Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold capitalize mb-1"
                        >
                          Street
                        </label>
                        <input
                          style={Styles.input}
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
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold capitalize mb-1"
                        >
                          City
                        </label>
                        <input
                          style={Styles.input}
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
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold capitalize mb-1"
                        >
                          State
                        </label>
                        <input
                          style={Styles.input}
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
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold capitalize mb-1"
                        >
                          Zip
                        </label>
                        <input
                          style={Styles.input}
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
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold capitalize mb-1"
                        >
                          Country
                        </label>
                        <input
                          style={Styles.input}
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
                        <label
                          style={Styles.label}
                          className="block text-sm font-bold capitalize mb-1"
                        >
                          Website
                        </label>
                        <input
                          style={Styles.input}
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
                          className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                          onClick={() => {
                            setFormData({
                              name: "",
                              abbr: "",
                              logo: "",
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
                </div>
                <div className="w-full flex justify-end">
                  <div className="flex w-1/2 justify-end  gap-4 ">
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
                          contact: { phone: "", email: "", contactPerson: "" },
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
            </form>
            <div className="min-h-auto">
              <div className="w-full h-auto rounded-t-lg border max-w-auto p-2 flex bg-gray-50 border-b">
                <h3 className="text-2xl font-bold" style={Styles.tableheading}>
                  Company List
                </h3>
              </div>
              <div className="w-full h-auto border flex justify-between items-center p-2">
                <div className="w-1/2">
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
                      style={Styles.label}
                      htmlFor="pageType-select"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Page Type
                    </label>
                    <div className="w-1/2 relative" ref={dropdownRef}>
                      <button
                        id="pageType-select"
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                          <ul className="py-1">
                            {options.map((option, index) => (
                              <li
                                key={index}
                                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleOptionClick(option.value)}
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
              </div>
              <div className="border rounded-b-lg overflow-hidden bg-white shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                      <tr style={Styles.label}>
                        <th
                          className="p-2 cursor-pointer"
                          onClick={() => handleSort("companyName")}
                        >
                          <div className="flex items-center justify-center">
                            Company Name
                            <SortingIcon
                              direction={
                                sortConfig.key === "companyName"
                                  ? sortConfig.direction
                                  : "none"
                              }
                            />
                          </div>
                        </th>
                        <th
                          className="p-2 cursor-pointer"
                          onClick={() => handleSort("state")}
                        >
                          <div className="flex items-center justify-center">
                            State
                            <SortingIcon
                              direction={
                                sortConfig.key === "state"
                                  ? sortConfig.direction
                                  : "none"
                              }
                            />
                          </div>
                        </th>
                        <th
                          className="p-2 cursor-pointer"
                          onClick={() => handleSort("street")}
                        >
                          <div className="flex items-center justify-center">
                            Street
                            <SortingIcon
                              direction={
                                sortConfig.key === "street"
                                  ? sortConfig.direction
                                  : "none"
                              }
                            />
                          </div>
                        </th>
                        <th
                          className="p-2 cursor-pointer"
                          onClick={() => handleSort("website")}
                        >
                          <div className="flex items-center justify-center">
                            Website
                            <SortingIcon
                              direction={
                                sortConfig.key === "website"
                                  ? sortConfig.direction
                                  : "none"
                              }
                            />
                          </div>
                        </th>
                        <th
                          className="p-2 cursor-pointer"
                          onClick={() => handleSort("city")}
                        >
                          <div className="flex items-center justify-center">
                            City
                            <SortingIcon
                              direction={
                                sortConfig.key === "city"
                                  ? sortConfig.direction
                                  : "none"
                              }
                            />
                          </div>
                        </th>
                        <th
                          className="p-2 cursor-pointer"
                          onClick={() => handleSort("country")}
                        >
                          <div className="flex items-center justify-center">
                            Country
                            <SortingIcon
                              direction={
                                sortConfig.key === "country"
                                  ? sortConfig.direction
                                  : "none"
                              }
                            />
                          </div>
                        </th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-center capitalize">
                      {currentData.length > 0 ? (
                        currentData.map((company) => (
                          <tr
                            key={company.companyId}
                            className="hover:bg-gray-50"
                          >
                            <td className="p-2 text-center">
                              {company.companyName}
                            </td>
                            <td className="p-2 text-center">{company.state}</td>
                            <td className="p-2 text-center">
                              {company.street}
                            </td>
                            <td className="p-2 text-center">
                              {company.website}
                            </td>
                            <td className="p-2 text-center">{company.city}</td>
                            <td className="p-2 text-center">
                              {company.country}
                            </td>
                            <td className="p-2 text-center">
                              {company.status || "Active"}
                            </td>
                            <td className="p-2 text-center">
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
                                  onClick={() =>
                                    handleDelete(company.companyId)
                                  }
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
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="px-3 py-2">
                      ...
                    </span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
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
    </section>
  );
};

export default AddCompany;
