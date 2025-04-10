import toast, { Toaster } from "react-hot-toast";
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";
import { CalendarCheck2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import AxiosInstance from "../Components/AxiosInstance";
import Styles from "../constants/Styles";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

const EventsApproved = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const eventTypeMapping = {
    21: "Autocross",
    22: "DragRacing",
    23: "RallySprint",
    24: "StageRally",
  };

  const options = [
    { value: 5, label: "5 per page" },
    { value: 10, label: "10 per page" },
    { value: 15, label: "15 per page" },
    { value: 20, label: "20 per page" },
  ];

  const handleApprove = (event) => {
    const eventId = event.eventid;
    AxiosInstance.put(
      `${BASE_URL}/api/EventRegistration/ApproveEvents?EventId=${eventId}`,
      {
        approved: true,
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setEvents((prevEvents) =>
            prevEvents.map((ev) =>
              ev.id === eventId ? { ...ev, approved: true } : ev
            )
          );
          toast.success("Event approved successfully 🎉");
          fetchEvents();
        }
      })
      .catch((error) => {
        console.error("Error Approving Event:", error);
        toast.error("Failed to approve the event. Please try again");
      });
  };

  const fetchEvents = () => {
    AxiosInstance.get(`${BASE_URL}/api/EventRegistration/EventsToApprove`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Events:", error);
        toast.error("Failed to load events. Please check your connection 🔄");
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOptionClick = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  const filteredData = events.filter((event) =>
    Object.values(event).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.direction === "none") return 0;

    const key = sortConfig.key;
    if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // eslint-disable-next-line react/prop-types
  const SortingIcon = ({ direction }) => {
    if (direction === "none") {
      return <FaSort className="w-4 h-4 ms-1" />;
    } else if (direction === "asc") {
      return <FaSortUp className="w-4 h-4 ms-1" />;
    } else if (direction === "desc") {
      return <FaSortDown className="w-4 h-4 ms-1" />;
    }
  };

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = "none";
    }
    setSortConfig({ key, direction });
  };

  const getPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 2;

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages = [1];

      let start = Math.max(2, currentPage - maxVisiblePages);
      let end = Math.min(totalPages - 1, currentPage + maxVisiblePages);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

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
  return (
    <section className="w-full h-screen flex flex-col">
      <div className=" overflow-y-hidden shadow-lg ">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-1rem)] overflow-hidden">
        <div className="h-full ">
          <MainSideBar />
        </div>

        <div className="flex-1 p-2  overflow-y-auto">
          <div className=" max-w-10xl mx-auto">
            <div className=" mb-6">
            <div className="min-h-auto">
      <div className="w-full h-auto rounded-t-lg border max-w-auto p-2 flex bg-gray-50 border-b">
        <h3 style={Styles.tableheading} className="text-2xl font-semibold text-center text-gray-900">
          Approve Events
        </h3>
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
          <div className="w-full flex relative justify-end items-center" ref={dropdownRef}>
            <label
              htmlFor="pageType-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Page Type
            </label>
            <button
              id="pageType-select"
              className="w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center justify-between">
                <span>{`${recordsPerPage} per page`}</span>
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
      <div className="border rounded-b-lg overflow-hidden bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
              <tr style={Styles.label}>
                <th className="px-6 py-3 whitespace-nowrap">SI.No</th>
                <th 
                  className="px-6 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort("eventtype")}
                >
                  <div className="flex items-center justify-center">
                    Event Type
                    <SortingIcon
                      direction={
                        sortConfig.key === "eventtype" ? sortConfig.direction : "none"
                      }
                    />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort("eventname")}
                >
                  <div className="flex items-center justify-center">
                    Event Name
                    <SortingIcon
                      direction={
                        sortConfig.key === "eventname" ? sortConfig.direction : "none"
                      }
                    />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort("startdate")}
                >
                  <div className="flex items-center justify-center">
                    Start Date
                    <SortingIcon
                      direction={
                        sortConfig.key === "startdate" ? sortConfig.direction : "none"
                      }
                    />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort("enddate")}
                >
                  <div className="flex items-center justify-center">
                    End Date
                    <SortingIcon
                      direction={
                        sortConfig.key === "enddate" ? sortConfig.direction : "none"
                      }
                    />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort("companyName")}
                >
                  <div className="flex items-center justify-center">
                    Company
                    <SortingIcon
                      direction={
                        sortConfig.key === "companyName" ? sortConfig.direction : "none"
                      }
                    />
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">Location</th>
                <th className="px-6 py-3 whitespace-nowrap">Gmap Location</th>
                <th className="px-6 py-3 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center uppercase">
              {currentData.map((event, index) => (
                <tr
                  key={event.id}
                  className="bg-white hover:bg-gray-50"
                >
                  <td className="px-6 py-2 whitespace-nowrap">
                    {startIndex + index + 1}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    {eventTypeMapping[event.eventtype] || "Unknown"}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    {event.eventname}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    {formatDate(event.startdate)}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    {formatDate(event.enddate)}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    {event.companyName}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    {event.location}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    {event.gmapLocation}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex gap-2 justify-center">
                      {event.approved ? (
                        <span>Approved</span>
                      ) : (
                        <button
                          onClick={() => handleApprove(event)}
                          type="button"
                          className="p-2 bg-gray-50 border hover:bg-green-300 text-black rounded-lg transition-colors"
                        >
                          <CalendarCheck2 className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
      </div>
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
                onClick={() => handlePageChange(page)}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
    </div>
  
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};

export default EventsApproved;
