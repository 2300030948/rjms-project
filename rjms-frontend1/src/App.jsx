import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalList from "./components/JournalList.jsx";
import JournalDetail from "./components/JournalDetail.jsx"; 
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

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
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
