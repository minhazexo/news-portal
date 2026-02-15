import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <img src="/logo192.png" alt="DailyNews Logo" className="logo-img" />
        <h2 className="logo-text">DailyNews</h2>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search news..."
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
