import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

function FarmerOrderDetails() {

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
          `/farmer/orders/${orderId}`
        );

        setOrder(response.data);

      } catch (error) {

        console.error(
          "Failed to load farmer order:",
          error
        );

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


  // ================= FORMAT DATE =================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString();
  };


  // ================= FORMAT AMOUNT =================

  const formatAmount = (amount) => {

    if (
      amount === null ||
      amount === undefined
    ) {
      return "₹0.00";
    }

    return `₹${Number(amount).toFixed(2)}`;
  };


  // ================= LOADING =================

  if (loading) {

    return (

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-success"
          role="status"
        />

        <p className="text-muted mt-3">
          Loading order details...
        </p>

      </div>
    );
  }


  // ================= ERROR =================

  if (error) {

    return (

      <div className="container py-4">

        <div className="alert alert-danger">
          {error}
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/farmer/orders")
          }
        >
          Back to Orders
        </button>

      </div>
    );
  }


  if (!order) {
    return null;
  }


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
            Order #{order.orderId}
          </h2>

          <p className="text-muted mb-0">
            Farmer Order Details
          </p>

        </div>


        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/farmer/orders")
          }
        >
          ← Back to Orders
        </button>

      </div>


      {/* ================= ORDER SUMMARY ================= */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-4">

            <div className="col-md-3">

              <small className="text-muted">
                Order ID
              </small>

              <div className="fw-semibold">
                #{order.orderId}
              </div>

            </div>


            <div className="col-md-3">

              <small className="text-muted">
                Order Date
              </small>

              <div className="fw-semibold">
                {formatDate(order.orderDate)}
              </div>

            </div>


            <div className="col-md-3">

              <small className="text-muted">
                Payment Method
              </small>

              <div className="fw-semibold">
                {order.paymentMethod || "-"}
              </div>

            </div>


            <div className="col-md-3">

              <small className="text-muted">
                Status
              </small>

              <div className="mt-1">

                <span
                  className={
                    `badge ${getStatusClass(
                      order.status
                    )}`
                  }
                >
                  {order.status}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= CUSTOMER + SHIPPING ================= */}

      <div className="row g-4 mb-4">


        {/* CUSTOMER */}

        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-3">
                Customer Details
              </h5>


              <div className="mb-3">

                <small className="text-muted">
                  Name
                </small>

                <div className="fw-semibold">
                  {order.customerName || "-"}
                </div>

              </div>


              <div className="mb-3">

                <small className="text-muted">
                  Email
                </small>

                <div>
                  {order.customerEmail || "-"}
                </div>

              </div>


              <div>

                <small className="text-muted">
                  Mobile
                </small>

                <div>
                  {order.mobile || "-"}
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* SHIPPING */}

        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-3">
                Shipping Details
              </h5>


              <div className="mb-3">

                <small className="text-muted">
                  Address
                </small>

                <div>
                  {order.shippingAddress || "-"}
                </div>

              </div>


              <div>

                <small className="text-muted">
                  Pincode
                </small>

                <div>
                  {order.pincode || "-"}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= FARMER PRODUCTS ================= */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Your Products
          </h5>


          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>Product</th>

                  <th>Price</th>

                  <th>Quantity</th>

                  <th className="text-end">
                    Total
                  </th>

                </tr>

              </thead>


              <tbody>

                {order.items?.map((item) => (

                  <tr key={item.orderItemId}>

                    <td>

                      <div className="fw-semibold">
                        {item.productName}
                      </div>

                      <small className="text-muted">
                        Product ID: {item.productId}
                      </small>

                    </td>


                    <td>
                      {formatAmount(item.price)}
                    </td>


                    <td>
                      {item.quantity}
                    </td>


                    <td className="text-end fw-semibold">

                      {formatAmount(
                        item.totalPrice
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* ================= FARMER TOTAL ================= */}

        <div className="card-footer bg-white">

          <div
            className="
              d-flex
              justify-content-end
              align-items-center
              gap-4
              py-2
            "
          >

            <span className="fw-semibold">
              Your Order Total:
            </span>

            <span
              className="
                fs-4
                fw-bold
                text-success
              "
            >
              {formatAmount(
                order.farmerTotal
              )}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FarmerOrderDetails;