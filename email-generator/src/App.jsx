import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import GenerateNewMail from "./components/GenerateNewMail";
import GenerateReplyMail from "./components/GenerateReplyMail";
import EmailDetection from "./components/EmailDetection";
import "./App.css";

function Navbar() {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path ? "underline font-bold" : "";

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-center gap-8">
      <Link to="/" className={`${isActive("/")} hover:underline`}>
        Email Oluşturma
      </Link>
      <Link
        to="/email-tespiti"
        className={`${isActive("/email-tespiti")} hover:underline`}
      >
        Email Tespiti
      </Link>
    </nav>
  );
}

function EmailTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex">
      <Link
        to="/"
        className={`px-8 py-4 font-medium w-1/2 text-center ${
          activeTab === "new"
            ? "bg-indigo-600 underline underline-offset-8 decoration-2"
            : "bg-indigo-500"
        }`}
        onClick={() => setActiveTab("new")}
      >
        AI ile Yeni E-posta Oluştur
      </Link>
      <Link
        to="/reply"
        className={`px-8 py-4 font-medium w-1/2 text-center ${
          activeTab === "reply"
            ? "bg-indigo-600 underline underline-offset-8 decoration-2"
            : "bg-indigo-500"
        }`}
        onClick={() => setActiveTab("reply")}
      >
        AI ile Yanıt E-postası Oluştur
      </Link>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <Router>
      <div className="min-h-screen bg-gray-800">
        <Navbar />
        <div className="max-w-5xl mx-auto bg-gray-700 shadow-md min-h-screen text-white">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <EmailTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <GenerateNewMail />
                </>
              }
            />
            <Route
              path="/reply"
              element={
                <>
                  <EmailTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <GenerateReplyMail />
                </>
              }
            />
            <Route path="/email-tespiti" element={<EmailDetection />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
