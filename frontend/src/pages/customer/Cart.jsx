import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cartService from "../../services/cartService";


function Cart() {


  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadCart();

  }, []);




  async function loadCart() {

    try {

      const data = await cartService.getCart();

      console.log("Cart Data:", data);

      setCart(data);

    }
    catch(error){

      console.error("Cart loading failed:", error);

      setCart(null);

    }
    finally{

      setLoading(false);

    }

  };





  const updateQuantity = async(cartItemId, quantity)=>{


    try{


      if(quantity < 1){
        return;
      }


      const updatedCart =
        await cartService.updateCart(
          cartItemId,
          quantity
        );


      setCart(updatedCart);


    }
    catch(error){

      console.error(error);

      alert("Quantity update failed");

    }


  };







  const removeItem = async(cartItemId)=>{


    try{


      await cartService.removeCartItem(cartItemId);


      loadCart();


    }
    catch(error){

      console.error(error);

      alert("Remove failed");

    }


  };







  const clearCart = async()=>{


    try{


      await cartService.clearCart();


      setCart({
        items:[]
      });



    }
    catch(error){

      console.error(error);

      alert("Clear cart failed");

    }


  };







  if(loading){


    return(

      <div className="container text-center py-5">

        <h4>
          Loading Cart...
        </h4>

      </div>

    );


  }







  if(!cart || !cart.items || cart.items.length === 0){


    return(

      <div className="container py-5 text-center">


        <h1 className="mb-3">
          Your Cart is Empty
        </h1>


        <p className="text-muted">
          Add fresh products from farmers and continue shopping.
        </p>



        <Link
          to="/products"
          className="btn btn-success mt-3"
        >
          Continue Shopping
        </Link>



      </div>

    );


  }









  return(


    <div className="container py-5">


      <div className="d-flex justify-content-between align-items-center mb-4">


        <h2 className="fw-bold">
          My Cart
        </h2>



        <button
          className="btn btn-danger"
          onClick={clearCart}
        >
          Clear Cart
        </button>


      </div>







      <div className="row g-4">



        {/* Cart Products */}


        <div className="col-lg-8">



          {
            cart.items.map((item)=>(



              <div
                className="card shadow-sm mb-3"
                key={item.cartItemId}
              >


                <div className="card-body">



                  <div className="row align-items-center">



                    <div className="col-md-3">


                      <img
                        src={
                          item.imageUrl ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.productName}
                        className="img-fluid rounded"
                      />


                    </div>





                    <div className="col-md-4">


                      <h5 className="fw-bold">
                        {item.productName}
                      </h5>


                      <p className="text-muted mb-1">
                        Price: ₹{item.price}
                      </p>


                      <p className="fw-semibold">
                        Total: ₹{item.price * item.quantity}
                      </p>


                    </div>







                    <div className="col-md-3">


                      <div className="d-flex align-items-center gap-2">


                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={()=>
                            updateQuantity(
                              item.cartItemId,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>




                        <span className="fw-bold">
                          {item.quantity}
                        </span>





                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={()=>
                            updateQuantity(
                              item.cartItemId,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>



                      </div>



                    </div>







                    <div className="col-md-2">


                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={()=>
                          removeItem(item.cartItemId)
                        }
                      >
                        Remove
                      </button>


                    </div>



                  </div>



                </div>


              </div>



            ))

          }



        </div>









        {/* Order Summary */}


        <div className="col-lg-4">


          <div className="card shadow">


            <div className="card-body">


              <h4 className="fw-bold mb-4">
                Order Summary
              </h4>




              <div className="d-flex justify-content-between mb-3">

                <span>
                  Items
                </span>


                <span>
                  {cart.items.length}
                </span>


              </div>





              <div className="border-top pt-3 d-flex justify-content-between">


                <h5>
                  Total
                </h5>


                <h5>
                  ₹{cart.totalAmount}
                </h5>


              </div>





              <Link
                to="/checkout"
                className="btn btn-success w-100 mt-4"
              >
                Proceed To Checkout
              </Link>




            </div>


          </div>


        </div>



      </div>


    </div>


  );


}


export default Cart;