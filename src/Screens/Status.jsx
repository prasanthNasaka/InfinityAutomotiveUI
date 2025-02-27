/* eslint-disable no-unused-vars */
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useState } from "react";
import { IMAGE_URL } from "../constants/global-const";
import AutoCompleteSearch from "../Components/CustomAutoComplete";
import { IoPerson } from "react-icons/io5";
import { LuBike } from "react-icons/lu";

const Status = () => {
  const [driverimageUrl, setDriverImageUrl] = useState("");
  const [vehicleimageUrl, setVehicleImageUrl] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [DrvtableData, setDrvTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  //   const handleSelect = (type, item) => {
  //     if (type === "driver") {
  //       const FilteredDrvData = tableData.filter(
  //         (d) => d.driverId == item.driverId
  //       );
  //       console.log("FilteredDrvData", FilteredDrvData);
  //       setDrvTableData(FilteredDrvData);
  //       setSelectedDriver(item);

  //       if (item) {
  //         setDriverImageUrl(
  //           item.driverPhoto ? `${IMAGE_URL}${item.driverPhoto}` : null
  //         );
  //       } else {
  //         setDriverImageUrl("");
  //       }
  //     } else if (type === "vehicle") {
  //       setSelectedVehicle(item);

  //       if (item) {
  //         setVehicleImageUrl(
  //           item.vehiclePhoto ? `${IMAGE_URL}${item.vehiclePhoto}` : null
  //         );
  //       } else {
  //         setVehicleImageUrl("");
  //       }
  //     }
  //   };
  //   const handleDataReceived = (type, data) => {
  //     if (type === "driver") {
  //       setDriverData(data);
  //     } else if (type === "vehicle") {
  //       setVehicleData(data);
  //     }
  //   };
  return (
    <>
      <div className="h-24 w-full shadow-md p-1">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>

        <div className="flex w-full p-8 h-auto flex-col">
          <form className="w-full mx-auto p-3 rounded-md shadow-lg h-fit">
            {/* <div className="w-full flex h-auto p-2 gap-5 tab:flex-col ">
              <div className="w-1/2 flex flex-col gap-2 tab:w-full">
                <form className="w-full">
                  <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                    Search
                  </label>
                  <AutoCompleteSearch
                    from="myComponent"
                    searchType="Driver"
                    onDataReceived={(data) =>
                      handleDataReceived("driver", data)
                    }
                    onSelect={(driver) => handleSelect("driver", driver)}
                  />
                </form>
              </div>

              <div className="w-1/2 flex flex-col gap-2 tab:w-full">
                <div className="w-full">
                  <form className="w-full">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                      Search
                    </label>
                    <AutoCompleteSearch
                      from="myComponent"
                      searchType="vehicle"
                      onDataReceived={(data) =>
                        handleDataReceived("vehicle", data)
                      }
                      onSelect={(vehicle) => handleSelect("vehicle", vehicle)}
                    />
                  </form>
                </div>
              </div>
            </div> */}

            <div className="flex w-full gap-5">
              <div className="w-1/2">
                <h1 className="flex justify-center  text-3xl font-bold w-full ">
                  Racer details
                </h1>

                <table className="w-full border-collapse border border-gray-300 mt-10">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Driver Name</th>
                      <th className="border p-2">Driver phone No</th>
                      <th className="border p-2"> Driver Email</th>
                      <th className="border p-2">DL No</th>

                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 text-center">Max</td>
                      <td className="border p-2 text-center">9876543210</td>
                      <td className="border p-2 text-center">max@gmail.com</td>
                      <td className="border p-2 text-center">Ap2727277272</td>

                      <td className="border p-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            type="button"
                            className="p-2 bg-orange-300 border  text-black rounded-md transition-colors  "
                          >
                            Inactive
                          </button>
                          <button
                            type="button"
                            className="p-2 bg-red-400 border  text-black rounded-md transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-1/2">
                <h1 className="flex justify-center  text-3xl font-bold w-full ">
                  Vehicle details
                </h1>

                <table className="w-full border-collapse border border-gray-300 mt-10">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Vehicle Make</th>
                      <th className="border p-2">Vehicle Model</th>
                      <th className="border p-2">Reg No </th>
                      <th className="border p-2">Cc</th>

                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 text-center">TVS</td>
                      <td className="border p-2 text-center">XL Super</td>
                      <td className="border p-2 text-center">KA03ER9990</td>
                      <td className="border p-2 text-center">100cc</td>

                      <td className="border p-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            type="button"
                            className="p-2 bg-orange-300 border  text-black rounded-md transition-colors  "
                          >
                            Inactive
                          </button>
                          <button
                            type="button"
                            className="p-2 bg-red-400 border  text-black rounded-md transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
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
