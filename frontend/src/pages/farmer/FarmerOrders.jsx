import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

function FarmerOrders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ================= LOAD ORDERS =================

  const loadOrders = async (selectedStatus = "") => {

    try {

      setLoading(true);
      setError("");

      const params = {};

      if (selectedStatus) {
        params.status = selectedStatus;
      }

      const response = await api.get(
        "/farmer/orders",
        { params }
      );

      setOrders(response.data || []);

    } catch (error) {

      console.error(
        "Failed to load farmer orders:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load orders."
      );

    } finally {

      setLoading(false);
    }
  };


  // ================= INITIAL LOAD =================

  useEffect(() => {
    loadOrders();
  }, []);


  // ================= STATUS FILTER =================

  const handleStatusChange = (event) => {

    const selectedStatus =
      event.target.value;

    setStatus(selectedStatus);

    loadOrders(selectedStatus);
  };


  // ================= STATUS BADGE =================

  const getStatusClass = (orderStatus) => {

    switch (orderStatus) {

      case "PENDING":
        return "bg-warning text-dark";

      case "CONFIRMED":
        return "bg-info text-dark";

      case "PAID":
        return "bg-primary";

      case "SHIPPED":
        return "bg-secondary";

      case "DELIVERED":
        return "bg-success";

      case "CANCELLED":
        return "bg-danger";

      default:
        return "bg-dark";
    }
  };


  // ================= DATE =================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString();
  };


  // ================= AMOUNT =================

  const formatAmount = (amount) => {

    if (
      amount === null ||
      amount === undefined
    ) {
      return "₹0.00";
    }

    return `₹${Number(amount).toFixed(2)}`;
  };


  return (

    <div className="container py-4">

      {/* ================= HEADER ================= */}

      <div
        className="
          d-flex
          justify-content-between
          align-items-center
          flex-wrap
          gap-3
          mb-4
        "
      >

        <div>

          <h2 className="fw-bold mb-1">
            Farmer Orders
          </h2>

          <p className="text-muted mb-0">
            View orders containing your products
          </p>

        </div>


        {/* STATUS FILTER */}

        <div style={{ minWidth: "220px" }}>

          <select
            className="form-select"
            value={status}
            onChange={handleStatusChange}
          >

            <option value="">
              All Orders
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="CONFIRMED">
              Confirmed
            </option>

            <option value="PAID">
              Paid
            </option>

            <option value="SHIPPED">
              Shipped
            </option>

            <option value="DELIVERED">
              Delivered
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>

          </select>

        </div>

      </div>


      {/* ================= ERROR ================= */}

      {error && (

        <div className="alert alert-danger">
          {error}
        </div>

      )}


      {/* ================= LOADING ================= */}

      {loading ? (

        <div className="text-center py-5">

          <div
            className="spinner-border text-success"
            role="status"
          />

          <p className="text-muted mt-3">
            Loading orders...
          </p>

        </div>

      ) : orders.length === 0 ? (

        /* ================= EMPTY ================= */

        <div className="card border-0 shadow-sm">

          <div className="card-body text-center py-5">

            <h5 className="fw-bold">
              No Orders Found
            </h5>

            <p className="text-muted mb-0">
              No orders match the selected status.
            </p>

          </div>

        </div>

      ) : (

        /* ================= TABLE ================= */

        <div className="card border-0 shadow-sm">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>

                  <th>Order</th>

                  <th>Customer</th>

                  <th>Products</th>

                  <th>My Total</th>

                  <th>Payment</th>

                  <th>Status</th>

                  <th>Date</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {orders.map((order) => (

                  <tr key={order.orderId}>

                    {/* ORDER ID */}

                    <td className="fw-semibold">

                      #{order.orderId}

                    </td>


                    {/* CUSTOMER */}

                    <td>

                      <div className="fw-semibold">
                        {order.customerName || "-"}
                      </div>

                      <small className="text-muted">
                        {order.customerEmail || ""}
                      </small>

                    </td>


                    {/* PRODUCTS */}

                    <td>

                      {order.items?.length || 0}

                    </td>


                    {/* FARMER TOTAL */}

                    <td className="fw-semibold text-success">

                      {formatAmount(
                        order.farmerTotal
                      )}

                    </td>


                    {/* PAYMENT */}

                    <td>

                      {order.paymentMethod || "-"}

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          `badge ${getStatusClass(
                            order.status
                          )}`
                        }
                      >

                        {order.status}

                      </span>

                    </td>


                    {/* DATE */}

                    <td>

                      {formatDate(
                        order.orderDate
                      )}

                    </td>


                    {/* VIEW */}

                    <td>

                      <button
                        className="
                          btn
                          btn-sm
                          btn-outline-success
                        "
                        onClick={() =>
                          navigate(
                            `/farmer/orders/${order.orderId}`
                          )
                        }
                      >

                        View

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}

export default FarmerOrders;