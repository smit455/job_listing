import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details by ID
    fetch(`http://127.0.0.1:8000/api/jobs/${id}/`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-200 to-purple-300">
        <div className="spinner w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-6 bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 min-h-screen">
        <div className="container mx-auto max-w-2xl lg:max-w-4xl bg-white p-6 sm:p-8 rounded-3xl shadow-xl mt-14 sm:mt-14">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-indigo-900 mb-4 sm:mb-6">
            {job.title}
          </h1>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 text-center mb-4 sm:mb-6">
            {job.company}
          </h2>

          {/* Additional Job Info */}
          <div className="mt-4 sm:mt-8">
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-3 sm:mb-4">
              Job Details
            </h3>
            <div className="space-y-3 sm:space-y-4 text-gray-700">
              <p>
                <strong>Location:</strong> {job.location} -{" "}
                <span className="text-sm italic">{job.location_type}</span>
              </p>
              <p>
                <strong>Compensation:</strong> {job.compensation || "Not disclosed"}
              </p>
              <p>
                <strong>Employment Type:</strong> {job.employment_type || "Not specified"}
              </p>
              <p>
                <strong>Description:</strong> {job.description}
              </p>
              <p>
                <strong>Skills Required:</strong> {job.skills || "N/A"}
              </p>
            </div>
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button className="bg-indigo-600 text-white py-2 px-6 sm:px-8 rounded-full transform transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
