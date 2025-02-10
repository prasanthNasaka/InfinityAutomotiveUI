/* eslint-disable no-unused-vars */
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";

import Newheader from "./Newheader";
import MainSideBar from "./MainSideBar";
import AutoCompleteSearch from "./CustomAutoComplete";

const formatDate = (dateString) => {
  if (!dateString || dateString === "0001-01-01T00:00:00") {
    return "N/A";
  }

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const Linkraceanddrive = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [driverData, setDriverData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const openVisible = () => {
    if (isVisible === true) {
      setIsVisible(false);
    } else setIsVisible(true);
  };

  const handleDriverDataReceived = (data) => {
    setDriverData(data);
  };

  const handleVehicleDataReceived = (data) => {
    setVehicleData(data);
  };

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    console.log("driver", driver);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    console.log("vehicle", vehicle);
  };

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="w-full h-24 overflow-y-hidden shadow-lg">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-6rem)] overflow-hidden">
        <div className=" h-full">
          <div className="h-full ">
            <MainSideBar />
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border mb-6">
              <div className="p-2 border-b">
                <h3 className="text-2xl font-semibold text-center text-gray-900">
                  Registration
                </h3>
              </div>

              <div className="p-4">
                <div className="w-full flex p-2 gap-2 tab:flex-col">
                  <div className="w-1/2 tab:w-full">
                    <label className="text-sm font-medium text-gray-900">
                      Eventname:
                    </label>
                    <select className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5">
                      <option value="">Choose Event</option>
                      <option value="Piston Cup">Piston Cup</option>
                      <option value="Champion Ship">Champion Ship</option>
                      <option value="Tonso Cup">Tonso Cup</option>
                      <option value="WRB">WRB</option>
                    </select>
                  </div>

                  <div className="w-1/2 tab:w-full">
                    <label className="text-sm font-medium text-gray-900">
                      Enter Category
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Category"
                      className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5"
                    />
                  </div>
                </div>

                <div className="w-full flex  h-auto p-2 gap-2 tab:flex-col">
                  <div className="w-1/2 flex flex-col gap-2 tab:w-full">
                    <div className="w-full ">
                      <form className="w-full">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                          Search
                        </label>
                        <AutoCompleteSearch
                          searchType="Driver"
                          onDataReceived={handleDriverDataReceived}
                          onSelect={handleDriverSelect}
                        />
                      </form>
                    </div>
                    <div className="w-full h-full ">
                      <div className="w-full border p-2 flex bg-gray-50 tab:w-full lappydesk:w-full  rounded-lg">
                        <div className="w-1/2 flex justify-center items-center p-2">
                          <img
                            className="h-28 w-28 rounded-full object-cover flex lappydesk:justify-start"
                            src="https://images.prismic.io/carwow/519b8011-21c4-4197-9f1a-5db6601e024e_lamborghini-huracan-driving.JPG?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=60&w=1125"
                            alt=""
                          />
                        </div>
                        <div className="w-1/2 flex flex-col gap-4 justify-center ">
                          <span>
                            Name:{" "}
                            {selectedDriver
                              ? selectedDriver.driverName
                              : "Not Selected Yet"}
                          </span>
                          <span>
                            DOB:{" "}
                            {selectedDriver
                              ? formatDate(selectedDriver.dob)
                              : "Not Selected Yet"}
                          </span>
                          <span>
                            Lic.No:{" "}
                            {selectedDriver
                              ? selectedDriver.dlNumb || "N/A"
                              : "Not Selected Yet"}
                          </span>
                          <span>
                            Phone number:{" "}
                            {selectedDriver
                              ? selectedDriver.phone || "N/A"
                              : "Not Selected Yet"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2 flex flex-col gap-2 tab:w-full">
                    <div className="w-full ">
                      <form className="w-full">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                          Search
                        </label>
                        <AutoCompleteSearch
                          searchType="vehicle"
                          onDataReceived={handleVehicleDataReceived}
                          onSelect={handleVehicleSelect}
                        />
                      </form>
                    </div>
                    <div className="w-full h-full tab:w-full">
                      <div className="w-full border p-2 flex bg-gray-50 tab:w-full lappydesk:w-full  rounded-lg">
                        <div className="w-1/2 flex justify-center items-center p-2">
                          <img
                            className="h-28 w-28 rounded-full object-cover flex lappydesk:justify-start"
                            src="https://images.hindustantimes.com/auto/img/2020/05/07/1600x900/lamborghini_huracan_evo_rwd_spyder_3-4_ambient_HT_Auto_1588857850078_1588857850386.jpg"
                            alt=""
                          />
                        </div>
                        <div className="w-1/2 flex flex-col gap-4 justify-center">
                          <span>
                            Brand:{" "}
                            {selectedVehicle
                              ? selectedVehicle.make
                              : "Not Selected Yet"}
                          </span>
                          <span>
                            Model:{" "}
                            {selectedVehicle
                              ? selectedVehicle.model
                              : "Not Selected Yet"}
                          </span>
                          <span>
                            Engine:{" "}
                            {selectedVehicle
                              ? selectedVehicle.engNumber || "N/A"
                              : "Not Selected Yet"}
                          </span>
                          <span>
                            Reg No:{" "}
                            {selectedVehicle
                              ? selectedVehicle.regNumb
                              : "Not Selected Yet"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex p-2 gap-2 tab:flex-col ">
                  <div className="w-1/2 tab:w-full flex justify-between ">
                    <div className="w-1/2 ">
                      <label className="text-sm font-medium text-gray-900">
                        Enter Contestant number:
                      </label>
                      <input
                        type="number"
                        placeholder="Enter your number"
                        className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5"
                      />
                    </div>

                    <div className="flex w-1/2 justify-end items-center gap-1   ">
                      <input
                        onClick={openVisible}
                        id="remember"
                        type="checkbox"
                        className="accent-cyan-600 w-4 h-4 text-black  border border-gray-100 rounded  hover:cursor-pointer"
                        required
                      />
                      <label
                        htmlFor="remember"
                        className=" text-md items-end  text-black hover:cursor-pointer"
                      >
                        Amount paid
                      </label>
                    </div>
                  </div>

                  <div className="w-1/2 tab:w-full flex items-end justify-between ">
                    <div className="w-1/2 flex items-end justify-between  gap-2">
                      {isVisible && (
                        <div className="flex flex-col justify-center  gap-1">
                          <label className="text-md" htmlFor="Payment number">
                            Number:
                          </label>
                          <input
                            placeholder="Enter Ref number"
                            className="p-2 bg-gray-50 border border-gray-100 rounded-lg"
                            type="text"
                          />
                        </div>
                      )}
                    </div>

                    <div className="w-1/2 flex justify-end ">
                      <button
                        type="button"
                        className=" tab:w-full px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg text-sm transition-colors"
                      >
                        Add Contestant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 whitespace-nowrap">Si.no</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Event name
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">Category</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Contestant Number
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Payment Status
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">Documents</th>
                      <th className="px-6 py-3 whitespace-nowrap">Scrutiny</th>
                      <th className="px-6 py-3 whitespace-nowrap">Vehicle</th>
                      <th className="px-6 py-3 whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-2 whitespace-nowrap font-medium text-gray-900">
                          <span className="flex gap-2 justify-center">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-gray-900">
                          <span className="flex gap-2 justify-center">
                            Piston cup
                          </span>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <span className="flex gap-2 justify-center">
                            1600cc
                          </span>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <span className="flex gap-2 justify-center">23</span>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <span className="flex gap-2 justify-center text-green-600 capitalize">
                            paid
                          </span>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <span className="flex gap-2 justify-center text-green-600 capitalize">
                            Verified
                          </span>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <span className="flex gap-2 justify-center text-red-600 capitalize">
                            Rejected
                          </span>
                        </td>
                        <td className="px-6 py-2 text-wrap">
                          <span className="flex gap-2 justify-center capitalize">
                            Lamborghini huracan
                          </span>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="p-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors "
                            >
                              <CiEdit className="size-6" />
                            </button>
                            <button
                              type="button"
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
        </div>
      </div>
    </section>
  );
};

export default Linkraceanddrive;
