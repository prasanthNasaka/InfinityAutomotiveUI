
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import Newheader from './Newheader';
import MainSideBar from './MainSideBar';

function App() {
  return (
    <section className="w-full h-screen flex flex-col">
      <div className="w-full h-24 overflow-y-hidden shadow-lg">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-6rem)] overflow-hidden">
        <div className="h-full">
          <MainSideBar />
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
            
                <div className="w-full flex p-2 gap-2">
                
                  <div className="w-1/2">
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
                   
                  <div className="w-1/2">
                    <label className="text-sm font-medium text-gray-900">
                      Choose Category:
                    </label>
                    <select className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5">
                      <option value="">Choose Category</option>
                      <option value="1600cc">1600cc</option>
                      <option value="1000cc">1000cc</option>
                      <option value="1400cc">1400cc</option>
                      <option value="1200cc">1200cc</option>
                    </select>
                  </div>
                </div>
              
                <div className="w-full p-2">
                  <form className="w-full">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 "
                        placeholder="Search by phone, DL FMSCI no, name"
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-cyan-600 hover:bg-cyan-500  font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                 
                <div className="w-full p-2">
                  <div className="w-1/2 border p-2 flex bg-gray-50 rounded-lg">
                    <div className="w-1/2 flex justify-center items-center p-2">
                      <img
                        className="h-28 w-28 rounded-full object-cover"
                        src="https://images.prismic.io/carwow/519b8011-21c4-4197-9f1a-5db6601e024e_lamborghini-huracan-driving.JPG?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=60&w=1125"
                        alt=""
                      />
                    </div>
                    <div className="w-1/2 flex flex-col justify-center">
                      <div className="mb-2">
                        <span>Name: Farshad</span>
                      </div>
                      <div>
                        <span>DOB: 23-06-2002</span>
                      </div>
                    </div>
                  </div>
                </div>

          

                <div className="w-full flex p-2 gap-2">

        

                  <div className="w-1/3">
                    <label className="text-sm font-medium text-gray-900">
                      Enter Contestant number:
                    </label>
                    <input
                      type="number"
                      placeholder="Enter your number"
                      className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5"
                    />
                  </div>

              

                  <div className="w-1/3">
                    <label className="text-sm font-medium text-gray-900">
                      Choose Vehicle:
                    </label>
                    <select className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5">
                      <option value="">Choose vehicle</option>
                      <option value="Lamborghini">Lamborghini Temerario</option>
                      <option value="Bugatti">Bugatti Chiron</option>
                      <option value="McLaren">McLaren 720s</option>
                      <option value="Ferrari">Ferrari 448 Pista</option>
                    </select>
                  </div>


                  <div className="w-1/3 flex items-end justify-end">
                    <button
                      type="button"
                      className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg text-sm transition-colors"
                    >
                      Add Contestant
                    </button>
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
                      <th className="px-6 py-3 whitespace-nowrap">Event name</th>
                      <th className="px-6 py-3 whitespace-nowrap">Category</th>
                      <th className="px-6 py-3 whitespace-nowrap">Contestant Number</th>
                      <th className="px-6 py-3 whitespace-nowrap">Payment Status</th>
                      <th className="px-6 py-3 whitespace-nowrap">Documents</th>
                      <th className="px-6 py-3 whitespace-nowrap">Scrutiny</th>
                      <th className="px-6 py-3 whitespace-nowrap">Vehicle</th>
                      <th className="px-6 py-3 whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[0,1,2,3,4,5,6,7,8,9].map((index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-2 whitespace-nowrap font-medium text-gray-900">
                          <span className="flex gap-2 justify-center">
                          {index +1}
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
                        <span className="flex gap-2 justify-center">
                            23
                          </span>
                          
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
}

export default App;