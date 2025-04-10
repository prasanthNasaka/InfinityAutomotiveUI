import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/global-const";
import toast, { Toaster } from "react-hot-toast";
import AxiosInstance from "./AxiosInstance";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.post(
        `${BASE_URL}/api/UserInfo/ChangePassword`,
        {
          username,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(" Password updated:", response.data);
      navigate(-1);
    } catch (error) {
      console.error(
        "❌ Error updating password:",
        error.response?.data || error.message
      );
      toast.error("Failed to update password.");
    }
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 h-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-cyan-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border px-3 py-2 pr-10 rounded outline-none focus:ring-2 focus:ring-cyan-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
