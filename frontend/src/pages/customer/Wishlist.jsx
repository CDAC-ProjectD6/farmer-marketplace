import { useEffect, useState } from "react";

import {
    getWishlist,
    removeFromWishlist
} from "../../services/wishlistService";


function Wishlist() {


    const [wishlist, setWishlist] = useState([]);

    const [loading, setLoading] = useState(true);



    // ================= LOAD WISHLIST =================

    const loadWishlist = async () => {


        try {


            setLoading(true);


            const data = await getWishlist();


            console.log(
                "Wishlist Data:",
                data
            );


            setWishlist(data || []);



        }
        catch(error) {


            console.error(
                "Wishlist Error:",
                error
            );


            setWishlist([]);


        }
        finally {


            setLoading(false);


        }


    };




    useEffect(() => {


        const initWishlist = async () => {


            await loadWishlist();


        };


        initWishlist();


    }, []);





    // ================= REMOVE ITEM =================

    const handleRemove = async(productId) => {


        try {


            await removeFromWishlist(
                productId
            );


            loadWishlist();



        }
        catch(error) {


            console.error(
                "Remove Wishlist Error:",
                error
            );


        }


    };






    // ================= LOADING =================

    if(loading) {


        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-success"
                    role="status"
                />

                <p className="mt-3 text-muted">
                    Loading Wishlist...
                </p>

            </div>

        );


    }






    // ================= EMPTY =================

    if(wishlist.length === 0) {


        return (

            <div className="container py-5 text-center">


                <h3>
                    Your Wishlist is Empty ❤️
                </h3>


                <p className="text-muted">
                    Add your favourite products to wishlist.
                </p>


            </div>

        );


    }






    // ================= UI =================

    return (


        <div className="container py-5">


            <h2 className="fw-bold mb-4">
                My Wishlist ❤️
            </h2>





            <div className="row g-4">


                {
                    wishlist.map((item) => (


                        <div
                            className="col-md-4"
                            key={item.id}
                        >


                            <div className="card shadow-sm h-100">



                                {
                                    item.imageUrl ?


                                    <img
                                        src={`http://localhost:5173${item.imageUrl}`}
                                        alt={item.productName}
                                        className="card-img-top"
                                        style={{
                                            height:"220px",
                                            objectFit:"cover"
                                        }}
                                    />


                                    :


                                    <div
                                        className="bg-light d-flex align-items-center justify-content-center"
                                        style={{
                                            height:"220px",
                                            fontSize:"60px"
                                        }}
                                    >
                                        🌱
                                    </div>


                                }





                                <div className="card-body d-flex flex-column">



                                    <h5 className="fw-bold">
                                        {item.productName}
                                    </h5>



                                    <p className="text-muted">

                                        {item.description}

                                    </p>




                                    <h5 className="text-success fw-bold">

                                        ₹{item.price}

                                    </h5>





                                    <div className="mt-auto">


                                        <button

                                            className="btn btn-outline-danger w-100"

                                            onClick={() =>
                                                handleRemove(
                                                    item.productId
                                                )
                                            }

                                        >

                                            Remove from Wishlist

                                        </button>


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


export default Wishlist;