import { useState } from "react";
import orderService from "../../services/orderService";

const OrderTest = () => {

  const [order, setOrder] = useState({
    shippingAddress: "",
    pincode: "",
    mobile: "",
    paymentMethod: ""
  });

  const [response, setResponse] = useState(null);
  const [orderId, setOrderId] = useState("");



  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };



  const placeOrder = async () => {

    try {

      const data = await orderService.placeOrder(order);

      console.log("Order Created:", data);

      setResponse(data);

    } catch(error) {

      console.log(error);
      setResponse(error.response?.data);

    }

  };



  const getMyOrders = async () => {

    try {

      const data = await orderService.getMyOrders();

      console.log("My Orders:", data);

      setResponse(data);

    } catch(error){

      console.log(error);

    }

  };



  const getOrder = async () => {

    try {

      const data = await orderService.getOrder(orderId);

      console.log("Order:", data);

      setResponse(data);

    } catch(error){

      console.log(error);

    }

  };



  const cancelOrder = async () => {

    try {

      const data = await orderService.cancelOrder(orderId);

      console.log(data);

      setResponse(data);

    } catch(error){

      console.log(error);

    }

  };



return (

<div className="container py-5">

<h1>Order API Testing</h1>


<h3>Place Order</h3>


<input
name="shippingAddress"
placeholder="Shipping Address"
onChange={handleChange}
/>


<input
name="pincode"
placeholder="Pincode"
onChange={handleChange}
/>


<input
name="mobile"
placeholder="Mobile"
onChange={handleChange}
/>


<input
name="paymentMethod"
placeholder="Payment Method (COD/ONLINE)"
onChange={handleChange}
/>


<br/><br/>


<button onClick={placeOrder}>
Place Order
</button>



<hr/>


<h3>Get My Orders</h3>

<button onClick={getMyOrders}>
My Orders
</button>


<hr/>


<h3>Order By ID</h3>


<input
placeholder="Order ID"
value={orderId}
onChange={(e)=>setOrderId(e.target.value)}
/>


<button onClick={getOrder}>
Get Order
</button>



<button 
style={{marginLeft:"10px"}}
onClick={cancelOrder}
>
Cancel Order
</button>



<hr/>


<h3>Response</h3>

<pre>
{
JSON.stringify(response,null,2)
}
</pre>


</div>

);

};


export default OrderTest;