import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="container">
      <h1>Register</h1>

      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Register</button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;