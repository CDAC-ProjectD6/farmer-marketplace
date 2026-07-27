import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1 - SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await forgotPassword(email);

      setMessage("OTP sent successfully to your email.");
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 - VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await verifyOtp(email, otp);

      setMessage("OTP verified successfully.");
      setStep(3);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 - RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);

      alert("Password reset successfully. Please login.");

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow mx-auto p-4"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">
          Forgot Password
        </h2>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <label className="form-label">
              Registered Email
            </label>

            <input
              type="email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <p>
              OTP sent to <strong>{email}</strong>
            </p>

            <label className="form-label">
              Enter OTP
            </label>

            <input
              type="text"
              className="form-control mb-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              maxLength="6"
              required
            />

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <label className="form-label">
              New Password
            </label>

            <input
              type="password"
              className="form-control mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control mb-3"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;