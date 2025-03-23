import React, { useState } from "react";
import { Search as SearchIcon, LogOut } from "lucide-react";
import { logout } from "../../API/auth.api";
import { toast } from "react-toastify";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = async () => {
    console.log("loutout pressed...")
    const response = await logout();

    if (response.status === 200) {
      toast.success("Logout successful");
      window.location.reload();
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };
  
  return (
    <div className="bg-gray-100 p-3 flex items-center justify-between border-b">
      <div className="relative flex-1 mr-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search or start new chat"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <button onClick={() => handleLogout()}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        title="Logout"
      >
        <LogOut className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}