import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="brand-button" onClick={() => navigate("/dashboard")}>
          Task Manager
        </button>

        <div className="navbar-actions">
          <button
            className="button button-secondary"
            onClick={() => setDarkMode((current) => !current)}
          >
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
          <button className="button button-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
