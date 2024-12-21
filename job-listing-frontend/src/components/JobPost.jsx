import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPost = () => {
  const initialFormData = {
    title: "",
    company: "",
    location: "",
    location_type: "Remote",
    compensation: "",
    employment_type: "",
    skills: "",
    description: "",
    posted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const [formData, setFormData] = useState(initialFormData);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        toast.error("Failed to post the job. Please try again.");
      } else {
        const data = await response.json();
        console.log("Job posted successfully:", data);
        toast.success("Job posted successfully!");
        setFormData(initialFormData);
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      toast.error("An error occurred while submitting the job.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-100 to-purple-200 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-2xl mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-800 mb-6 sm:mb-8 tracking-wider uppercase">
          Post a Job
        </h1>

        <div className="space-y-4 sm:space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-transparent bg-blue-50 shadow-md focus:border-blue-400 focus:ring-4 focus:ring-blue-200 outline-none transition-all"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-transparent bg-blue-50 shadow-md focus:border-blue-400 focus:ring-4 focus:ring-blue-200 outline-none transition-all"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-transparent bg-blue-50 shadow-md focus:border-blue-400 focus:ring-4 focus:ring-blue-200 outline-none transition-all"
            required
          />
          <select
            name="location_type"
            value={formData.location_type}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-transparent bg-blue-50 shadow-md focus:border-blue-400 focus:ring-4 focus:ring-blue-200 outline-none transition-all"
          >
            <option value="Remote">Remote</option>
            <option value="On-Site">On-Site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <input
            type="text"
            name="compensation"
            placeholder="Compensation"
            value={formData.compensation}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-transparent bg-blue-50 shadow-md focus:border-blue-400 focus:ring-4 focus:ring-blue-200 outline-none transition-all"
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 h-28 sm:h-32 rounded-xl border-2 border-transparent bg-blue-50 shadow-md focus:border-blue-400 focus:ring-4 focus:ring-blue-200 outline-none transition-all resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 sm:mt-8 w-full py-3 sm:py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg sm:text-xl rounded-xl shadow-lg hover:from-blue-500 hover:to-green-400 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
        >
          Post Job
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default JobPost;
