import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo192.png";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import "./Header.css";

export default function Header({ darkMode, toggleDarkMode }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <header className={`header ${darkMode ? "dark" : ""}`}>
      <div className="logo-container">
        <img src={logo} alt="DailyNews Logo" className="logo-img" />
        <h2 className="logo-text">ডেইলি নিউজ</h2>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="খবর খুঁজুন..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      <button className="dark-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
}