import  { useEffect, useState } from "react";
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
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [selectedRules, setSelectedRules] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalPages = Math.ceil(scrutinyRules.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = scrutinyRules.slice(startIndex, endIndex);

  const handleOptionClick = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1); // Reset to the first page whenever records per page changes
    setIsDropdownOpen(false);
  };

  const fetchScrutinyRules = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(
        `${BASE_URL}/api/Scrutiny/DefaultTemplate`
      );

      if (response.data && Array.isArray(response.data)) {
        setScrutinyRules(response.data);
      } else {
        setScrutinyRules([]);
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching scrutiny rules:", error);
      toast.error("Failed to fetch scrutiny rules.");
    } finally {
      setLoading(false);
    }
  };

  const AddRule = () => {
    const newScrutinyRule = {
      scrutinyrulesId: scrutinyRules.length + 1,
      template: newTemplate,
      scrutinyDescription: newRule,
    };
    setScrutinyRules([...scrutinyRules, newScrutinyRule]);

    setSelectedRules((prev) =>
      new Set(prev).add(newScrutinyRule.scrutinyrulesId)
    );

    setNewRule("");
  };

  const toggleSelection = (id) => {
    setSelectedRules((prev) => {
      const updatedSelection = new Set(prev);
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id);
      } else {
        updatedSelection.add(id);
      }
      return updatedSelection;
    });
  };

  const addTemplate = async () => {
    try {
      const selectedScrutinyRules = Array.from(selectedRules)
        .map((ruleId) => {
          const rule = scrutinyRules.find((r) => r.scrutinyrulesId === ruleId);
          return rule ? rule.scrutinyDescription : null;
        })
        .filter(Boolean);

      const requestBody = {
        template: newTemplate,
        scrutineyrule: selectedScrutinyRules,
      };

      const response = await AxiosInstance.post(
        `${BASE_URL}/api/Scrutiny/Template`,
        requestBody
      );

      console.log("Added Template Response:", response.data);
      toast.success("Template Added Successfully");
      fetchScrutinyRules();
      setNewTemplate("");
      setSelectedRules(new Set());
    } catch (error) {
      console.error("Error adding scrutiny template:", error);
      toast.error("Failed to add scrutiny template.");
    }
  };

  const options = [
    { value: 5, label: "5 per page" },
    { value: 10, label: "10 per page" },
    { value: 15, label: "15 per page" },
    { value: 20, label: "20 per page" },
  ];

  useEffect(() => {
    fetchScrutinyRules();
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
          <div className="max-w-full mx-auto">
            <form className="bg-white mb-6 ">
              <div className="w-full p-2 flex">
                <h2
                  style={Styles.heading}
                  className="ml-2 text-2xl font-semibold text-center text-gray-900"
                >
                  Template
                </h2>
              </div>

              <div className="flex mt-4 w-full flex-col  rounded-lg border p-2">
                <div className="w-full h-auto gap-2 flex">
                  <div className="mb-4 w-1/2">
                    <label
                      style={Styles.label}
                      className="block text-sm font-bold mb-1"
                    >
                      Enter a new template
                    </label>
                    <input
                      style={Styles.select}
                      type="text"
                      value={newTemplate}
                      onChange={(e) => setNewTemplate(e.target.value)}
                      placeholder="Enter template"
                      className="p-2 w-4/5 border rounded"
                    />
                  </div>
                  <div className="mb-4 w-1/2">
                    <label
                      style={Styles.label}
                      className="block text-sm font-bold mb-1"
                    >
                      Enter a new Scrutiny Rule
                    </label>
                    <input
                      style={Styles.select}
                      type="text"
                      className="w-4/5 p-2 border rounded"
                      placeholder="Enter Scrutiny Rule"
                      value={newRule}
                      onChange={(e) => setNewRule(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="w-full h-auto flex justify-center items-center">
                  <button
                    type="button"
                    onClick={AddRule}
                    className="px-6 py-2 bg-cyan-600 text-white rounded ml-3"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>

            <div className="flex w-full p-1 h-auto overflow-auto">
              <div className="w-full">
                <div className="w-full h-auto rounded-t-lg p-2 flex justify-center items-center border bg-gray-50 border-b">
                  <h3
                    style={Styles.tableheading}
                    className="text-2xl font-bold "
                  >
                    List Of Scrutiny Rules
                  </h3>
                </div>
                <div className="w-full p-2 flex  border relative justify-end items-center ">
                  <label
                    htmlFor="pageType-select"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Page Type
                  </label>
                  <button
                    id="pageType-select"
                    className="w-1/6 rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    <div className="absolute mt-1 top-12 w-1/2 rounded-md bg-white shadow-lg">
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
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-700 border-collapse">
                      <thead className="bg-gray-50 text-gray-600">
                        <tr style={Styles.label}>
                          <th className="border p-2">Select</th>
                          <th className="border p-2">Scrutiny Rule</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRecords.length > 0 ? (
                          currentRecords.map((rule) => (
                            <tr key={rule.scrutinyrulesId}>
                              <td className="border p-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedRules.has(
                                    rule.scrutinyrulesId
                                  )}
                                  onChange={() =>
                                    toggleSelection(rule.scrutinyrulesId)
                                  }
                                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-blue-500 hover:cursor-pointer accent-cyan-600"
                                />
                              </td>
                              <td className="border p-2 text-center">
                                {rule.scrutinyDescription ||
                                  "No description available"}
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
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-cyan-500 text-white hover:bg-cyan-700"
                      }`}
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-md ${
                          currentPage === page ? "bg-cyan-700 text-white" : "bg-gray-200 hover:bg-gray-400"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-cyan-500 text-white hover:bg-cyan-700"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
                <div className="flex justify-end w-full mt-5">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-cyan-600 text-white rounded"
                    onClick={addTemplate}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrutinyTemplate;