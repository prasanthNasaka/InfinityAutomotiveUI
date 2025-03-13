/* eslint-disable no-unused-vars */
import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/global-const";
import AxiosInstance from "../Components/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

const ScrutinyTemplate = () => {
  const [scrutinyRules, setScrutinyRules] = useState([]);
  const [newTemplate, setNewTemplate] = useState("");
  const [newRule, setNewRule] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRules, setSelectedRules] = useState(new Set());

  const fetchScrutinyRules = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(
        `${BASE_URL}/api/Scrutiny/DefaultTemplate`
      );

      if (response.data && response.data && Array.isArray(response.data)) {
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
  useEffect(() => {
    fetchScrutinyRules();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="h-24 w-full shadow-md p-1">
        <Newheader />
      </div>

      <div className="flex h-[calc(100vh-6rem)]">
        <div className="bg-gray-100">
          <MainSideBar />
        </div>
        <div className="flex w-full p-8 h-auto flex-col">
          <form className="w-full mx-auto p-3 rounded-md shadow-lg h-fit">
            <h2 className="text-3xl font-bold mb-6 text-center">Template</h2>

            <div className="flex w-full">
              <div className="mb-4 w-1/2">
                <label className="block text-sm font-bold mb-1">
                  Enter a new template
                </label>
                <input
                  type="text"
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value)}
                  placeholder="Enter template"
                  className="p-2 w-4/5 border rounded"
                />
              </div>
              <div className="mb-4 w-1/2">
                <label className="block text-sm font-bold mb-1">
                  Enter a new Scrutiny Rule
                </label>
                <input
                  type="text"
                  className="w-4/5 p-2 border rounded"
                  placeholder="Enter Scrutiny Rule"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={AddRule}
                  className="px-4 py-2 bg-cyan-600 text-white rounded ml-3"
                >
                  Add
                </button>
              </div>
            </div>
          </form>

          <div className="flex w-full p-8 h-auto overflow-auto">
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-4">
                List Of Scrutiny Rules
              </h3>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <table className="w-full border-collapse border border-gray-300 mt-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Select</th>
                      <th className="border p-2">Scrutiny Rule</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scrutinyRules.length > 0 ? (
                      scrutinyRules.map((rule) => (
                        <tr key={rule.scrutinyrulesId}>
                          <td className="border p-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedRules.has(rule.scrutinyrulesId)}
                              onChange={() =>
                                toggleSelection(
                                  rule.scrutinyrulesId,
                                  rule.scrutinyDescription
                                )
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
    </>
  );
};

export default ScrutinyTemplate;
