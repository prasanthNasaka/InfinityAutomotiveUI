/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { BASE_URL } from "../constants/global-const";
import AxiosInstance from "../Components/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import Styles from "../constants/Styles";

const ScrutinyTemplate = () => {
  const [scrutinyRules, setScrutinyRules] = useState([]);
  const [newTemplate, setNewTemplate] = useState("");
  const [newRule, setNewRule] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRules, setSelectedRules] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { label: "5 per page", value: 5 },
    { label: "10 per page", value: 10 },
    { label: "20 per page", value: 20 },
    { label: "50 per page", value: 50 },
  ];

  const handleOptionClick = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  const totalPages = Math.ceil(scrutinyRules.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = scrutinyRules.slice(startIndex, endIndex);

  useEffect(() => {
    fetchScrutinyRules();
    fetchTemplates();
  }, []);

  const fetchScrutinyRules = async (template = "") => {
    setLoading(true);
    try {
      const url = template
        ? `${BASE_URL}/api/Scrutiny/DefaultTemplate?Template=${template}`
        : `${BASE_URL}/api/Scrutiny/DefaultTemplate`;

      const response = await AxiosInstance.get(url);
      setScrutinyRules(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error("Failed to fetch scrutiny rules.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await AxiosInstance.get(
        `${BASE_URL}/api/Scrutiny/Template`
      );
      setTemplates(response.data || []);
    } catch (error) {
      toast.error("Error fetching templates");
    }
  };

  const handleTemplateChange = async (e) => {
    const template = e.target.value;
    setSelectedTemplate(template);
    fetchScrutinyRules(template);
  };

  const addRule = () => {
    if (!newRule.trim()) {
      toast.error("Scrutiny rule cannot be empty.");
      return;
    }

    const newScrutinyRule = {
      scrutinyrulesId: Date.now(),
      template: newTemplate,
      scrutinyDescription: newRule,
    };

    setScrutinyRules([...scrutinyRules, newScrutinyRule]);
    setSelectedRules(
      (prev) => new Set([...prev, newScrutinyRule.scrutinyrulesId])
    );
    setNewRule("");
  };

  const toggleSelection = (id) => {
    setSelectedRules((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const addTemplate = async () => {
    if (!newTemplate.trim()) {
      toast.error("Template name cannot be empty.");
      return;
    }

    try {
      const selectedScrutinyRules = Array.from(selectedRules)
        .map((id) => {
          const rule = scrutinyRules.find((r) => r.scrutinyrulesId === id);
          return rule?.scrutinyDescription || null;
        })
        .filter(Boolean);

      const requestBody = {
        template: newTemplate,
        scrutineyrule: selectedScrutinyRules,
      };

      await AxiosInstance.post(
        `${BASE_URL}/api/Scrutiny/Template`,
        requestBody
      );
      toast.success("Template Added Successfully");
      fetchTemplates();
      setNewTemplate("");
      setSelectedRules(new Set());
    } catch (error) {
      toast.error("Failed to add scrutiny template.");
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (typeof page === "number") setCurrentPage(page);
  };

  return (
    <section className="w-full h-screen flex flex-col">
      <Toaster position="bottom-center" />
      <div className="shadow-lg">
        <Newheader />
      </div>
      <div className="flex h-[calc(100vh-1rem)] overflow-hidden">
        <div className="h-full">
          <MainSideBar />
        </div>
        <div className="flex-1 p-2 overflow-y-auto">
          <div className="max-w-10xl mx-auto">
            {/* Form */}
            <form className="bg-white mb-6">
              <div className="p-2 ml-2 flex">
                <h2
                  style={Styles.heading}
                  className="ml-2 text-2xl font-semibold text-gray-900"
                >
                  Template
                </h2>
              </div>

              <div className="mt-4">
                <div className="border p-2 mb-4 rounded-lg">
                  <div className="w-full flex justify-center">
                    <div className="w-1/2">
                      <label
                        style={Styles.label}
                        className="text-sm font-semibold mb-1"
                      >
                        Choose a Template
                      </label>
                      <select
                        value={selectedTemplate}
                        onChange={handleTemplateChange}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">Default</option>
                        {templates.map((t, i) => (
                          <option key={i} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex p-2 gap-2">
                    <div className="w-1/2">
                      <label className="text-sm font-bold mb-1 mt-4">
                        Enter a new template
                      </label>
                      <input
                        type="text"
                        value={newTemplate}
                        onChange={(e) => setNewTemplate(e.target.value)}
                        placeholder="Enter template"
                        className="p-2 border rounded w-full"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-sm font-bold mb-1 mt-4">
                        Enter a new Scrutiny Rule
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Enter Scrutiny Rule"
                        value={newRule}
                        onChange={(e) => setNewRule(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full flex h-auto justify-end">
                    <div className="flex w-1/2 justify-end p-2">
                      <button
                        type="button"
                        onClick={addRule}
                        className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <h3 className="text-2xl font-bold p-2 border rounded-t-lg bg-gray-50">
              List Of Scrutiny Rules
            </h3>

            <div className="w-full h-auto border flex justify-between items-center p-2">
              <div className="w-1/2 flex relative items-center">
                <label className="block text-sm font-medium text-gray-700 mb-1 mr-2">
                  Records Per Page
                </label>
                <button
                  className="w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm"
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
                      {options.map((opt, i) => (
                        <li
                          key={i}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleOptionClick(opt.value)}
                        >
                          {opt.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <p className="text-center py-4">Loading...</p>
            ) : (
              <div className=" rounded-b-lg overflow-hidden bg-white shadow-md">
                <table className="rounded-b-lg  w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                    <tr>
                      <th className="border p-2">Select</th>
                      <th className="border p-2">Scrutiny Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-center uppercase">
                    {currentRecords.length > 0 ? (
                      currentRecords.map((rule) => (
                        <tr
                          key={rule.scrutinyrulesId}
                          className="bg-white hover:bg-gray-50"
                        >
                          <td className="border p-2">
                            <input
                              type="checkbox"
                              checked={selectedRules.has(rule.scrutinyrulesId)}
                              onChange={() =>
                                toggleSelection(rule.scrutinyrulesId)
                              }
                            />
                          </td>
                          <td className="border p-2">
                            {rule.scrutinyDescription || "No description"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center p-4">
                          No scrutiny rules found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {scrutinyRules.length > 0 && (
              <div className="flex justify-end px-2 items-center space-x-2 m-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-cyan-500 text-white hover:bg-cyan-700"
                  }`}
                >
                  Prev
                </button>
                {getPageNumbers().map((page, i) =>
                  page === "..." ? (
                    <span key={i} className="px-3 py-2">
                      ...
                    </span>
                  ) : (
                    <button
                      key={i}
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
            <div className="w-full h-auto flex justify-end">
              <div className="w-1/2 h-auto flex justify-end">
                <button
                  onClick={addTemplate}
                  className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrutinyTemplate;
