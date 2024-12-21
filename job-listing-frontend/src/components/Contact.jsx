import React from "react";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center md:text-left text-blue-900 mb-4 sm:mb-6 md:mb-8">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-6 sm:leading-7 mb-4 sm:mb-6">
            For inquiries or support, feel free to reach out to us:
          </p>
          <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl text-gray-700">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:ajanismit5@gmail.com"
                className="text-blue-500 underline"
              >
                ajanismit5@gmail.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong> +91-7041990997
            </li>
            <li>
              <strong>Location:</strong> Rajkot
            </li>
          </ul>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-700">
            Alternatively, you can reach us through our social media channels:
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="https://github.com/smit455"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-gray-100 p-3 rounded-full shadow hover:bg-gray-200 transition-all text-gray-700 text-sm sm:text-base md:text-lg"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ajani-smit-8a347b255/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-100 p-3 rounded-full shadow hover:bg-blue-200 transition-all text-gray-700 text-sm sm:text-base md:text-lg"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
