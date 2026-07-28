import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import orderService from "../../services/orderService";


function OrderDetails() {


  const { orderId } = useParams();


  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);





  useEffect(() => {

    loadOrder();

  }, []);






  const loadOrder = async () => {


    try {


      const data = await orderService.getOrder(orderId);


      console.log(
        "Order Details:",
        data
      );


      setOrder(data);


    }
    catch(error){


      console.error(
        "Failed to load order:",
        error
      );


    }
    finally{


      setLoading(false);


    }


  };








  if(loading){


    return(

      <div className="container py-5 text-center">

        <h4>
          Loading Order Details...
        </h4>

      </div>

    );

  }







  if(!order){


    return(

      <div className="container py-5 text-center">

        <h3>
          Order not found
        </h3>

      </div>

    );

  }







  return(


    <div className="container py-5">


      <div className="d-flex justify-content-between align-items-center mb-4">


        <h2 className="fw-bold">
          Order Details
        </h2>



        <Link
          to="/orders"
          className="btn btn-outline-primary"
        >
          Back To Orders
        </Link>


      </div>






      <div className="card shadow-sm mb-4">


        <div className="card-body">


          <h5 className="fw-bold">
            Order #{order.orderId}
          </h5>



          <p>
            <strong>Status:</strong>{" "}

            <span className="badge bg-success">
              {order.status}
            </span>

          </p>





          <p>
            <strong>Payment:</strong>{" "}
            {order.paymentMethod}
          </p>





          <p>
            <strong>Shipping Address:</strong>{" "}
            {order.shippingAddress}
          </p>





          <p>
            <strong>Mobile:</strong>{" "}
            {order.mobile}
          </p>



        </div>


      </div>







      <div className="card shadow-sm">


        <div className="card-body">


          <h4 className="mb-4">
            Products
          </h4>





          {
            order.items && order.items.map((item)=>(


              <div
                key={item.orderItemId}
                className="border rounded p-3 mb-3"
              >


                <div className="d-flex justify-content-between">


                  <div>


                    <h5>
                      {item.productName}
                    </h5>


                    <p className="mb-1">
                      Quantity: {item.quantity}
                    </p>


                    <p>
                      Price: ₹{item.price}
                    </p>


                  </div>





                  <h5>
                    ₹{item.price * item.quantity}
                  </h5>



                </div>


              </div>


            ))

          }






          <hr />



          <h4 className="text-end">

            Total: ₹{order.totalAmount}

          </h4>



        </div>


      </div>



    </div>


  );


}


export default OrderDetails;