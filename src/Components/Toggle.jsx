import  { useRef } from "react";

// eslint-disable-next-line react/prop-types
const SwipeToggle = ({ isActive, onToggle }) => {
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX; // Get the initial touch position
  };

  const handleTouchEnd = (e) => {
    touchEndRef.current = e.changedTouches[0].clientX; // Get the final touch position
    handleSwipe(); // Call swipe detection
  };

  const handleSwipe = () => {
    const swipeDistance = touchEndRef.current - touchStartRef.current;
    if (swipeDistance > 50) {
      onToggle(false); // Swipe right: inactive
    } else if (swipeDistance < -50) {
      onToggle(true); // Swipe left: active
    }
  };

  const handleClick = () => {
    onToggle(!isActive); // Toggle state on click
  };

  return (
    <div
      className={`flex items-center justify-center cursor-pointer`} 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick} 
    >
      <div
        className={`w-10 h-6 rounded-full flex items-center p-1 transition-all duration-300 ${
          isActive ? "bg-cyan-500" : "bg-black"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white hover:bg-cyan-500 shadow-md transition-transform duration-300 ${
            isActive ? "transform translate-x-4" : ""
          }`} 
        />
      </div>
      {/* <p className="ml-4 text-lg">{isActive ? "Active" : "Inactive"}</p> */}
    </div>
  );
};

export default SwipeToggle;
