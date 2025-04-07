import axios from "axios";
import { BASE_URL } from "../constants/global-const";
import { useState } from "react";

const VehiclePdfDownloader = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!vehicleId.trim()) {
      alert("Please enter a Vehicle ID");
      return;
    }

    setLoading(true);
    setVehicleId("");

    try {
      const response = await axios.get(
        `${BASE_URL}/api/VehicleDownload/download-pdf/${vehicleId}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `vehicle-${vehicleId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Download Vehicle PDF
      </h2>

      <input
        type="text"
        placeholder="Enter Vehicle ID"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleDownload}
        disabled={loading}
        className={`w-full py-2 px-4 text-white rounded-md transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Downloading..." : "Download PDF"}
      </button>
    </div>
  );
};

export default VehiclePdfDownloader;
