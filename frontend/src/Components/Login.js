import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import CSS styles

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email: email.value,
        password: password.value,
      });

      // Save token to local storage and redirect
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

      setLoading(false);
    } catch (error) {
      setError("Invalid credentials or server error");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Mini Loan App</h1>
      </header>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
