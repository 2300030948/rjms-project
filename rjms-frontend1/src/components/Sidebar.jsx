import React from "react";
import { Home, BookOpen, Settings } from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 bg-blue-700 text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-blue-500">
        📚 RJMS
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <a
          href="#dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <Home size={20} /> Dashboard
        </a>
        <a
          href="#journals"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <BookOpen size={20} /> Journals
        </a>
        <a
          href="#settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <Settings size={20} /> Settings
        </a>
      </nav>
      <div className="p-4 border-t border-blue-500 text-sm text-center">
        © 2025 RJMS
      </div>
    </div>
  );
}

export default Sidebar;
