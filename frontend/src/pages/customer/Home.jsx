import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getActiveCategories,
} from "../../services/categoryService";

import {
  getAvailableProducts,
} from "../../services/productService";

import wishlistService from "../../services/wishlistService";


function Home() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [wishlistMessage, setWishlistMessage] = useState("");



  // ================= LOAD HOME DATA =================

  useEffect(() => {

    const loadHomeData = async () => {

      try {

        setLoading(true);

        const [
          categoryData,
          productData
        ] = await Promise.all([
          getActiveCategories(),
          getAvailableProducts()
        ]);


        setCategories(categoryData || []);

        setProducts(productData || []);


      } catch(error) {

        console.error(
          "Unable to load home page:",
          error
        );

      }
      finally {

        setLoading(false);

      }

    };


    loadHomeData();


  }, []);





  const featuredProducts = products.slice(0,8);





  // ================= CATEGORY CLICK =================

  const handleCategoryClick = (categoryId) => {

    navigate(
      `/products?category=${categoryId}`
    );

  };





  // ================= ADD WISHLIST =================

  const handleAddWishlist = async(productId)=>{

    try {


      const email =
        localStorage.getItem("email");


      if(!email){

        alert(
          "Please login first"
        );

        navigate("/login");

        return;

      }



   await wishlistService.addToWishlist(productId);



      setWishlistMessage(
        "Product added to wishlist ❤️"
      );



      setTimeout(()=>{

        setWishlistMessage("");

      },2000);



    }
    catch(error){

      console.error(
        "Wishlist error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Unable to add wishlist"
      );


    }


  };







  return (

    <div>


      {/* HERO */}

      <section className="bg-light py-5">

        <div className="container py-4">

          <div className="row align-items-center">


            <div className="col-lg-7">


              <span className="badge bg-success mb-3">

                🌾 Farm Fresh Marketplace

              </span>



              <h1 className="display-4 fw-bold mb-3">

                Fresh From Farmers,

                <span className="text-success">

                  {" "}Directly To You

                </span>


              </h1>



              <p className="lead text-muted mb-4">

                Discover fresh farm products directly
                from local farmers.

              </p>




              <div className="d-flex gap-3 flex-wrap">


                <Link
                  to="/products"
                  className="btn btn-success btn-lg"
                >

                  Shop Products

                </Link>



                <Link
                  to="/categories"
                  className="btn btn-outline-success btn-lg"
                >

                  Browse Categories

                </Link>



              </div>


            </div>





            <div className="col-lg-5 text-center mt-4">


              <div
                className="bg-success-subtle rounded-4 p-5"
                style={{
                  fontSize:"100px"
                }}
              >

                🌾

              </div>


            </div>


          </div>

        </div>

      </section>






      {/* CATEGORIES */}

      <section className="py-5">

        <div className="container">


          <h2 className="fw-bold mb-4">

            Browse Categories

          </h2>



          {
            categories.length === 0 ?


            (

              <div className="alert alert-light border">

                No categories available.

              </div>

            )


            :


            (

              <div className="row g-3">


                {
                  categories.map(category=>(


                    <div
                      className="col-md-3"
                      key={category.id}
                    >


                      <button

                        className="btn btn-outline-success w-100 p-4 text-start"

                        onClick={() =>
                          handleCategoryClick(
                            category.id
                          )
                        }

                      >


                        <h5 className="fw-bold">

                          {category.name}

                        </h5>


                        <small>

                          {category.description ||
                          "View products"}

                        </small>


                      </button>


                    </div>


                  ))
                }


              </div>


            )

          }



        </div>


      </section>








      {/* PRODUCTS */}

      <section className="bg-light py-5">


        <div className="container">


          <div className="d-flex justify-content-between mb-4">


            <h2 className="fw-bold">

              Fresh Products

            </h2>



            <Link
              to="/products"
              className="text-success"
            >

              View All

            </Link>


          </div>




          {
            wishlistMessage &&

            (

              <div className="alert alert-success">

                {wishlistMessage}

              </div>

            )

          }






          {
            loading ?


            (

              <div className="text-center">

                Loading products...

              </div>

            )


            :


            (

              <div className="row g-4">


                {
                  featuredProducts.map(product=>(


                    <div
                      className="col-lg-3 col-md-4 col-sm-6"
                      key={product.id}
                    >


                      <div className="card shadow-sm h-100">


                        {
                          product.imageUrl ?


                          (

                            <img

                              src={product.imageUrl}

                              alt={product.name}

                              className="card-img-top"

                              style={{
                                height:"200px",
                                objectFit:"cover"
                              }}

                            />

                          )


                          :

                          (

                            <div

                              className="bg-success-subtle d-flex justify-content-center align-items-center"

                              style={{
                                height:"200px",
                                fontSize:"60px"
                              }}

                            >

                              🥬

                            </div>

                          )


                        }




                        <div className="card-body d-flex flex-column">


                          <h5 className="fw-bold">

                            {product.name}

                          </h5>



                          <p className="text-success fw-bold">

                            ₹{product.price}

                          </p>



                          <p className="text-muted">

                            Stock: {product.stock}

                          </p>



                          <div className="mt-auto d-flex gap-2">


                            <Link

                              to={`/products/${product.id}`}

                              className="btn btn-outline-success flex-fill"

                            >

                              View

                            </Link>



                            <button

                              className="btn btn-success"

                              disabled={
                                product.stock <= 0
                              }

                              onClick={() =>
                                handleAddWishlist(
                                  product.id
                                )
                              }

                            >

                              ❤️

                            </button>


                          </div>


                        </div>


                      </div>


                    </div>


                  ))
                }


              </div>


            )

          }



        </div>


      </section>







      {/* WHY FARMHUB */}

      <section className="py-5">

        <div className="container text-center">


          <h2 className="fw-bold mb-5">

            Why Choose FarmHub?

          </h2>



          <div className="row g-4">


            <div className="col-md-4">

              <h1>🌱</h1>

              <h5>

                Fresh Products

              </h5>


              <p className="text-muted">

                Fresh agricultural products.

              </p>


            </div>




            <div className="col-md-4">

              <h1>👨‍🌾</h1>

              <h5>

                Direct From Farmers

              </h5>


              <p className="text-muted">

                Connect directly with farmers.

              </p>


            </div>




            <div className="col-md-4">

              <h1>🛒</h1>

              <h5>

                Easy Shopping

              </h5>


              <p className="text-muted">

                Simple marketplace experience.

              </p>


            </div>



          </div>


        </div>


      </section>



    </div>

  );

}


export default Home;