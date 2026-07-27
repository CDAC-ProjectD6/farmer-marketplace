import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      login(data);

      // Redirect according to role
      if (data.role === "ADMIN") {
        navigate("/category-management");
      } else if (data.role === "FARMER") {
        navigate("/");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1>Farmer Marketplace</h1>
          <h2>Welcome Back</h2>
          <p>Login to continue to your account</p>
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="register-link">
          <span>Don't have an account? </span>
          <Link to="/register">Create Account</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;