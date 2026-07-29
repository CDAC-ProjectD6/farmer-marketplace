import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

function OrdersAdmin() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [status, setStatus] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [farmerId, setFarmerId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const pageSize = 10;


  // ================= LOAD ORDERS =================

  const loadOrders = async (pageNumber = 0) => {

    try {

      setLoading(true);
      setError("");

      const params = {
        page: pageNumber,
        size: pageSize,
      };

      if (status) {
        params.status = status;
      }

      if (customerId) {
        params.customerId = customerId;
      }

      if (farmerId) {
        params.farmerId = farmerId;
      }

      if (fromDate) {
        params.fromDate = fromDate;
      }

      if (toDate) {
        params.toDate = toDate;
      }

      const response = await api.get(
        "/admin/orders",
        { params }
      );

      setOrders(response.data.content || []);
      setPage(response.data.number || 0);
      setTotalPages(response.data.totalPages || 0);
      setTotalElements(response.data.totalElements || 0);

    } catch (error) {

      console.error(error);

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
    loadOrders(0);
  }, []);


  // ================= SEARCH =================

  const handleSearch = (event) => {

    event.preventDefault();

    setPage(0);

    loadOrders(0);
  };


  // ================= RESET =================

  const handleReset = () => {

    setStatus("");
    setCustomerId("");
    setFarmerId("");
    setFromDate("");
    setToDate("");

    setPage(0);

    // Load without filters directly
    loadOrdersWithoutFilters();
  };


  const loadOrdersWithoutFilters = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        "/admin/orders",
        {
          params: {
            page: 0,
            size: pageSize,
          },
        }
      );

      setOrders(response.data.content || []);
      setPage(response.data.number || 0);
      setTotalPages(response.data.totalPages || 0);
      setTotalElements(response.data.totalElements || 0);

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load orders."
      );

    } finally {

      setLoading(false);
    }
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

    if (amount === null || amount === undefined) {
      return "₹0.00";
    }

    return `₹${Number(amount).toFixed(2)}`;
  };


  // ================= UI =================

  return (

    <div className="container py-4">

      {/* Header */}

      <div className="mb-4">

        <h2 className="fw-bold mb-1">
          Order Management
        </h2>

        <p className="text-muted">
          View and manage marketplace orders
        </p>

      </div>


      {/* ================= FILTER ================= */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Filter Orders
          </h5>

          <form onSubmit={handleSearch}>

            <div className="row g-3">


              {/* Status */}

              <div className="col-md-4 col-lg-2">

                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >

                  <option value="">
                    All
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


              {/* Customer */}

              <div className="col-md-4 col-lg-2">

                <label className="form-label">
                  Customer ID
                </label>

                <input
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Customer ID"
                  value={customerId}
                  onChange={(e) =>
                    setCustomerId(e.target.value)
                  }
                />

              </div>


              {/* Farmer */}

              <div className="col-md-4 col-lg-2">

                <label className="form-label">
                  Farmer ID
                </label>

                <input
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Farmer ID"
                  value={farmerId}
                  onChange={(e) =>
                    setFarmerId(e.target.value)
                  }
                />

              </div>


              {/* From Date */}

              <div className="col-md-4 col-lg-2">

                <label className="form-label">
                  From Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) =>
                    setFromDate(e.target.value)
                  }
                />

              </div>


              {/* To Date */}

              <div className="col-md-4 col-lg-2">

                <label className="form-label">
                  To Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) =>
                    setToDate(e.target.value)
                  }
                />

              </div>


              {/* Buttons */}

              <div className="col-md-4 col-lg-2 d-flex align-items-end gap-2">

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Search
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>


      {/* ================= ERROR ================= */}

      {error && (

        <div className="alert alert-danger">
          {error}
        </div>

      )}


      {/* ================= ORDER COUNT ================= */}

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h5 className="mb-0">
          Orders
        </h5>

        <span className="text-muted">
          Total: {totalElements}
        </span>

      </div>


      {/* ================= LOADING ================= */}

      {loading ? (

        <div className="text-center py-5">

          <div
            className="spinner-border text-success"
            role="status"
          />

          <p className="mt-3 text-muted">
            Loading orders...
          </p>

        </div>

      ) : orders.length === 0 ? (

        /* ================= EMPTY ================= */

        <div className="card border-0 shadow-sm">

          <div className="card-body text-center py-5">

            <h5>No Orders Found</h5>

            <p className="text-muted mb-0">
              No orders match the selected filters.
            </p>

          </div>

        </div>

      ) : (

        /* ================= TABLE ================= */

        <div className="card shadow-sm border-0">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>

                  <th>Order ID</th>

                  <th>Customer</th>

                  <th>Total</th>

                  <th>Payment</th>

                  <th>Status</th>

                  <th>Order Date</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {orders.map((order) => (

                  <tr key={order.orderId}>

                    <td className="fw-semibold">
                      #{order.orderId}
                    </td>


                    <td>
                      User #{order.userId}
                    </td>


                    <td className="fw-semibold">
                      {formatAmount(order.totalAmount)}
                    </td>


                    <td>
                      {order.paymentMethod || "-"}
                    </td>


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


                    <td>
                      {formatDate(order.orderDate)}
                    </td>


                    <td>

                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() =>
                          navigate(
                            `/admin/orders/${order.orderId}`
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


      {/* ================= PAGINATION ================= */}

      {!loading && totalPages > 1 && (

        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

          <button
            className="btn btn-outline-secondary"
            disabled={page === 0}
            onClick={() =>
              loadOrders(page - 1)
            }
          >
            Previous
          </button>


          <span>
            Page{" "}
            <strong>
              {page + 1}
            </strong>
            {" "}of{" "}
            <strong>
              {totalPages}
            </strong>
          </span>


          <button
            className="btn btn-outline-secondary"
            disabled={
              page >= totalPages - 1
            }
            onClick={() =>
              loadOrders(page + 1)
            }
          >
            Next
          </button>

        </div>

      )}

    </div>
  );
}

export default OrdersAdmin;