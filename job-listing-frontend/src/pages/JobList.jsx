import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/jobs/");
        const data = await response.json();
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 pt-20">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl mx-auto lg:max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-900 mb-8">
              Available Jobs
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="relative bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
                    onClick={() => navigate(`/job/${job.id}`)}
                  >
                    {/* Job Title */}
                    <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-2 hover:text-indigo-600 transition duration-300">
                      {job.title}
                    </h2>

                    {/* Company Name */}
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                      {job.company}
                    </h3>

                    {/* Location & Type */}
                    <p className="text-sm sm:text-base text-gray-600 mb-2">
                      <strong>Location:</strong>{" "}
                      {job.location === "Remote" ? "Remote" : `${job.location} (${job.location_type})`}
                    </p>

                    {/* Posted At */}
                    <p className="text-sm sm:text-base text-gray-600">
                      <strong>Posted at:</strong> {job.posted_at}
                    </p>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 opacity-0 hover:opacity-20 transition-opacity duration-500 rounded-2xl"></div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  No jobs available right now.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
