import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllFarmers,
  getPendingFarmers,
  approveFarmer,
  rejectFarmer,
} from "../../services/farmerApprovalService";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ===============================
  // Load Farmers
  // ===============================

  const loadFarmers = async () => {
    try {
      setLoading(true);
      setError("");

      let data = [];

      if (status === "PENDING") {
        data = await getPendingFarmers();
      } else if (status === "ALL") {
        data = await getAllFarmers();
      } else {
        data = await getAllFarmers();

        data = data.filter(
          (farmer) => farmer.approvalStatus === status
        );
      }

      setFarmers(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load farmers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarmers();
  }, [status]);

  // ===============================
  // Approve Farmer
  // ===============================

  const handleApprove = async (id) => {
    const confirmed = window.confirm(
      "Approve this farmer?"
    );

    if (!confirmed) return;

    try {
      await approveFarmer(id);

      setMessage("Farmer approved successfully.");

      loadFarmers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to approve farmer."
      );
    }
  };

  // ===============================
  // Reject Farmer
  // ===============================

  const handleReject = async (id) => {
    const confirmed = window.confirm(
      "Reject this farmer?"
    );

    if (!confirmed) return;

    try {
      await rejectFarmer(id);

      setMessage("Farmer rejected successfully.");

      loadFarmers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reject farmer."
      );
    }
  };

  // ===============================
  // Badge Color
  // ===============================

  const getBadgeColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-success";

      case "REJECTED":
        return "bg-danger";

      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}

      <div className="mb-4">
        <h2 className="fw-bold">Farmer Approval</h2>

        <p className="text-muted">
          Review and approve farmer registrations.
        </p>
      </div>

      {/* Success */}

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Filter */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">
                Approval Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setMessage("");
                }}
              >
                <option value="ALL">
                  All Farmers
                </option>

                <option value="PENDING">
                  Pending
                </option>

                <option value="APPROVED">
                  Approved
                </option>

                <option value="REJECTED">
                  Rejected
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-success"
            role="status"
          ></div>

          <p className="mt-3">
            Loading farmers...
          </p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {farmers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center text-muted py-4"
                      >
                        No farmers found.
                      </td>
                    </tr>
                  ) : (
                    farmers.map((farmer) => (
                      <tr key={farmer.id}>
                        <td>{farmer.name}</td>

                        <td>{farmer.email}</td>

                        <td>{farmer.mobile}</td>

                        <td>
                          <span
                            className={`badge ${getBadgeColor(
                              farmer.approvalStatus
                            )}`}
                          >
                            {farmer.approvalStatus}
                          </span>
                        </td>

                        <td>
                          <Link
                            to={`/admin/farmers/${farmer.id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            View
                          </Link>

                          {farmer.approvalStatus ===
                            "PENDING" && (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() =>
                                  handleApprove(
                                    farmer.id
                                  )
                                }
                              >
                                Approve
                              </button>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleReject(
                                    farmer.id
                                  )
                                }
                              >
                                Reject
                              </button>
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

export default Farmers;