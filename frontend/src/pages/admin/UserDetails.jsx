import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getUserById,
  blockUser,
  unblockUser,
} from "../../services/adminUserService";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= LOAD USER =================

  const loadUser = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUserById(id);

      setUser(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load user details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  // ================= BLOCK =================

  const handleBlock = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to block this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const updatedUser = await blockUser(id);
      setUser(updatedUser);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to block user"
      );
    }
  };

  // ================= UNBLOCK =================

  const handleUnblock = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to unblock this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const updatedUser = await unblockUser(id);
      setUser(updatedUser);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to unblock user"
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        Loading user details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          {error}
        </div>

        <Link
          to="/admin/users"
          className="btn btn-secondary"
        >
          Back to Users
        </Link>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Details</h2>

        <Link
          to="/admin/users"
          className="btn btn-outline-secondary"
        >
          Back to Users
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              User ID
            </div>
            <div className="col-md-9">
              {user.id}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              Name
            </div>
            <div className="col-md-9">
              {user.name}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              Email
            </div>
            <div className="col-md-9">
              {user.email}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              Mobile
            </div>
            <div className="col-md-9">
              {user.mobile}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              Role
            </div>
            <div className="col-md-9">
              <span className="badge bg-secondary">
                {user.role}
              </span>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 fw-bold">
              Status
            </div>

            <div className="col-md-9">
              {user.active ? (
                <span className="badge bg-success">
                  ACTIVE
                </span>
              ) : (
                <span className="badge bg-danger">
                  BLOCKED
                </span>
              )}
            </div>
          </div>

          {/* Admin accounts cannot be blocked */}
          {user.role !== "ADMIN" && (
            <div>
              {user.active ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleBlock}
                >
                  Block User
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUnblock}
                >
                  Unblock User
                </button>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default UserDetails;