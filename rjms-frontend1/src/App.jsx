import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalList from "./components/JournalList.jsx";
import JournalDetail from "./components/JournalDetail.jsx"; 
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<JournalList />} />
              <Route path="/journals/:id" element={<JournalDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
