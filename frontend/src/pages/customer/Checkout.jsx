import { useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";

function Checkout() {

  const navigate = useNavigate();

  const [order, setOrder] = useState({
    shippingAddress: "",
    pincode: "",
    mobile: "",
    paymentMethod: "COD"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  // Open Razorpay
  const openRazorpay = async (placedOrder) => {

    const razorpayOrder =
      await paymentService.createOrder(
        placedOrder.totalAmount
      );

    let methodConfig = {};

    switch (order.paymentMethod) {

      case "UPI":

        methodConfig = {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false,
          emi: false
        };
        break;

      case "CARD":

        methodConfig = {
          upi: false,
          card: true,
          netbanking: false,
          wallet: false,
          emi: false
        };
        break;

      case "NET_BANKING":

        methodConfig = {
          upi: false,
          card: false,
          netbanking: true,
          wallet: false,
          emi: false
        };
        break;

      default:

        methodConfig = {};

    }

    const options = {

      key: razorpayOrder.key,

      amount: razorpayOrder.amount,

      currency: razorpayOrder.currency,

      order_id: razorpayOrder.razorpayOrderId,

      name: "Farmer Marketplace",

      description: "Order Payment",

      method: methodConfig,

      prefill: {

        name: "",

        email: "",

        contact: order.mobile

      },

      handler: async function (response) {

        try {

          await paymentService.verifyPayment({

            orderId: placedOrder.orderId,

            razorpayOrderId:
              response.razorpay_order_id,

            razorpayPaymentId:
              response.razorpay_payment_id,

            razorpaySignature:
              response.razorpay_signature

          });

          alert("Payment Successful");

          navigate("/order-success", {

            state: {
              ...placedOrder,
              status: "PAID"
            }

          });

        }
        catch (err) {

          console.error(err);

          alert("Payment verification failed");

        }

      },

      modal: {

        ondismiss: function () {

          alert(
            "Payment cancelled.\n\nYour order is saved as PENDING.\nYou can retry payment later."
          );

        }

      },

      theme: {

        color: "#198754"

      }

    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  };

  const placeOrder = async () => {

    try {

      setLoading(true);

      const placedOrder =
        await orderService.placeOrder(order);

      // COD
      if (order.paymentMethod === "COD") {

        alert("Order placed successfully");

        navigate("/order-success", {

          state: placedOrder

        });

        return;

      }

      // Online Payments
      await openRazorpay(placedOrder);

    }
    catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to place order"
      );

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div className="container py-5">

      <h2 className="fw-bold mb-4">
        Checkout
      </h2>

      <div className="row g-4">

        <div className="col-lg-7">

          <div className="card shadow-sm">

            <div className="card-body">

              <h4 className="mb-4">
                Delivery Information
              </h4>

              <div className="mb-3">

                <label className="form-label">
                  Shipping Address
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="shippingAddress"
                  value={order.shippingAddress}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Pincode
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={order.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Mobile Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={order.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Payment Method
                </label>

                <select
                  className="form-select"
                  name="paymentMethod"
                  value={order.paymentMethod}
                  onChange={handleChange}
                >

                  <option value="COD">
                    Cash On Delivery
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="CARD">
                    Debit / Credit Card
                  </option>

                  <option value="NET_BANKING">
                    Net Banking
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-5">

          <div className="card shadow-sm">

            <div className="card-body">

              <h4 className="mb-4">
                Order Summary
              </h4>

              <div className="d-flex justify-content-between mb-3">

                <span>
                  Payment
                </span>

                <span className="fw-bold">
                  {order.paymentMethod}
                </span>

              </div>

              <hr />

              <button
                className="btn btn-success w-100"
                onClick={placeOrder}
                disabled={loading}
              >

                {
                  loading
                    ? "Processing..."
                    : order.paymentMethod === "COD"
                    ? "Place Order"
                    : "Proceed To Payment"
                }

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Checkout;