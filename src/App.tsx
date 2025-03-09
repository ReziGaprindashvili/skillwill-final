import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PhotoDetails from "./pages/PhotoDetails";
import Navbar from "./components/Navbar";
import "./index.css";
import AboutPage from "./pages/AboutPage";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
