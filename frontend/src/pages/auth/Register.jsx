import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "CONSUMER",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.mobile.trim() ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        password: formData.password,
        role: formData.role,
      });

      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-header">
          <h1>🌾 Farmer Marketplace</h1>
          <h2>Create Account</h2>
          <p>Join our farmer marketplace</p>
        </div>

        {error && (
          <div className="register-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Register As</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="CONSUMER">
                Consumer
              </option>

              <option value="FARMER">
                Farmer
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="register-password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="register-show-password"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Enter password again"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="register-login-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;