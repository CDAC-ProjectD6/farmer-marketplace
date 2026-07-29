import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state;

  return (
    <div className="container py-5">
      <div className="card shadow text-center">
        <div className="card-body p-5">
          <div className="mb-4">
            <h1 className="text-success">✓</h1>
          </div>

          <h2 className="fw-bold mb-3">Order Placed Successfully!</h2>

          <p className="text-muted">
            Thank you for shopping with our Farmer Marketplace.
          </p>

          {order && (
            <div className="mt-4">
              <h5>Order ID: #{order.orderId}</h5>

              <p>Payment Method: {order.paymentMethod}</p>

              <p>
                Status:{" "}
                <span
                  className={
                    order.status === "PAID"
                      ? "badge bg-success"
                      : "badge bg-warning text-dark"
                  }
                >
                  {order.status}
                </span>
              </p>
            </div>
          )}

          <div className="mt-4">
            <Link to="/orders" className="btn btn-success me-3">
              View My Orders
            </Link>

            <Link to="/products" className="btn btn-outline-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
