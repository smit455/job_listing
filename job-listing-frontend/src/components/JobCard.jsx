import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-indigo-800 mb-4 hover:text-indigo-600 transition duration-300 ease-in-out">
        {job.title}
      </h2>
      <h3 className="text-xl font-medium text-gray-800 mb-4">{job.company}</h3>
      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {job.location} ({job.location_type})
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Posted on:</strong> {job.posted_at}
      </p>
      <div className="mt-6">
        <button className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-all duration-300">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
