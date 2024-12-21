import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetails";
import JobPost from "./components/JobPost";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/post-job" element={<JobPost/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </Router>
  );
}

export default App;
