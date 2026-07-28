import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAllFarmers,
  approveFarmer,
  rejectFarmer,
} from "../../services/farmerApprovalService";

function FarmerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= LOAD FARMER =================

  const loadFarmer = async () => {
    try {
      setLoading(true);
      setError("");

      const farmers = await getAllFarmers();

      const selectedFarmer = farmers.find(
        (farmer) => farmer.id === Number(id)
      );

      if (!selectedFarmer) {
        setError("Farmer not found.");
        return;
      }

      setFarmer(selectedFarmer);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load farmer details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarmer();
  }, [id]);

  // ================= APPROVE =================

  const handleApprove = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this farmer?"
    );

    if (!confirmed) return;

    try {
      await approveFarmer(id);
      await loadFarmer();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to approve farmer."
      );
    }
  };

  // ================= REJECT =================

  const handleReject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this farmer?"
    );

    if (!confirmed) return;

    try {
      await rejectFarmer(id);
      await loadFarmer();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to reject farmer."
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h5>Loading Farmer Details...</h5>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/farmers")}
        >
          Back
        </button>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Farmer Details</h2>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/farmers")}
        >
          Back
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th width="30%">Name</th>
                <td>{farmer.name}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{farmer.email}</td>
              </tr>

              <tr>
                <th>Mobile</th>
                <td>{farmer.mobile}</td>
              </tr>

              <tr>
                <th>Approval Status</th>

                <td>
                  <span
                    className={`badge ${
                      farmer.approvalStatus === "APPROVED"
                        ? "bg-success"
                        : farmer.approvalStatus === "REJECTED"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {farmer.approvalStatus}
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

          {farmer.approvalStatus === "PENDING" && (

            <div className="mt-4">

              <button
                className="btn btn-success me-2"
                onClick={handleApprove}
              >
                Approve
              </button>

              <button
                className="btn btn-danger"
                onClick={handleReject}
              >
                Reject
              </button>

            </div>

          )}

        </div>
      </div>

    </div>
  );
}

export default FarmerDetails;