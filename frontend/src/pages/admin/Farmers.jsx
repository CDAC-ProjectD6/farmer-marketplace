import { useEffect, useState } from "react";

import {
  getFarmers,
  approveFarmer,
  rejectFarmer,
} from "../../services/adminFarmerService";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [processingId, setProcessingId] = useState(null);

  // ==================== LOAD FARMERS ====================

  const loadFarmers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getFarmers(search, status);
      setFarmers(data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load farmers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarmers();
  }, []);

  // ==================== SEARCH ====================

  const handleSearch = (e) => {
    e.preventDefault();
    loadFarmers();
  };

  // ==================== FILTER ====================

  const handleStatusChange = async (e) => {
    const selectedStatus = e.target.value;

    setStatus(selectedStatus);
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const data = await getFarmers(
        search,
        selectedStatus
      );

      setFarmers(data);
    } catch (err) {
      console.error(err);
      setError("Unable to filter farmers.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== APPROVE ====================

  const handleApprove = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this farmer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(id);
      setError("");
      setMessage("");

      await approveFarmer(id);

      setMessage("Farmer approved successfully.");

      await loadFarmers();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to approve farmer."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ==================== REJECT ====================

  const handleReject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this farmer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(id);
      setError("");
      setMessage("");

      await rejectFarmer(id);

      setMessage("Farmer rejected successfully.");

      await loadFarmers();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to reject farmer."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ==================== STATUS BADGE ====================

  const getStatusBadge = (farmerStatus) => {
    switch (farmerStatus) {
      case "APPROVED":
        return "bg-success";

      case "REJECTED":
        return "bg-danger";

      case "PENDING":
        return "bg-warning text-dark";

      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Farmer Approval
        </h2>

        <p className="text-muted mb-0">
          Review and manage farmer registrations.
        </p>
      </div>

      {/* MESSAGES */}

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* SEARCH + FILTER */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <form
            onSubmit={handleSearch}
            className="row g-3 align-items-end"
          >

            <div className="col-md-6">
              <label className="form-label">
                Search Farmer
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Approval Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="">All</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div className="col-md-3">
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

      {/* FARMER TABLE */}

      <div className="card shadow-sm">
        <div className="card-body">

          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border text-success"
                role="status"
              />

              <p className="mt-3 mb-0">
                Loading farmers...
              </p>
            </div>
          ) : farmers.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No farmers found.
            </div>
          ) : (
            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Farmer</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {farmers.map((farmer) => (

                    <tr key={farmer.id}>

                      <td>{farmer.id}</td>

                      <td className="fw-semibold">
                        {farmer.name}
                      </td>

                      <td>{farmer.email}</td>

                      <td>{farmer.mobile}</td>

                      {/* FIXED */}
                      <td>
                        <span
                          className={`badge ${getStatusBadge(
                            farmer.approvalStatus
                          )}`}
                        >
                          {farmer.approvalStatus || "N/A"}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex justify-content-center gap-2">

                          {/* APPROVE */}

                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            disabled={
                              processingId === farmer.id ||
                              farmer.approvalStatus === "APPROVED"
                            }
                            onClick={() =>
                              handleApprove(farmer.id)
                            }
                          >
                            {processingId === farmer.id
                              ? "Processing..."
                              : "Approve"}
                          </button>

                          {/* REJECT */}

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            disabled={
                              processingId === farmer.id ||
                              farmer.approvalStatus === "REJECTED"
                            }
                            onClick={() =>
                              handleReject(farmer.id)
                            }
                          >
                            {processingId === farmer.id
                              ? "Processing..."
                              : "Reject"}
                          </button>

                        </div>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default Farmers;