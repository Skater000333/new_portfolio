import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkProjects from "./pages/WorkProjects";
import SideProjects from "./pages/SideProjects";
import GetToKnowParth from "./pages/GetToKnowParth";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="min-h-screen bg-white text-black flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work-projects" element={<WorkProjects />} />
              <Route path="/side-projects" element={<SideProjects />} />
              <Route path="/get-to-know-parth" element={<GetToKnowParth />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;