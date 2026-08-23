import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container">
      <h1>Task Manager</h1>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Login</button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;