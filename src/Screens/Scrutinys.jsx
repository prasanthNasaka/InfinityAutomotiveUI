/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BASE_URL } from "../constants/global-const";
import axios from "axios";

const Scrutinys = () => {
  const [vehicleType, setVehicleType] = useState("car");
  const [expandedCategory, setExpandedCategory] = useState("safety");
  const [answers, setAnswers] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [reasonInput, setReasonInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");

  const questions = [
    {
      id: 1,
      text: "Roll cage/Safety cell meets regulations",
      category: "safety",
      applicable: ["car"],
    },
    {
      id: 2,
      text: "Fire extinguisher system properly mounted",
      category: "safety",
      applicable: ["car", "bike"],
    },
    {
      id: 3,
      text: "Safety harness/belts in good condition",
      category: "safety",
      applicable: ["car"],
    },
    {
      id: 4,
      text: "Helmet meets current safety standards",
      category: "safety",
      applicable: ["car", "bike"],
    },
    {
      id: 5,
      text: "Racing suit compliant with regulations",
      category: "safety",
      applicable: ["car", "bike"],
    },
    {
      id: 6,
      text: "Engine displacement verified",
      category: "technical",
      applicable: ["car", "bike"],
    },
    {
      id: 7,
      text: "Fuel system properly sealed",
      category: "technical",
      applicable: ["car", "bike"],
    },
    {
      id: 8,
      text: "Brake system functioning correctly",
      category: "technical",
      applicable: ["car", "bike"],
    },
    {
      id: 9,
      text: "Tire specifications meet requirements",
      category: "technical",
      applicable: ["car", "bike"],
    },
    {
      id: 10,
      text: "ECU mapping complies with regulations",
      category: "electronics",
      applicable: ["car", "bike"],
    },
    {
      id: 11,
      text: "Data logging system sealed",
      category: "electronics",
      applicable: ["car", "bike"],
    },
    {
      id: 12,
      text: "Kill switch functioning properly",
      category: "electronics",
      applicable: ["car", "bike"],
    },
  ];

  const handleGetData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/EventRegistration`);
      console.log("Response Data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEventChange = (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    if (eventId) {
      fetch(`${BASE_URL}/api/EventRegistration?event_id=${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Event Registrations:", data);
        })
        .catch((error) => {
          console.error("Error fetching event registrations:", error);
        });

      fetch(`${BASE_URL}/api/Registration/event/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.$values)) {
            setEvents(data.$values);
          } else {
            console.error("Expected an array of events, but received:", data);
            setEvents([]);
          }
        })
        .catch((error) => console.error("Error fetching events:", error));
    } else {
      setEvents([]);
    }
  };

  const categories = Array.from(new Set(questions.map((q) => q.category)));

  const handleAnswerChange = (questionId, value) => {
    if (value === false) {
      setSelectedQuestion(questionId);
      setReasonInput("");
      setShowModal(true);
      setError("");
    } else {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: { value, reason: null },
      }));
    }
  };

  const handleReasonSubmit = (e) => {
    e.preventDefault();

    if (!reasonInput.trim()) {
      setError("Reason is required!");
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [selectedQuestion]: { value: false, reason: reasonInput.trim() },
    }));

    setShowModal(false);
    setReasonInput("");
    setSelectedQuestion(null);
    setError("");
  };

  const handleCancel = () => {
    setShowModal(false);
    setReasonInput("");
    setError("");
  };

  const getProgress = () => {
    const applicableQuestions = questions.filter((q) =>
      q.applicable.includes(vehicleType)
    );
    const totalQuestions = applicableQuestions.length;

    if (totalQuestions === 0) return { passed: 0, failed: 0, total: 0 };

    let passedQuestions = applicableQuestions.filter(
      (q) => answers[q.id]?.value === true
    ).length;
    let failedQuestions = applicableQuestions.filter(
      (q) => answers[q.id]?.value === false
    ).length;

    return {
      passed: (passedQuestions / totalQuestions) * 100,
      failed: (failedQuestions / totalQuestions) * 100,
      total: ((passedQuestions + failedQuestions) / totalQuestions) * 100,
    };
  };

  const progress = getProgress();

  useEffect(() => {
    handleGetData();
    if (selectedEvent) {
      handleEventChange({ target: { value: selectedEvent } });
    }
  }, [selectedEvent]);

  return (
    <>
      <section className="w-full h-auto">
        <div className="min-h-screen bg-gray-50">
          <div className="bg-cyan-600 text-white py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                  Technical Scrutiny Checklist
                </h1>
                <Link
                  to={"/dashboard"}
                  className="w-32 flex items-center gap-2 p-2 border text-center hover:bg-white hover:text-black transform ease-in-out duration-1000 rounded-md"
                >
                  <IoMdArrowRoundBack className="w-full h-full flex items-center" />
                  Dashboard
                </Link>
              </div>
              <div className="w-full flex p-2 gap-2 tab:flex-col">
                <div className="w-1/2 tab:w-full">
                  <label className="text-sm font-medium text-gray-900">
                    Event Name
                  </label>
                  <select
                    value={selectedEvent}
                    onChange={handleEventChange}
                    className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  >
                    <option value="">Choose Event</option>
                    {Array.isArray(events) &&
                      events.map((event) => (
                        <option key={event.eventid} value={event.eventid}>
                          {event.eventname}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Inspection Progress
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Total: {Math.round(progress.total)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div
                    className="h-full bg-green-300 transition-all duration-300"
                    style={{ width: `${progress.passed}%` }}
                  ></div>
                  <div
                    className="h-full bg-red-300 transition-all duration-300"
                    style={{ width: `${progress.failed}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            {categories.map((category) => (
              <div key={category} className="mb-4">
                <button
                  onClick={() => setExpandedCategory(category)}
                  className="w-full bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="text-lg font-medium capitalize">
                    {category}
                  </span>
                  <ChevronDown
                    className={`transform transition-transform ${
                      expandedCategory === category ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedCategory === category &&
                  questions
                    .filter(
                      (q) =>
                        q.category === category &&
                        q.applicable.includes(vehicleType)
                    )
                    .map((question) => (
                      <div
                        key={question.id}
                        className="bg-white p-4 rounded-lg shadow-sm mt-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">{question.text}</span>
                          <div className="flex space-x-4 ml-4">
                            <button
                              onClick={() =>
                                handleAnswerChange(question.id, true)
                              }
                              className={`p-2 rounded ${
                                answers[question.id]?.value === true
                                  ? "bg-green-300 text-white"
                                  : "bg-gray-200"
                              }`}
                            >
                              <CheckCircle2 size={20} />
                            </button>
                            <button
                              onClick={() =>
                                handleAnswerChange(question.id, false)
                              }
                              className={`p-2 rounded ${
                                answers[question.id]?.value === false
                                  ? "bg-red-300 text-white"
                                  : "bg-gray-200"
                              }`}
                            >
                              <AlertCircle size={20} />
                            </button>
                          </div>
                        </div>
                        {answers[question.id]?.value === false &&
                          answers[question.id]?.reason && (
                            <p className="text-red-500 mt-2 text-sm">
                              Reason for Rejection:{" "}
                              {answers[question.id].reason}
                            </p>
                          )}

                        {showModal && (
                          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                            <div className="bg-white p-4 rounded w-96">
                              <h2 className="text-lg font-semibold">
                                Provide a reason
                              </h2>
                              <form onSubmit={handleReasonSubmit}>
                                <input
                                  type="text"
                                  value={reasonInput}
                                  onChange={(e) =>
                                    setReasonInput(e.target.value)
                                  }
                                  className="border p-2 w-full mt-2"
                                  placeholder="Enter reason"
                                />
                                {error && (
                                  <p className="text-red-300 text-sm mt-1">
                                    {error}
                                  </p>
                                )}
                                <div className="flex justify-end space-x-2 mt-4">
                                  <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="p-2 bg-gray-300 rounded hover:bg-gray-400 hover:text-white transform duration-500 ease-out"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transform duration-500 ease-out"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Scrutinys;
