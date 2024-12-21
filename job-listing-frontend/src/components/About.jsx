import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center md:text-left text-blue-900 mb-4 sm:mb-6 md:mb-8">
            About Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-6 sm:leading-7">
            Welcome to <strong>Job Listings</strong>, your ultimate platform for
            exploring career opportunities. Our mission is to bridge the gap
            between companies and job seekers, offering a seamless experience
            for posting and applying to jobs.
          </p>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 leading-6 sm:leading-7">
            This platform was developed by <strong>Smit Ajani</strong>, a
            passionate full-stack developer with expertise in building modern,
            scalable applications. Whether you're looking for your next job or
            want to hire top talent, you're in the right place.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
