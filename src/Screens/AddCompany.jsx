import { useState } from "react";
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";

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
    login: { username: "", password: "", confirmPassword: "" },
  });

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
  };

  return (
    <div>
      <div className="h-24 w-full shadow-md p-1">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>
        <div className="flex w-full p-8 h-auto">
          <form className="w-full mx-auto p-3 rounded-md shadow-lg h-fit overflow-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Company Details
            </h2>

            <div className="mb-4   ">
              <label className="block text-sm font-bold mb-1 self-auto ">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
                placeholder="Enter company name"
              />
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
                      <label className="block text-sm font-bold capitaliz mb-1">
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
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 border rounded-md shadow w-1/2">
              <h3 className="text-lg font-semibold mb-2">Login Details</h3>
              <div className="grid grid-cols-1 gap-4 ">
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="login.username"
                    value={formData.login.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="login.password"
                    value={formData.login.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="login.confirmPassword"
                    value={formData.login.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Confirm password"
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
                    login: { username: "", password: "", confirmPassword: "" },
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
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
