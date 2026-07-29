import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

function OrderDetailsAdmin() {

  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ================= LOAD ORDER =================

  useEffect(() => {

    const loadOrder = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await api.get(
          `/admin/orders/${orderId}`
        );

        setOrder(response.data);

      } catch (error) {

        console.error(error);

        setError(
          error.response?.data?.message ||
          "Failed to load order details."
        );

      } finally {

        setLoading(false);
      }
    };

    loadOrder();

  }, [orderId]);


  // ================= STATUS BADGE =================

  const getStatusClass = (status) => {

    switch (status) {

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


  // ================= AMOUNT =================

  const formatAmount = (amount) => {

    if (amount === null || amount === undefined) {
      return "₹0.00";
    }

    return `₹${Number(amount).toFixed(2)}`;
  };


  // ================= DATE =================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString();
  };


  // ================= LOADING =================

  if (loading) {

    return (

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-success"
          role="status"
        />

        <p className="mt-3 text-muted">
          Loading order details...
        </p>

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
          onClick={() =>
            navigate("/admin/orders")
          }
        >
          Back to Orders
        </button>

      </div>
    );
  }


  // ================= NO ORDER =================

  if (!order) {

    return (

      <div className="container py-5">

        <div className="alert alert-warning">
          Order not found.
        </div>

      </div>
    );
  }


  return (

    <div className="container py-4">


      {/* ================= HEADER ================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Order #{order.orderId}
          </h2>

          <p className="text-muted mb-0">
            Complete order information
          </p>

        </div>


        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/admin/orders")
          }
        >
          ← Back to Orders
        </button>

      </div>


      {/* ================= STATUS ================= */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <div className="row">

            <div className="col-md-4">

              <small className="text-muted">
                Order Status
              </small>

              <div className="mt-2">

                <span
                  className={
                    `badge fs-6 ${getStatusClass(
                      order.status
                    )}`
                  }
                >
                  {order.status}
                </span>

              </div>

            </div>


            <div className="col-md-4">

              <small className="text-muted">
                Order Date
              </small>

              <p className="fw-semibold mt-2 mb-0">
                {formatDate(order.orderDate)}
              </p>

            </div>


            <div className="col-md-4">

              <small className="text-muted">
                Payment Method
              </small>

              <p className="fw-semibold mt-2 mb-0">
                {order.paymentMethod || "-"}
              </p>

            </div>

          </div>

        </div>

      </div>


      <div className="row g-4 mb-4">


        {/* ================= CUSTOMER ================= */}

        <div className="col-md-6">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-3">
                Customer Information
              </h5>


              <div className="mb-3">

                <small className="text-muted">
                  Customer ID
                </small>

                <p className="fw-semibold mb-0">
                  {order.userId}
                </p>

              </div>


              <div className="mb-3">

                <small className="text-muted">
                  Mobile
                </small>

                <p className="fw-semibold mb-0">
                  {order.mobile || "-"}
                </p>

              </div>


              <div>

                <small className="text-muted">
                  Pincode
                </small>

                <p className="fw-semibold mb-0">
                  {order.pincode || "-"}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= SHIPPING ================= */}

        <div className="col-md-6">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-3">
                Shipping Information
              </h5>


              <small className="text-muted">
                Shipping Address
              </small>

              <p className="fw-semibold mt-2">
                {order.shippingAddress || "-"}
              </p>


              <small className="text-muted">
                Pincode
              </small>

              <p className="fw-semibold mb-0">
                {order.pincode || "-"}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ================= ORDER ITEMS ================= */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Order Items
          </h5>


          {!order.items || order.items.length === 0 ? (

            <div className="alert alert-light">
              No items found for this order.
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">

                  <tr>

                    <th>Product ID</th>

                    <th>Price</th>

                    <th>Quantity</th>

                    <th>Total</th>

                  </tr>

                </thead>


                <tbody>

                  {order.items.map(
                    (item, index) => (

                      <tr
                        key={`${item.productId}-${index}`}
                      >

                        <td>
                          #{item.productId}
                        </td>


                        <td>
                          {formatAmount(item.price)}
                        </td>


                        <td>
                          {item.quantity}
                        </td>


                        <td className="fw-semibold">
                          {formatAmount(
                            item.totalPrice
                          )}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* ================= PRICE SUMMARY ================= */}

      <div className="row justify-content-end">

        <div className="col-md-5 col-lg-4">

          <div className="card shadow-sm border-0">

            <div className="card-body">

              <h5 className="fw-bold mb-4">
                Payment Summary
              </h5>


              <div className="d-flex justify-content-between mb-3">

                <span>
                  Subtotal
                </span>

                <span>
                  {formatAmount(order.subtotal)}
                </span>

              </div>


              <div className="d-flex justify-content-between mb-3">

                <span>
                  Tax
                </span>

                <span>
                  {formatAmount(order.tax)}
                </span>

              </div>


              <hr />


              <div className="d-flex justify-content-between">

                <h5 className="fw-bold">
                  Total
                </h5>

                <h5 className="fw-bold text-success">
                  {formatAmount(
                    order.totalAmount
                  )}
                </h5>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetailsAdmin;