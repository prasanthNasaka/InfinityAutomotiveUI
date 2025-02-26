/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Scrutinys() {
  const [answers, setAnswers] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [reasonInput, setReasonInput] = useState("");
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [tableData, setTableData] = useState({});
  const [selectedEvent, setSelectedEvent] = useState("");
  const [scrutinyRules, setScrutinyRules] = useState([]);

  const handleGetData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/EventRegistration/names`
      );
      setEvents(response.data.$values);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch event names. No Data Found.");
    }
  };

  const handleEventChange = (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);

    if (eventId) {
      fetch(`${BASE_URL}/api/Registration/event/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.$values)) {
            setTableData(data.$values);
            toast.success("Data fetched successfully.");
            if (data.$values.length === 0) {
              toast.warning("No data found for the selected event.");
            }
          } else {
            console.error("Expected an array of events, but received:", data);
            setTableData([]);
            toast.error("Invalid data format received from the server.");
          }
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
          toast.error("Failed to fetch event details. Please try again.");
        });
    } else {
      setTableData([]);
    }
  };

  const handleCheckList = (eventData) => {
    const scrutinyApiUrl = `${BASE_URL}/api/Scrutiny?RegId=${eventData.regId}`;
    fetch(scrutinyApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.$values) {
          setScrutinyRules(data.$values);
          const initialAnswers = {};
          data.$values.forEach((rule) => {
            initialAnswers[rule.scrutineyruleId] = {
              value: rule.status === 1,
              reason: rule.comment || null,
            };
          });
          setAnswers(initialAnswers);
        } else {
          toast.error("No scrutiny rules found for this event.");
        }
      })
      .catch((error) => {
        console.error("Error fetching scrutiny data:", error);
        toast.error("Failed to fetch scrutiny rules. Please try again.");
      });
  };

  const handleReportSubmit = async () => {
    const scrutinyData = Object.keys(answers).map((ruleId) => {
      const answer = answers[ruleId];
      let status = 15;

      if (answer.value === true) {
        status = 16;
      } else if (answer.value === false) {
        status = 17;
      } else if (answer.value === null) {
        status = 18;
      }

      return {
        scrutineydetailsId: 0,
        scrutineyruleId: parseInt(ruleId, 10),
        scrutineyrule: scrutinyRules.find(
          (rule) => rule.scrutineyruleId === parseInt(ruleId, 10)
        ).scrutineyrule,
        status: status,
        comment: answer.comment || "",
        regId: selectedEvent,
      };
    });

    try {
      const response = await axios.put(
        `${BASE_URL}/api/Scrutiny`,
        scrutinyData
      );
      console.log("Report submitted successfully:", response.data);

      // Show success toast
      toast.success("Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);

      // Show error toast
      toast.error("Error submitting report. Please try again.");
    }
  };
  const handleAnswerChange = (ruleId, value, comment = "") => {
    setAnswers((prev) => ({
      ...prev,
      [ruleId]: { value, comment },
    }));
  };

  const handleReasonSubmit = (ruleId, e) => {
    e.preventDefault();

    if (!reasonInput.trim()) {
      setError("Reason is required!");
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [ruleId]: { value: false, comment: reasonInput.trim() },
    }));

    setReasonInput("");
    setSelectedQuestion(null);
    setError("");
  };

  useEffect(() => {
    handleGetData();
    if (selectedEvent) {
      handleEventChange({ target: { value: selectedEvent } });
    }
  }, [selectedEvent]);

  const renderHeader = () => (
    <div className="bg-cyan-600 text-white py-4 px-4 w-full">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Technical Scrutiny Checklist</h1>
          <Link
            to="/dashboard"
            className="w-32 flex items-center gap-2 p-2 border text-center hover:bg-white hover:text-black transform ease-in-out duration-1000 rounded-md"
          >
            <IoMdArrowRoundBack className="w-6 h-6" />
            Dashboard
          </Link>
        </div>
        <div className="w-full flex p-2 gap-2 tab:flex-col">
          <div className="w-1/2 tab:w-full">
            <label className="text-sm font-medium text-white">Event Name</label>
            <select
              value={selectedEvent}
              onChange={handleEventChange}
              className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
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
      </div>
    </div>
  );

  const renderTable = () => (
    <div className="mt-6 h-auto m-auto flex flex-col items-center justify-center">
      {!selectedEvent ? (
        <div className="w-3/4 h-20 shadow-lg flex justify-center items-center rounded-lg">
          <p className="font-bold text-center text-xl animate-bounce">
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
                      <th className="px-6 py-3">SL.No</th>
                      <th className="px-6 py-3">Event name</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Contestant Number</th>
                      <th className="px-6 py-3">Payment Status</th>
                      <th className="px-6 py-3">Documents</th>
                      <th className="px-6 py-3">Scrutiny</th>
                      <th className="px-6 py-3">Vehicle</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-center uppercase">
                    {tableData.map((event, index) => (
                      <tr
                        key={event.eventid}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="px-6 py-2 font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-2 text-gray-900">
                          {event.eventname}
                        </td>
                        <td className="px-6 py-2">{event.evtCategory}</td>
                        <td className="px-6 py-2">{event.contestantNo}</td>
                        <td className="px-6 py-2">
                          <span
                            className={`p-2 rounded-full text-xs ${
                              event.amountPaid
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {event.amountPaid ? "Paid" : "Pending"}
                          </span>
                        </td>
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
                              event.scrutinyStatus === "0"
                                ? "bg-yellow-100 text-yellow-800"
                                : event.scrutinyStatus === "1"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {event.scrutinyStatus === "0"
                              ? "Pending"
                              : event.scrutinyStatus === "1"
                              ? "Verified"
                              : "Rejected"}
                          </span>
                        </td>
                        <td className="px-6 py-2">{event.regNumb}</td>
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
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white w-full p-4 rounded-lg shadow-sm mt-2">
          <h2 className="text-xl font-semibold mb-4">Scrutiny Rules</h2>
          {scrutinyRules.map((rule) => (
            <div key={rule.scrutineyruleId} className="mb-4 p-2 border rounded">
              <div className="flex items-center w-full gap-3 justify-between">
                <div className="w-1/2">
                  <span className="text-gray-700">{rule.scrutineyrule}</span>
                </div>
                <div className="bg-white rounded w-1/2 items-center justify-between gap-3 flex">
                  <div className="w-2/3">
                    <form
                      onSubmit={(e) =>
                        handleReasonSubmit(rule.scrutineyruleId, e)
                      }
                    >
                      <input
                        type="text"
                        value={answers[rule.scrutineyruleId]?.comment || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [rule.scrutineyruleId]: {
                              ...prev[rule.scrutineyruleId],
                              comment: e.target.value,
                            },
                          }))
                        }
                        className="w-full p-3 border border-gray-300 rounded"
                        placeholder="Comments"
                      />

                      {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                      )}
                    </form>
                  </div>

                  <div className="w-1/3 justify-evenly flex space-x-3">
                    <button
                      onClick={() =>
                        handleAnswerChange(rule.scrutineyruleId, true)
                      }
                      className={`p-2 rounded ${
                        answers[rule.scrutineyruleId]?.value === true
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <CheckCircle2 size={20} />
                    </button>

                    <button
                      onClick={() =>
                        handleAnswerChange(rule.scrutineyruleId, false)
                      }
                      className={`p-2 rounded ${
                        answers[rule.scrutineyruleId]?.value === false
                          ? "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <AlertCircle size={20} />
                    </button>

                    <button
                      className={`p-2 rounded ${
                        answers[rule.scrutineyruleId]?.value === null
                          ? "bg-yellow-400 text-black"
                          : "bg-gray-200"
                      }`}
                      onClick={() =>
                        handleAnswerChange(rule.scrutineyruleId, null)
                      }
                    >
                      N/A
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex w-full justify-end font-bold text-lg">
            <button
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded"
              onClick={() => handleReportSubmit()}
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
