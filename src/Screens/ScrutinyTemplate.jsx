import Newheader from "../Components/Newheader";
import MainSideBar from "../Components/MainSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/global-const";

const ScrutinyTemplate = () => {
  const [scrutinyRules, setScrutinyRules] = useState([]);
  const [newTemplate, setNewTemplate] = useState("");
  const [newRule, setNewRule] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchScrutinyRules = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/Scrutiny/Template`);
      console.log("API Response:", response.data);

      if (
        response.data &&
        response.data.$values &&
        Array.isArray(response.data.$values)
      ) {
        setScrutinyRules(response.data.$values);
      } else {
        setScrutinyRules([]);
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching scrutiny rules:", error);
      setError("Failed to fetch scrutiny rules.");
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
    setNewTemplate("");
    setNewRule("");
  };

  useEffect(() => {
    fetchScrutinyRules();
  }, []);
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
            <h2 className="text-3xl font-bold mb-6 text-center">Template</h2>

            <div className="flex w-full">
              <div className="mb-4 w-1/2">
                <label className="block text-sm font-bold mb-1">
                  Enter a new template
                </label>
                <input
                  type="text"
                  className="w-4/5 p-2 border rounded"
                  placeholder="Enter template"
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value)}
                  required
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
                <table className="w-full border-collapse border border-gray-300">
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
                              value={rule.scrutinyrulesId}
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
