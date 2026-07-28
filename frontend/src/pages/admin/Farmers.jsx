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

  // ================= LOAD FARMERS =================

  const loadFarmers = async () => {
  try {
    setLoading(true);
    setError("");

    let data;

    if (status === "ALL") {
      data = await getAllFarmers();
    } else if (status === "PENDING") {
      data = await getPendingFarmers();
    } else {
      // Until backend provides separate APIs for APPROVED/REJECTED,
      // get all farmers and filter on the frontend.
      data = await getAllFarmers();

      data = data.filter(
        (farmer) => farmer.approvalStatus === status
      );
    }

    setFarmers(data);
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Failed to load farmers"
    );
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadFarmers();
  }, [status]);

  // ================= APPROVE =================

  const handleApprove = async (id) => {
    const confirmed = window.confirm(
      "Approve this farmer?"
    );

    if (!confirmed) return;

    try {
      await approveFarmer(id);
      await loadFarmers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to approve farmer"
      );
    }
  };

  // ================= REJECT =================

  const handleReject = async (id) => {
    const confirmed = window.confirm(
      "Reject this farmer?"
    );

    if (!confirmed) return;

    try {
      await rejectFarmer(id);
      await loadFarmers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to reject farmer"
      );
    }
  };

  return (
    <div className="container py-4">

      {/* Heading */}

      <div className="mb-4">
        <h2>Farmer Approval</h2>
        <p className="text-muted">
          Review and approve farmer registrations.
        </p>
      </div>

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
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="ALL">All</option>
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

      {/* Error */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="text-center py-5">
          Loading farmers...
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
                    <th>Phone</th>
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
                            className={`badge ${
                              farmer.approvalStatus ===
                              "APPROVED"
                                ? "bg-success"
                                : farmer.approvalStatus ===
                                  "REJECTED"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
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
                                  handleApprove(farmer.id)
                                }
                              >
                                Approve
                              </button>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleReject(farmer.id)
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