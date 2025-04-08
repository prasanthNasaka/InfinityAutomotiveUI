/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { BASE_URL } from "../constants/global-const";
import toast, { Toaster } from "react-hot-toast";
import AxiosInstance from "../Components/AxiosInstance";
import SwipeToggle from "../Components/Toggle";
import Styles from "../constants/Styles";

const Status = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [activeDrivers, setActiveDrivers] = useState({});
  const [activeVehicles, setActiveVehicles] = useState({});
  const [modalData, setModalData] = useState({
    type: "",
    id: "",
    name: "",
    isActive: false,
  });
  const [modal, setModal] = useState(false);

  
  const [isDriversDropdownOpen, setIsDriversDropdownOpen] = useState(false);
  const [driversRecordsPerPage, setDriversRecordsPerPage] = useState(5);
  const [driversCurrentPage, setDriversCurrentPage] = useState(1);

 
  const [isVehiclesDropdownOpen, setIsVehiclesDropdownOpen] = useState(false);
  const [vehiclesRecordsPerPage, setVehiclesRecordsPerPage] = useState(5);
  const [vehiclesCurrentPage, setVehiclesCurrentPage] = useState(1);

  const options = [
    { value: 5, label: "5 per page" },
    { value: 10, label: "10 per page" },
    { value: 20, label: "20 per page" },
  ];

 
  const handleDriversOptionClick = (value) => {
    setDriversRecordsPerPage(value);
    setIsDriversDropdownOpen(false);
    setDriversCurrentPage(1);
  };

  const driversTotalPages = Math.ceil(drivers.length / driversRecordsPerPage);
  const paginatedDrivers = drivers.slice(
    (driversCurrentPage - 1) * driversRecordsPerPage,
    driversCurrentPage * driversRecordsPerPage
  );

 
  const handleVehiclesOptionClick = (value) => {
    setVehiclesRecordsPerPage(value);
    setIsVehiclesDropdownOpen(false);
    setVehiclesCurrentPage(1);
  };

  const vehiclesTotalPages = Math.ceil(vehicles.length / vehiclesRecordsPerPage);
  const paginatedVehicles = vehicles.slice(
    (vehiclesCurrentPage - 1) * vehiclesRecordsPerPage,
    vehiclesCurrentPage * vehiclesRecordsPerPage
  );

  // Helper function to get page numbers
  const getPageNumbers = (totalPages) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const fetchDrivers = async () => {
    try {
      const response = await AxiosInstance.get(`${BASE_URL}/api/drivers`);
      setDrivers(response.data || []);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await AxiosInstance.get(`${BASE_URL}/api/Vehicle`);
      setVehicles(response.data || []);
    } catch (error) {
      toast.error("Error fetching vehicles:", error);
    }
  };

  const handleToggle = (type, isActive, id, name) => {
    setModalData({ type, id, name, isActive });
    setModal(true);
  };

  const confirmToggle = async () => {
    const { type, id, isActive } = modalData;

    try {
      if (type === "driver") {
        if (isActive) {
          await handleActivateDriver(id);
        } else {
          await handleDeactivateDriver(id);
        }
      } else if (type === "vehicle") {
        if (isActive) {
          await handleActivateVehicle(id);
        } else {
          await handleDeactivateVehicle(id);
        }
      }
      setModal(false);
    } catch (error) {
      toast.error("Error performing action:", error);
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

  const handleActivateDriver = async (driverId) => {
    try {
      await AxiosInstance.put(`${BASE_URL}/api/drivers/Activate/${driverId}`);
      toast.success("Driver Activated Successfully");
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

  const handleActivateVehicle = async (vehicleId) => {
    try {
      await AxiosInstance.put(`${BASE_URL}/api/Vehicle/Activate/${vehicleId}`);
      toast.success("Vehicle Activated Successfully");
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

      <div className="overflow-y-hidden shadow-lg">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-1rem)] overflow-hidden">
        <div className=" flex-shrink-0 h-full hidden md:block">
          <MainSideBar />
        </div>

        <div className="flex-1  overflow-y-auto p-2">
          <div className="w-full gap-3 mx-auto flex rounded-md  h-fit overflow-auto">
            {/* Driver Details */}
            <div className="w-1/2 border p-2  rounded-lg">
            <div className="w-full h-auto rounded-t-lg border max-w-auto p-1 flex   bg-gray-50 border-b">
              <h1 style={Styles.tableheading} className="text-2xl lg:text-3xl font-bold text-center">
                Racer Details
              </h1>
              </div>
              <div className="w-full h-auto border flex justify-between items-center p-1">
              <div className="w-1/2 flex justify-start ">
                <div className="w-full gap-2 flex relative justify-start items-center">
                  <label
                    style={Styles.label}
                    htmlFor="drivers-pageType-select"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Page Type
                  </label>
                  <button
                    id="drivers-pageType-select"
                    className="w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    aria-haspopup="true"
                    aria-expanded={isDriversDropdownOpen}
                    onClick={() => setIsDriversDropdownOpen(!isDriversDropdownOpen)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{`${driversRecordsPerPage} per page`}</span>
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

                  {isDriversDropdownOpen && (
                    <div className="absolute mt-1 left-20 top-9 w-1/2 rounded-md bg-white shadow-lg">
                      <ul className="py-1">
                        {options.map((option, index) => (
                          <li
                            key={index}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleDriversOptionClick(option.value)}
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
              <div className="overflow-x-auto rounded-b-lg border">
              <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50   text-center">
              <tr style={Styles.label}>
                      <th className=" p-2">Driver Name</th>
                      <th className=" p-2">Phone No</th>
                      <th className=" p-2">Email</th>
                      <th className=" p-2">DL No</th>
                      <th className=" p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-center ">
                    {paginatedDrivers.length > 0 ? (
                      paginatedDrivers.map((driver) => (
                        <tr
                        className="bg-white hover:bg-gray-50"
                         key={driver.driverId}>
                          <td className="border p-2 text-center capitalize">
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
                            <SwipeToggle
                              isActive={activeDrivers[driver.driverId] || false}
                              onToggle={(isActive) =>
                                handleToggle(
                                  "driver",
                                  isActive,
                                  driver.driverId,
                                  driver.driverName
                                )
                              }
                            />
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
              <div className="flex justify-end px-2 items-center space-x-2 m-4">
                <button
                  onClick={() =>
                    setDriversCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={driversCurrentPage === 1}
                  className={`px-3 py-2 rounded-md ${
                    driversCurrentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-cyan-500 text-white hover:bg-cyan-700"
                  }`}
                >
                  Prev
                </button>
                {getPageNumbers(driversTotalPages).map((page, index) => (
                  <button
                    key={index}
                    onClick={() => setDriversCurrentPage(page)}
                    className={`px-3 py-2 rounded-md ${
                      driversCurrentPage === page
                        ? "bg-cyan-700 text-white"
                        : "bg-gray-200 hover:bg-gray-400"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setDriversCurrentPage((prev) =>
                      Math.min(prev + 1, driversTotalPages)
                    )
                  }
                  disabled={driversCurrentPage === driversTotalPages}
                  className={`px-3 py-2 rounded-md ${
                    driversCurrentPage === driversTotalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-cyan-500 text-white hover:bg-cyan-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="w-1/2 border p-2  rounded-lg">
            <div className="w-full h-auto rounded-t-lg border max-w-auto p-1 flex   bg-gray-50 border-b">
              <h1  style={Styles.tableheading} className="text-2xl lg:text-3xl font-bold text-center">
                Vehicle Details
              </h1>
              </div>
              <div className="w-full h-auto border flex justify-between items-center p-1">
              <div className="w-1/2 flex justify-end">
                <div className="w-full flex relative gap-2 justify-start items-center">
                  <label
                    style={Styles.label}
                    htmlFor="vehicles-pageType-select"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Page Type
                  </label>
                  <button
                    id="vehicles-pageType-select"
                    className="w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    aria-haspopup="true"
                    aria-expanded={isVehiclesDropdownOpen}
                    onClick={() => setIsVehiclesDropdownOpen(!isVehiclesDropdownOpen)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{`${vehiclesRecordsPerPage} per page`}</span>
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

                  {isVehiclesDropdownOpen && (
                    <div className="absolute mt-1 left-20 top-9 w-1/2 rounded-md bg-white shadow-lg">
                      <ul className="py-1">
                        {options.map((option, index) => (
                          <li
                            key={index}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleVehiclesOptionClick(option.value)}
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
              <div className="overflow-x-auto rounded-b-lg border">
              <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50   text-center">
              <tr style={Styles.label}>
                      <th className=" p-2">Vehicle Make</th>
                      <th className=" p-2">Vehicle Model</th>
                      <th className=" p-2">Reg No</th>
                      <th className=" p-2">Cc</th>
                      <th className=" p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-center ">
                    {paginatedVehicles.length > 0 ? (
                      paginatedVehicles.map((vehicle) => (
                        <tr
                        className="bg-white hover:bg-gray-50"
                         key={vehicle.vehicleId}>
                          <td className=" p-2 text-center capitalize">
                            {vehicle.make || "N/A"}
                          </td>
                          <td className=" p-2 text-center ">
                            {vehicle.model || "N/A"}
                          </td>
                          <td className=" p-2 text-center">
                            {vehicle.regNumb || "N/A"}
                          </td>
                          <td className=" p-2 text-center">
                            {vehicle.cc || "N/A"}
                          </td>
                          <td className=" p-2 text-center">
                            <SwipeToggle
                              isActive={
                                activeVehicles[vehicle.vehicleId] || false
                              }
                              onToggle={(isActive) =>
                                handleToggle(
                                  "vehicle",
                                  isActive,
                                  vehicle.vehicleId,
                                  vehicle.make
                                )
                              }
                            />
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
              <div className="flex justify-end px-2 items-center space-x-2 m-4">
                <button
                  onClick={() =>
                    setVehiclesCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={vehiclesCurrentPage === 1}
                  className={`px-3 py-2 rounded-md ${
                    vehiclesCurrentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-cyan-500 text-white hover:bg-cyan-700"
                  }`}
                >
                  Prev
                </button>
                {getPageNumbers(vehiclesTotalPages).map((page, index) => (
                  <button
                    key={index}
                    onClick={() => setVehiclesCurrentPage(page)}
                    className={`px-3 py-2 rounded-md ${
                      vehiclesCurrentPage === page
                        ? "bg-cyan-700 text-white"
                        : "bg-gray-200 hover:bg-gray-400"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setVehiclesCurrentPage((prev) =>
                      Math.min(prev + 1, vehiclesTotalPages)
                    )
                  }
                  disabled={vehiclesCurrentPage === vehiclesTotalPages}
                  className={`px-3 py-2 rounded-md ${
                    vehiclesCurrentPage === vehiclesTotalPages
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

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-auto h-fit">
            <div className="w-auto p-2 rounded-lg flex-col flex">
              <span className="text-lg">
                Are you sure you want to{" "}
                {modalData.isActive ? "activate" : "deactivate"} the
              </span>
              <span className="text-lg">
                {modalData.type} <span className="text-xl text-cyan-500  font-bold"> {modalData.name}  ?</span>
              </span>
            </div>
            <div className="flex justify-between mt-4 px-16  gap-3">
              <button
                className="p-2 w-1/2 bg-green-500 hover:bg-green-600 hover:text-black text-white rounded-[8px]"
                onClick={confirmToggle}
              >
                Yes
              </button>
              <button
                className="p-2 w-1/2 bg-red-500 hover:bg-red-600 hover:text-black text-white rounded-[8px]"
                onClick={() => setModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Status;