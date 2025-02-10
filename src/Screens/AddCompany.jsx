// src/AddCompany.jsx
import { useState } from "react";

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    contact: {
      phone: "",
      email: "",
      website: "",
    },
  });

  const [companies, setCompanies] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prevData) => ({
        ...prevData,
        [keys[0]]: {
          ...prevData[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanies((prevCompanies) => [...prevCompanies, formData]);
    setFormData({
      name: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
      contact: {
        phone: "",
        email: "",
        website: "",
      },
    });
  };
  const handleDelete = (index) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((_, i) => i !== index)
    );
  };

  const handleView = (company) => {
    setFormData(company);
  };

  return (
    <div>
      <form
        className="w-3/4 mx-auto p-3 rounded-md shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Company Details</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold">Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter company name"
            required
          />
        </div>

        <h3 className="text-lg font-semibold mb-2">Address</h3>
        {["street", "city", "state", "zip", "country"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-bold capitalize">
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
        ))}

        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
        {["phone", "email", "website"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-bold capitalize">
              {field}
            </label>
            <input
              type={
                field === "email" ? "email" : field === "phone" ? "tel" : "url"
              }
              name={`contact.${field}`}
              value={formData.contact[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder={`Enter ${field}`}
              required={field === "phone" || field === "email"}
            />
          </div>
        ))}

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
                },
                contact: { phone: "", email: "", website: "" },
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
      </form>

      <div className="mt-6 flex justify-center flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Submitted Companies</h2>
        <table className="w-3/4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Company Name</th>
              <th className="border border-gray-300 p-2">City</th>
              <th className="border border-gray-300 p-2">State</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{company.name}</td>
                <td className="border border-gray-300 p-2">
                  {company.address.city}
                </td>
                <td className="border border-gray-300 p-2">
                  {company.address.state}
                </td>
                <td className="border border-gray-300 p-2">
                  {company.contact.phone}
                </td>
                <td className="border border-gray-300 p-2">
                  {company.contact.email}
                </td>
                <td className="border border-gray-300 p-2 gap-2">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleView(company)}
                  >
                    View
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCompany;
