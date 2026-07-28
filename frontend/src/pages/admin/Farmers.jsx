import { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======

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
>>>>>>> develop
    }
  };

  return (
    <div className="container py-4">

<<<<<<< HEAD
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
=======
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
>>>>>>> develop

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

<<<<<<< HEAD
      {/* Loading */}

      {loading ? (
        <div className="text-center py-5">
          Loading farmers...
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">

=======
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
>>>>>>> develop
            <div className="table-responsive">

              <table className="table table-hover align-middle">

<<<<<<< HEAD
                <thead>

                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

=======
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
>>>>>>> develop
                </thead>

                <tbody>

<<<<<<< HEAD
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
=======
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
>>>>>>> develop

                </tbody>

              </table>

            </div>
<<<<<<< HEAD

          </div>
        </div>
      )}
=======
          )}

        </div>
      </div>

>>>>>>> develop
    </div>
  );
}

export default Farmers;