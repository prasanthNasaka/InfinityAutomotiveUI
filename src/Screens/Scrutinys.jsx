/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../constants/global-const";
import toast, { Toaster } from "react-hot-toast";
import AxiosInstance from "../Components/AxiosInstance";
import Styles from "../constants/Styles";

function Scrutinys() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectdregId, setSelectdRegId] = useState("");
  const [scrutinyRules, setScrutinyRules] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    setIsLoggedOut(true);
    navigate("/login");
  };

  const handleGetData = async () => {
    try {
      const response = await AxiosInstance.get(
        `${BASE_URL}/api/EventRegistration/ActiveEvents`
      );
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to fetch event names. No Data Found.");
    }
  };

  const handleEventChange = async (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);

    if (eventId) {
      try {
        const response = await AxiosInstance.get(
          `${BASE_URL}/api/Registration/event/${eventId}`
        );
        const data = response.data;
        if (Array.isArray(data)) {
          setTableData(data);
          toast.success("Data fetched successfully.");
          if (data.length === 0) {
            toast.warning("No data found for the selected event.");
          }
        } else {
          setTableData([]);
          toast.error("Invalid data format received from the server.");
        }
      } catch (error) {
        setScrutinyRules([]);
        setTableData([]);
        console.error("Error fetching events:", error);
        toast.error("No registrations found for the specified event.");
      }
    } else {
      setTableData([]);
    }
  };

  const handleCheckList = async (eventData) => {
    try {
      const response = await AxiosInstance.get(
        `${BASE_URL}/api/Scrutiny?RegId=${eventData.regId}`
      );
      const data = response.data;
      console.log("Fetched scrutiny data:", data);

      if (data) {
        setScrutinyRules(data);

        setAnswers((prevAnswers) => {
          const updatedAnswers = { ...prevAnswers };
          data.forEach((rule) => {
            updatedAnswers[rule.scrutineyruleId] = {
              value: rule.status ?? prevAnswers[rule.scrutineyruleId]?.value,
              reason:
                rule.comment || prevAnswers[rule.scrutineyruleId]?.reason || "",
            };
          });
          return updatedAnswers;
        });

        setSelectdRegId(eventData.regId);
      } else {
        toast.error("No scrutiny rules found for this event.");
      }
    } catch (error) {
      console.error("Error fetching scrutiny data:", error);
      toast.error("Failed to fetch scrutiny rules. Please try again.");
    }
  };

  const handleAnswerChange = (ruleId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [ruleId]: {
        ...prev[ruleId],
        value,
      },
    }));
  };

  const handleReportSubmit = async () => {
    const scrutinyData = Object.keys(answers).map((ruleId) => {
      const answer = answers[ruleId];

      return {
        scrutineydetailsId: 0,
        scrutineyruleId: parseInt(ruleId, 10),
        scrutineyrule: scrutinyRules.find(
          (rule) => rule.scrutineyruleId === parseInt(ruleId, 10)
        ).scrutineyrule,
        status: answer.value,
        comment: answer.reason || "",
        regId: selectdregId,
      };
    });

    try {
      await AxiosInstance.put(`${BASE_URL}/api/Scrutiny`, scrutinyData);
      toast.success("Report submitted successfully!");
      setScrutinyRules([]);
      setAnswers({});
      setSelectedEvent("");
      setSelectdRegId("");
    } catch (error) {
      toast.error("Error submitting report. Please try again.");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const renderHeader = () => (
    <>
      <div className="bg-cyan-600 text-white py-4 px-4 w-full">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-poppins font-bold">
              Technical Scrutiny Checklist
            </h1>
            <button
              onClick={logOutHandler}
              className="w-fit text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex p-2 gap-2 tab:flex-col">
        <div className="w-1/3 tab:w-full mt-3 ">
          <label className="text-l font-bold text-black flex w-full pl-2 ">
            Event Name
          </label>
          <select
            value={selectedEvent}
            onChange={handleEventChange}
            className="w-full h-10 bg-gray-50 border border-l-2 text-gray-900 text-sm rounded-lg p-2 "
          >
            <option value="">Choose Event</option>
            {events.map((event) => (
              <option key={event.eventid} value={event.eventid}>
                {event.eventname}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );

  const renderTable = () => (
    <div className="mt-6 h-auto m-auto flex flex-col items-center justify-center">
      {!selectedEvent ? (
        <div className="w-3/4 h-20 shadow-lg flex justify-center items-center rounded-lg mt-10">
          <p className="font-bold text-center text-xl ">
            Please select the Event name to get the checklist.
          </p>
        </div>
      ) : (
        tableData.length > 0 && (
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="border rounded-lg overflow-hidden bg-white shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 text-center">
                    <tr>
                      <th className="px-6 py-3">Contestant Number</th>
                      <th className="px-6 py-3">Driver Name</th>
                      <th className="px-6 py-3">Vehicle</th>
                      <th className="px-6 py-3">Class</th>
                      <th className="px-6 py-3">Documents</th>
                      <th className="px-6 py-3">Scrutiny</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-center uppercase">
                    {tableData.map((event) => (
                      <tr
                        key={event.eventid}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="px-6 py-2">{event.contestantNo}</td>
                        <td className="px-6 py-2 text-gray-900">
                          {event.drivername}
                        </td>
                        <td className="px-6 py-2">{event.regNumb}</td>
                        <td className="px-6 py-2">{event.evtClass}</td>
                        <td className="px-6 py-2">
                          <span
                            className={`p-2 rounded-full text-xs ${
                              event.documentStatus === "0"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {event.documentStatus === "0"
                              ? "Pending"
                              : "Verified"}
                          </span>
                        </td>
                        <td className="px-6 py-2">
                          <span
                            className={`p-2 rounded-full text-xs ${
                              event.scrutinyStatus === 16
                                ? "bg-green-100 text-green-800"
                                : event.scrutinyStatus === 17
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {event.scrutinyStatus === 15
                              ? "Pending"
                              : event.scrutinyStatus === 16
                              ? "Verified"
                              : "Rejected"}
                          </span>
                        </td>
                        <td className="px-6 py-2">
                          <button
                            onClick={() => handleCheckList(event)}
                            className="text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-full text-sm px-5 py-2.5"
                          >
                            Get Check List
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );

  const renderScrutinyRules = () =>
    scrutinyRules.length > 0 && (
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 h-screen overflow-auto">
        <div className="bg-white w-full p-4 rounded-lg shadow-sm mt-2">
          <h2 className="text-xl font-semibold mb-4">Scrutiny Rules</h2>
          {scrutinyRules.map((rule) => {
            const status = answers[rule.scrutineyruleId]?.value;

            const colors = {
              16: "bg-green-500 text-white",
              17: "bg-red-500 text-white",
              18: "bg-yellow-400 text-black",
            };

            return (
              <div
                key={rule.scrutineyruleId}
                className="mb-4 p-2 border rounded"
              >
                <div className="flex items-center w-full gap-3 justify-between">
                  <div className="w-1/2">
                    <span className="text-gray-700">{rule.scrutineyrule}</span>
                  </div>
                  <div className="bg-white rounded w-1/2 items-center justify-between gap-3 flex">
                    <div className="w-2/3">
                      <input
                        type="text"
                        value={answers[rule.scrutineyruleId]?.reason || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [rule.scrutineyruleId]: {
                              ...prev[rule.scrutineyruleId],
                              reason: e.target.value,
                            },
                          }))
                        }
                        className="w-full p-3 border border-gray-300 rounded"
                        placeholder="Comments"
                      />
                    </div>
                    <div className="w-1/3 justify-evenly flex space-x-3">
                      <button
                        onClick={() =>
                          handleAnswerChange(rule.scrutineyruleId, 16)
                        }
                        className={`p-2 rounded ${
                          status === 16 ? colors[16] : "bg-gray-200"
                        }`}
                      >
                        <CheckCircle2 size={20} />
                      </button>

                      <button
                        onClick={() =>
                          handleAnswerChange(rule.scrutineyruleId, 17)
                        }
                        className={`p-2 rounded ${
                          status === 17 ? colors[17] : "bg-gray-200"
                        }`}
                      >
                        <AlertCircle size={20} />
                      </button>

                      <button
                        onClick={() =>
                          handleAnswerChange(rule.scrutineyruleId, 18)
                        }
                        className={`p-2 rounded ${
                          status === 18 ? colors[18] : "bg-gray-200"
                        }`}
                      >
                        N/A
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex w-full justify-end font-bold text-lg">
            <button
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded"
              onClick={handleReportSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <section className="w-full h-auto">
      <div className="min-h-screen bg-gray-50">
        <Toaster position="bottom-center" reverseOrder={false} />
        {renderHeader()}
        {renderTable()}
        {renderScrutinyRules()}
      </div>
    </section>
  );
}

export default Scrutinys;
