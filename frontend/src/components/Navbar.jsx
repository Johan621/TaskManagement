import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

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

        <button className="button button-secondary navbar-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
