/* eslint-disable no-unused-vars */
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useEffect, useState } from "react";
import { BASE_URL, IMAGE_URL } from "../constants/global-const";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AxiosInstance from "../Components/AxiosInstance";
import Styles from "../constants/Styles";

const Status = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const fetchDrivers = async () => {
    try {
      const response = await AxiosInstance.get(`${BASE_URL}/api/drivers`);

      const driverData = response.data || [];
      setDrivers(driverData);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await AxiosInstance.get(`${BASE_URL}/api/Vehicle`);

      const vehicledata = response.data || [];
      setVehicles(vehicledata);
    } catch (error) {
      toast.error("Error fetching drivers:", error);
    }
  };

  const handleDeactivateDriver = async (driverId) => {
    try {
      await AxiosInstance.put(`${BASE_URL}/api/drivers/DeActivate/${driverId}`);
      toast.success("Driver Deactivated Successfully");
      fetchDrivers();
    } catch (error) {
      toast.error("Error deactivating driver:", error);
    }
  };
  const handleactivateDriver = async (driverId) => {
    try {
      await AxiosInstance.put(`${BASE_URL}/api/drivers/Activate/${driverId}`);
      toast.success("Driver activated Successfully");
      fetchDrivers();
    } catch (error) {
      toast.error("Error activating driver:", error);
    }
  };

  const handleDeactivateVehicle = async (vehicleId) => {
    try {
      await AxiosInstance.put(
        `${BASE_URL}/api/Vehicle/DeActivate/${vehicleId}`
      );
      toast.success("Vehicle Deactivated Successfully");
      fetchVehicles();
    } catch (error) {
      toast.error("Error deactivating vehicle:", error);
    }
  };
  const handleactivateVehicle = async (vehicleId) => {
    try {
      await AxiosInstance.put(`${BASE_URL}/api/Vehicle/Activate/${vehicleId}`);
      toast.success("Vehicle activated Successfully");
      fetchVehicles();
    } catch (error) {
      toast.error("Error activating vehicle:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchVehicles();
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
          <form className="w-full mx-auto p-3 rounded-md shadow-lg h-fit overflow-auto">
            <div className="flex w-full gap-3 ">
              <div className="w-1/2 border-1  p-2 border mb-4 rounded-lg">
              <div className="p-2 ml-2 flex ">
                <h1 style={Styles.heading} className="flex justify-center text-3xl font-bold w-full">
                  Racer Details
                </h1>
                </div>

                <table className="w-full rounded-lg  border border-gray-300  h-auto overflow-auto ">
                  <thead className="rounded-t-lg border border-red-700">
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
                            {driver.driverName || "N/A"}
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
                              <button
                                type="button"
                                className="p-2 bg-orange-300 border text-black rounded-md hover:bg-orange-400 transition duration-200"
                                onClick={() =>
                                  handleDeactivateDriver(driver.driverId)
                                }
                              >
                                Inactive
                              </button>
                              <button
                                className="p-2 bg-green-300 border text-black rounded-md transition duration-200"
                                onClick={() =>
                                  handleactivateDriver(driver.driverId)
                                }
                              >
                                Active{" "}
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

              <div className="w-1/2 border-1  p-2 border mb-4 rounded-lg">
              <div className="p-2  flex ">
                <h1 style={Styles.heading} className="flex justify-center text-3xl font-bold w-full ">
                  Vehicle Details
                </h1>
                </div>

                <table className="w-full border-collapse border border-gray-300 ">
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
                                onClick={() =>
                                  handleDeactivateVehicle(vehicle.vehicleId)
                                }
                              >
                                Inactive
                              </button>
                              <button
                                type="button"
                                className="p-2 bg-green-300 border text-black rounded-md transition-colors"
                                onClick={() =>
                                  handleactivateVehicle(vehicle.vehicleId)
                                }
                              >
                                Active{" "}
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
      </div>
    </section>
  );
};

export default Status;
