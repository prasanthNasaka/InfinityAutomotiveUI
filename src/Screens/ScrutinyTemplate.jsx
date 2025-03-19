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
  const [recordsPerPage] = useState(10); // Keep same pagination
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

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
      const updatedSelection = new Set(prev);
      updatedSelection.has(id)
        ? updatedSelection.delete(id)
        : updatedSelection.add(id);
      return updatedSelection;
    });
  };

  const addTemplate = async () => {
    if (!newTemplate.trim()) {
      toast.error("Template name cannot be empty.");
      return;
    }

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

  return (
    <section className="w-full h-screen flex flex-col">
      <Toaster position="bottom-center" />
      <Newheader />
      <div className="flex h-[calc(100vh-1rem)] overflow-hidden">
        <MainSideBar />
        <div className="flex-1 p-2 overflow-y-auto">
          <div className="max-w-full mx-auto">
            <form className="bg-white mb-6">
              <h2 className="ml-2 text-2xl font-semibold text-gray-900">
                Template
              </h2>

              <div className="flex mt-4 w-1/2 flex-col rounded-lg  p-2">
                <label className="text-sm font-semibold mb-1">
                  Choose a Template
                </label>
                <select
                  value={selectedTemplate}
                  onChange={handleTemplateChange}
                  className="w-4/5 p-2 border rounded-lg focus:ring-cyan-400"
                >
                  <option value="">Default</option>
                  {templates.map((template, index) => (
                    <option key={index} value={template}>
                      {template}
                    </option>
                  ))}
                </select>

                <label className="text-sm font-bold mb-1 mt-4">
                  Enter a new template
                </label>
                <input
                  type="text"
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value)}
                  placeholder="Enter template"
                  className="p-2 border rounded w-4/5"
                />

                <label className="text-sm font-bold mb-1 mt-4">
                  Enter a new Scrutiny Rule
                </label>
                <input
                  type="text"
                  className="w-4/5 p-2 border rounded"
                  placeholder="Enter Scrutiny Rule"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                />

                <button
                  type="button"
                  onClick={addRule}
                  className="px-6 py-2 bg-cyan-600 text-white rounded mt-4 w-fit "
                >
                  Add
                </button>
              </div>
            </form>

            <h3 className="text-2xl font-bold p-2 border bg-gray-50">
              List Of Scrutiny Rules
            </h3>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full text-sm text-gray-700 border-collapse">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
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
                            checked={selectedRules.has(rule.scrutinyrulesId)}
                            onChange={() =>
                              toggleSelection(rule.scrutinyrulesId)
                            }
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
            )}

            {/* Pagination */}
            <div className="mt-4 flex justify-between">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Next
              </button>
            </div>

            <button
              onClick={addTemplate}
              className="px-6 py-3 bg-cyan-600 text-white rounded mt-5"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrutinyTemplate;
