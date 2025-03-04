/* eslint-disable no-unused-vars */
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useEffect, useState } from "react";
import { BASE_URL, IMAGE_URL } from "../constants/global-const";

import axios from "axios";

const Status = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/drivers`);

      const driverData = response.data.$values || [];
      setDrivers(driverData);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/Vehicle`);

      console.log("API Response:", response.data);
      const vehicledata = response.data.$values || [];
      setVehicles(vehicledata);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchVehicles();
  }, []);

  return (
    <>
      <div className="h-24 w-full shadow-md p-1">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>

        <div className="flex w-full p-8 h-fit flex-col">
          <form className="w-full mx-auto p-3 rounded-md shadow-lg h-fit">
            <div className="flex w-full gap-5 ">
              <div className="w-1/2">
                <h1 className="flex justify-center text-3xl font-bold w-full">
                  Racer Details
                </h1>

                <table className="w-full border-collapse border border-gray-300 mt-10  ">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Driver Name</th>
                      <th className="border p-2">Phone No</th>
                      <th className="border p-2">Email</th>
                      <th className="border p-2">DL No</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.length > 0 ? (
                      drivers.map((driver) => (
                        <tr key={driver.driverId}>
                          <td className="border p-2 text-center">
                            {driver.drivername || "N/A"}
                          </td>
                          <td className="border p-2 text-center">
                            {driver.phone || "N/A"}
                          </td>
                          <td className="border p-2 text-center">
                            {driver.email || "N/A"}
                          </td>
                          <td className="border p-2 text-center">
                            {driver.dlNumb || "N/A"}
                          </td>
                          <td className="border p-2 text-center">
                            <div className="flex gap-2 justify-center">
                              <button className="p-2 bg-orange-300 border text-black rounded-md hover:bg-orange-400 transition duration-200">
                                Inactive
                              </button>
                              <button className="p-2 bg-red-400 border text-black rounded-md hover:bg-red-500 transition duration-200">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center p-3">
                          No drivers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="w-1/2">
                <h1 className="flex justify-center text-3xl font-bold w-full">
                  Vehicle Details
                </h1>

                <table className="w-full border-collapse border border-gray-300 mt-10">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Vehicle Make</th>
                      <th className="border p-2">Vehicle Model</th>
                      <th className="border p-2">Reg No</th>
                      <th className="border p-2">Cc</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.length > 0 ? (
                      vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                          <td className="border p-2 text-center">
                            {vehicle.make || "N/A"}
                          </td>
                          <td className="border p-2 text-center">
                            {vehicle.model || "N/A"}
                          </td>
                          <td className="border p-2 text-center">
                            {vehicle.regNumb || "N/A"}
                          </td>
                          <td className="border p-2 text-center">
                            {vehicle.cc || "N/A"}
                          </td>
                          <td className="border p-2 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                type="button"
                                className="p-2 bg-orange-300 border text-black rounded-md transition-colors"
                              >
                                Inactive
                              </button>
                              <button
                                type="button"
                                className="p-2 bg-red-400 border text-black rounded-md transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center p-3">
                          No vehicles found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Status;
