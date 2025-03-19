const Styles = {
  fontFamily: "Poppins, sans-serif",
  headingFont: "Playfair Display, serif",
  textColor: "#1F2937", // Gray-900
  labelColor: "#374151", // Gray-700
  inputBg: "#F3F4F6", // Gray-100
  borderColor: "#D1D5DB", // Gray-300
  buttonBg: "#2563EB", // Blue-600
  buttonHoverBg: "#1E40AF", // Blue-700

  tableheading: {
    fontFamily: "Poppins, sans-serif",
    color: "#1A1A1A",
    fontSize: "1.4rem",
    fontWeight: "700",
  },

  heading: {
    fontFamily: "Poppins, sans-serif",
    color: "#1A1A1A",
    fontSize: "1.9rem",
    fontWeight: "bold",
  },

//   input: {
//     backgroundColor: "#F9FAFB", // Light gray background
//     padding: "10px",
//     borderRadius: "8px",
//     color: "#000000", // Black text
//  },

  select: {
    width: "100%",
    height: "40px",
    backgroundColor: "#F9FAFB", // Light gray background
    border: "1px solid #D1D5DB", // Gray border
    color: "#000000", 
    fontSize: "14px",
    borderRadius: "8px",
    padding: "10px",
    outline: "none",
    transition: "all 0.2s ease-in-out",

    // Disabled state
    ":disabled": {
      backgroundColor: "#E5E7EB",
      cursor: "not-allowed",
      opacity: "0.6",
    },
  },


  side: {
    fontFamily: "Poppins, sans-serif",
    // fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: "1.1rem",
  },

  label: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    fontWeight: "400",
    color: "#374151",
  },

  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    backgroundColor: "#F9FAFB",
    border: "1px solid #D1D5DB",
    outline: "none",
  },

  description: {
    fontFamily: "Poppins, sans-serif",
    color: "#1A1A1A"
  },

  button: {
    padding: "12px 24px",
    backgroundColor: "#2563EB",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s",
  },

  buttonHover: {
    backgroundColor: "#1E40AF",
  },
};


export default Styles