// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg relative w-4/5 max-w-2xl text-center shadow-lg">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 bg-none border-none text-lg cursor-pointer text-gray-800"
        >
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
