/* eslint-disable no-unused-vars */
import { Toaster } from "react-hot-toast";
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";
import { CalendarCheck2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const EventsApproved = () => {
  
  const [events,setEvents] = useState([])

  useEffect(() => {
       axios.get()
  })

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
              <div className="p-2">
                <h3 className="text-2xl font-semibold text-center text-gray-900">
                  Approve Events
                </h3>
              </div>

              <div className="min-h-auto p-6">
                <div className="border rounded-lg overflow-hidden bg-white shadow-md">
                  <div className="overflow-x-auto ">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                        <tr>
                          <th className="px-6 py-3 whitespace-nowrap">SL.No</th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Event Name
                          </th>
                          <th className="px-6 py-3 whitespace-nowrap">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-center uppercase">
                        <tr className="bg-white hover:bg-gray-50">
                          <td className="px-6 py-2 whitespace-nowrap font-medium text-gray-900">
                            1
                          </td>

                          <td className="px-6 py-2 whitespace-nowrap font-medium text-gray-900">
                            Moto GP
                          </td>

                          <td className="px-6 py-2 whitespace-nowrap ">
                            <div className="flex gap-2 justify-center">
                              <button
                                type="button"
                                className="p-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                              >
                            
                                <CalendarCheck2 className="w-6 h-6" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
    </section>
  );
};

export default EventsApproved;
