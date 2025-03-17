import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../constants/global-const";
import AxiosInstance from "./AxiosInstance";

const Table = () => {
  const { eventId } = useParams(); // Get eventId from URL
  console.log("eventId from URL:", eventId); // Debugging
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(
          `${BASE_URL}/api/LandingPage/ById`,
          {
            params: { EventId: eventId }, // Use EventId (capitalized) as per API
          }
        );
        setData(response.data);
        console.log("data", response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full h-screen overflow-y-auto px-4">
        <div className="relative border rounded-t-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
              <tr className="text-center">
                <th scope="col" className="px-6 py-3">
                  SL.No
                </th>
                <th scope="col" className="px-6 py-3">
                  Contestant No
                </th>
                <th scope="col" className="px-6 py-3">
                  Driver
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Penalty
                </th>
                <th scope="col" className="px-6 py-3">
                  POS
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Teams
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:bg-gray-800 dark:divide-gray-700">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{item.contestentNumb}</td>
                  <td className="px-6 py-4">{item.driverName}</td>
                  <td className="px-6 py-4">{item.categoryName}</td>
                  <td className="px-6 py-4">{item.totaltime}</td>
                  <td className="px-6 py-4">{item.penaltytime}</td>
                  <td className="px-6 py-4">{item.pos}</td>
                  <td className="px-6 py-4">{item.racestatus}</td>
                  <td className="px-6 py-4">{item.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
