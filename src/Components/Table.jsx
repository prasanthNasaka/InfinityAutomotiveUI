/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../constants/global-const";
import AxiosInstance from "./AxiosInstance";
import Styles from "../constants/Styles";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const Table = () => {
  const { eventId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("none");

  const dropdownRef = useRef(null);

  const options = [
    { value: 5, label: "5 per page" },
    { value: 10, label: "10 per page" },
    { value: 15, label: "15 per page" },
    { value: 20, label: "20 per page" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(
          `${BASE_URL}/api/LandingPage/ById`,
          {
            params: { EventId: eventId },
          }
        );
        setData(response.data);
      } catch {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleOptionClick = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? "none" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortedData = () => {
    if (sortDirection === "none" || !sortField) return [...data];

    return [...data].sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const SortingIcon = ({ direction }) => {
    if (direction === "asc") return <FaSortUp className="ms-1" />;
    if (direction === "desc") return <FaSortDown className="ms-1" />;
    return <FaSort className="ms-1" />;
  };

  const filteredData = getSortedData().filter((event) =>
    Object.values(event).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const maxVisiblePages = 2;
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - maxVisiblePages);
      let end = Math.min(totalPages - 1, currentPage + maxVisiblePages);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="w-full h-screen p-2">
      <Toaster position="bottom-center" reverseOrder={false} />
 
      <div className="border rounded-lg overflow-hidden bg-white shadow-md">
        <div className="w-full bg-gray-50 p-2 flex justify-center h-auto">
          <span style={Styles.tableheading}>Completed Details</span>
        </div>

        <div className="w-full h-auto border flex justify-between items-center p-2">
          <div className="w-1/2">
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="w-1/2 flex justify-end">
            <div
              className="w-full flex relative justify-end items-center"
              ref={dropdownRef}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page Type
              </label>
              <button
                className="w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center justify-between">
                  <span>{`${recordsPerPage} per page`}</span>
                  <svg
                    className="h-4 w-4 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" />
                  </svg>
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute mt-1 top-12 w-1/2 rounded-md bg-white shadow-lg z-10">
                  <ul className="py-1">
                    {options.map((option, index) => (
                      <li
                        key={index}
                        className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleOptionClick(option.value)}
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

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center sticky top-0">
              <tr style={Styles.label}>
                <th className="px-6 py-3">SL.No</th>

                <th
                  onClick={() => handleSort("contestentNumb")}
                  className="px-6 py-3 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    Contestant No
                    <SortingIcon
                      direction={
                        sortField === "contestentNumb" ? sortDirection : "none"
                      }
                    />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("driverName")}
                  className="px-6 py-3 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    Driver
                    <SortingIcon
                      direction={
                        sortField === "driverName" ? sortDirection : "none"
                      }
                    />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("categoryName")}
                  className="px-6 py-3 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    Category
                    <SortingIcon
                      direction={
                        sortField === "categoryName" ? sortDirection : "none"
                      }
                    />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("totaltime")}
                  className="px-6 py-3 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    Duration
                    <SortingIcon
                      direction={
                        sortField === "totaltime" ? sortDirection : "none"
                      }
                    />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("penaltytime")}
                  className="px-6 py-3 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    Penalty
                    <SortingIcon
                      direction={
                        sortField === "penaltytime" ? sortDirection : "none"
                      }
                    />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("pos")}
                  className="px-6 py-3 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    POS
                    <SortingIcon
                      direction={sortField === "pos" ? sortDirection : "none"}
                    />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("racestatus")}
                  className="px-6 py-3 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    Status
                    <SortingIcon
                      direction={
                        sortField === "racestatus" ? sortDirection : "none"
                      }
                    />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("team")}
                  className="px-6 py-3 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    Teams
                    <SortingIcon
                      direction={sortField === "team" ? sortDirection : "none"}
                    />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center uppercase">
              {currentData.map((item, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {(currentPage - 1) * recordsPerPage + index + 1}
                  </td>
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

        {filteredData.length > 0 && (
          <div className="flex justify-end px-2 items-center space-x-2 m-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-700"
              }`}
            >
              Prev
            </button>
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-3 py-2">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === page
                      ? "bg-cyan-700 text-white"
                      : "bg-gray-200 hover:bg-gray-400"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
     
    </section>
  );
};

export default Table;