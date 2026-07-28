import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getUsers,
  blockUser,
  unblockUser,
} from "../../services/adminUserService";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= LOAD USERS =================

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers(search, role);

      setUsers(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load initially and whenever role changes
  useEffect(() => {
    loadUsers();
  }, [role]);

  // ================= SEARCH =================

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers();
  };

  // ================= BLOCK =================

  const handleBlock = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to block this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await blockUser(id);
      await loadUsers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to block user"
      );
    }
  };

  // ================= UNBLOCK =================

  const handleUnblock = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to unblock this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await unblockUser(id);
      await loadUsers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to unblock user"
      );
    }
  };

  return (
    <div className="container py-4">

      {/* Heading */}
      <div className="mb-4">
        <h2>User Management</h2>
        <p className="text-muted">
          Search, filter, block and unblock users.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <form
            onSubmit={handleSearch}
            className="row g-3"
          >
            {/* Search */}
            <div className="col-md-6">
              <label className="form-label">
                Search
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            {/* Role */}
            <div className="col-md-4">
              <label className="form-label">
                Role
              </label>

              <select
                className="form-select"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              >
                <option value="">All</option>
                <option value="CONSUMER">
                  Consumer
                </option>
                <option value="FARMER">
                  Farmer
                </option>
                <option value="ADMIN">
                  Admin
                </option>
              </select>
            </div>

            {/* Search Button */}
            <div className="col-md-2 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Search
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-5">
          Loading users...
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">

            <div className="table-responsive">
              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center text-muted py-4"
                      >
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>

                        <td>{user.name}</td>

                        <td>{user.email}</td>

                        <td>
                          <span className="badge bg-secondary">
                            {user.role}
                          </span>
                        </td>

                        <td>
                          {user.active ? (
                            <span className="badge bg-success">
                              ACTIVE
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              BLOCKED
                            </span>
                          )}
                        </td>

                        <td>

                          {/* View Details */}
                          <Link
                            to={`/admin/users/${user.id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            View
                          </Link>

                          {/* Never block Admin */}
                          {user.role !== "ADMIN" && (
                            <>
                              {user.active ? (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                  onClick={() =>
                                    handleBlock(user.id)
                                  }
                                >
                                  Block
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success"
                                  onClick={() =>
                                    handleUnblock(user.id)
                                  }
                                >
                                  Unblock
                                </button>
                              )}
                            </>
                          )}

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Users;