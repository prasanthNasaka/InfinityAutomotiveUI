import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [education, setEducation] = useState([""]);
  const [experience, setExperience] = useState([""]);

  const handleFileChange = (event, setFile) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = [...education];
    updatedEducation[index] = value;
    setEducation(updatedEducation);
  };

  const handleExperienceChange = (index, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = value;
    setExperience(updatedExperience);
  };

  const addEducationField = () => setEducation([...education, ""]);
  const addExperienceField = () => setExperience([...experience, ""]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);
    formData.append("resume", resume);
    formData.append("aadhar", aadhar);
    formData.append("education", JSON.stringify(education));
    formData.append("experience", JSON.stringify(experience));

    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded Successfully!");
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Resume Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setProfilePhoto)}
          required
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setResume)}
          required
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setAadhar)}
          required
        />

        <h3>Education</h3>
        {education.map((edu, index) => (
          <input
            key={index}
            type="text"
            placeholder="Education Detail"
            value={edu}
            onChange={(e) => handleEducationChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addEducationField}>
          Add More
        </button>

        <h3>Experience</h3>
        {experience.map((exp, index) => (
          <input
            key={index}
            type="text"
            placeholder="Experience Detail"
            value={exp}
            onChange={(e) => handleExperienceChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addExperienceField}>
          Add More
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
