import { useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../../services/orderService";


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







  const placeOrder = async () => {


    try {


      setLoading(true);



      const response =
        await orderService.placeOrder(order);



      console.log(
        "Order Placed:",
        response
      );



      alert("Order placed successfully!");



      navigate("/order-success", {

        state: response

      });



    }
    catch(error){


      console.error(
        "Order Failed:",
        error
      );


      alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to place order"
      );


    }
    finally{


      setLoading(false);


    }


  };








  return (


    <div className="container py-5">


      <h2 className="fw-bold mb-4">
        Checkout
      </h2>





      <div className="row g-4">





        {/* Delivery Details */}


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









              {/* UPDATED PAYMENT METHOD */}


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

                    UPI Payment

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










        {/* Summary */}


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

                  ?

                  "Placing Order..."

                  :

                  "Place Order"

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