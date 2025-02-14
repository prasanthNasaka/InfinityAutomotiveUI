/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  X as CloseIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const Toast = ({ type, message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          iconClass: "text-green-500 bg-green-100",
        };
      case "error":
        return {
          icon: <XCircle className="w-5 h-5" />,
          iconClass: "text-red-500 bg-red-100",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          iconClass: "text-orange-500 bg-orange-100",
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm">
        <div
          className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${styles.iconClass}`}
        >
          {styles.icon}
        </div>
        <div className="ms-3 text-sm font-normal">{message}</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          onClick={onClose}
        >
          <CloseIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
