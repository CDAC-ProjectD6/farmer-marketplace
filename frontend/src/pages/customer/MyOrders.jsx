import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderService from "../../services/orderService";


function MyOrders() {


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);




  async function loadOrders() {


    try {


      const data = await orderService.getMyOrders();


      console.log("My Orders:", data);


      setOrders(data);



    }
    catch(error){


      console.error(
        "Failed to load orders:",
        error
      );


    }
    finally{


      setLoading(false);


    }


  }


  useEffect(() => {

    loadOrders();

  }, []);






  async function loadOrders() {


    try {


      const data = await orderService.getMyOrders();


      console.log("My Orders:", data);


      setOrders(data);



    }
    catch(error){


      console.error(
        "Failed to load orders:",
        error
      );


    }
    finally{


      setLoading(false);


    }


  }







  const cancelOrder = async(orderId)=>{


    try{


      await orderService.cancelOrder(orderId);


      alert(
        "Order cancelled successfully"
      );


      loadOrders();


    }
    catch(error){


      console.error(error);


      alert(
        "Unable to cancel order"
      );


    }


  };







  if(loading){


    return(

      <div className="container py-5 text-center">

        <h4>
          Loading Orders...
        </h4>

      </div>

    );


  }






  if(orders.length === 0){


    return(

      <div className="container py-5 text-center">


        <h2>
          No Orders Found
        </h2>


        <p className="text-muted">
          You have not placed any orders yet.
        </p>



        <Link
          to="/products"
          className="btn btn-success"
        >
          Start Shopping
        </Link>


      </div>

    );


  }








  return(


    <div className="container py-5">


      <h2 className="fw-bold mb-4">
        My Orders
      </h2>





      <div className="row g-4">


        {
          orders.map((order)=>(


            <div
              className="col-lg-6"
              key={order.orderId}
            >


              <div className="card shadow-sm h-100">


                <div className="card-body">



                  <div className="d-flex justify-content-between align-items-center mb-3">


                    <h5 className="fw-bold">
                      Order #{order.orderId}
                    </h5>


                    <span
                      className={
                        order.status === "CANCELLED"
                        ?
                        "badge bg-danger"
                        :
                        "badge bg-success"
                      }
                    >
                      {order.status}
                    </span>


                  </div>






                  <p>
                    <strong>
                      Payment:
                    </strong>
                    {" "}
                    {order.paymentMethod}
                  </p>





                  <p>
                    <strong>
                      Address:
                    </strong>
                    {" "}
                    {order.shippingAddress}
                  </p>





                  <p>
                    <strong>
                      Total:
                    </strong>
                    {" "}
                    ₹{order.totalAmount}
                  </p>






                  <div className="mt-3">


                    <Link

                      to={`/orders/${order.orderId}`}

                      className="btn btn-primary me-2"

                    >
                      View Details

                    </Link>





                    {
                      order.status !== "CANCELLED" &&

                      <button

                        className="btn btn-outline-danger"

                        onClick={()=>
                          cancelOrder(order.orderId)
                        }

                      >

                        Cancel

                      </button>

                    }



                  </div>




                </div>


              </div>


            </div>


          ))
        }



      </div>



    </div>


  );


}


export default MyOrders;