import { useEffect, useState } from "react";

import {
    getProductReviews,
    addReview,
    updateReview,
    deleteReview
} from "../../services/reviewService";


function ReviewSection({ productId }) {


    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);


    // edit states

    const [editId, setEditId] = useState(null);

    const [editRating, setEditRating] = useState(5);

    const [editComment, setEditComment] = useState("");




    const loadReviews = async () => {

        try {

            setLoading(true);

            const data =
                await getProductReviews(productId);

            setReviews(data);

        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };




    useEffect(()=>{

        loadReviews();

    },[productId]);






    // ================= ADD REVIEW =================


    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{


            await addReview(
                productId,
                {
                    rating,
                    comment
                }
            );


            setRating(5);

            setComment("");


            loadReviews();


        }
        catch(error){

            console.log(error);

        }

    };







    // ================= DELETE REVIEW =================


    const handleDelete = async(id)=>{


        try{


            await deleteReview(id);


            loadReviews();


        }
        catch(error){

            console.log(error);

        }


    };







    // ================= START EDIT =================


    const startEdit = (review)=>{


        setEditId(review.id);

        setEditRating(review.rating);

        setEditComment(review.comment);


    };







    // ================= UPDATE REVIEW =================


    const handleUpdate = async(id)=>{


        try{


            await updateReview(

                id,

                {
                    rating: editRating,
                    comment: editComment
                }

            );



            setEditId(null);


            loadReviews();



        }
        catch(error){

            console.log(error);

        }


    };







    return (

        <div className="mt-5">


            <h3 className="fw-bold mb-4">

                Customer Reviews ⭐

            </h3>





            {/* ADD REVIEW */}


            <div className="card shadow-sm mb-4">


                <div className="card-body">


                    <h5>
                        Write a Review
                    </h5>



                    <form onSubmit={handleSubmit}>


                        <select

                            className="form-select mb-3"

                            value={rating}

                            onChange={(e)=>
                                setRating(
                                    Number(e.target.value)
                                )
                            }

                        >

                            <option value="5">
                                ⭐⭐⭐⭐⭐ 5
                            </option>

                            <option value="4">
                                ⭐⭐⭐⭐ 4
                            </option>

                            <option value="3">
                                ⭐⭐⭐ 3
                            </option>

                            <option value="2">
                                ⭐⭐ 2
                            </option>

                            <option value="1">
                                ⭐ 1
                            </option>


                        </select>





                        <textarea

                            className="form-control mb-3"

                            rows="3"

                            placeholder="Write your experience..."

                            value={comment}

                            onChange={(e)=>
                                setComment(
                                    e.target.value
                                )
                            }

                            required

                        />




                        <button

                            className="btn btn-success"

                        >

                            Submit Review

                        </button>



                    </form>


                </div>


            </div>








            {/* REVIEW LIST */}



            {
                loading ?

                (

                    <h5>
                        Loading reviews...
                    </h5>

                )

                :

                reviews.length===0 ?

                (

                    <div className="alert alert-info">

                        No reviews yet

                    </div>

                )


                :


                reviews.map(review=>(


                    <div

                    className="card mb-3 shadow-sm"

                    key={review.id}

                    >


                        <div className="card-body">



                            <h6 className="fw-bold">

                                {review.userName || "Customer"}

                            </h6>




                            {
                                editId === review.id ?

                                (

                                    <>


                                    <select

                                    className="form-select mb-2"

                                    value={editRating}

                                    onChange={(e)=>
                                        setEditRating(
                                            Number(e.target.value)
                                        )
                                    }

                                    >

                                        <option value="5">
                                            ⭐⭐⭐⭐⭐ 5
                                        </option>

                                        <option value="4">
                                            ⭐⭐⭐⭐ 4
                                        </option>

                                        <option value="3">
                                            ⭐⭐⭐ 3
                                        </option>

                                        <option value="2">
                                            ⭐⭐ 2
                                        </option>

                                        <option value="1">
                                            ⭐ 1
                                        </option>


                                    </select>





                                    <textarea

                                    className="form-control mb-2"

                                    value={editComment}

                                    onChange={(e)=>
                                        setEditComment(
                                            e.target.value
                                        )
                                    }

                                    />





                                    <button

                                    className="btn btn-success btn-sm me-2"

                                    onClick={()=>
                                        handleUpdate(review.id)
                                    }

                                    >

                                        Save

                                    </button>




                                    <button

                                    className="btn btn-secondary btn-sm"

                                    onClick={()=>
                                        setEditId(null)
                                    }

                                    >

                                        Cancel

                                    </button>



                                    </>


                                )


                                :


                                (

                                    <>

                                    <div>

                                        {"⭐".repeat(review.rating)}

                                    </div>


                                    <p>

                                        {review.comment}

                                    </p>



                                    <button

                                    className="btn btn-sm btn-outline-primary me-2"

                                    onClick={()=>
                                        startEdit(review)
                                    }

                                    >

                                        Edit

                                    </button>





                                    <button

                                    className="btn btn-sm btn-outline-danger"

                                    onClick={()=>
                                        handleDelete(review.id)
                                    }

                                    >

                                        Delete

                                    </button>


                                    </>

                                )

                            }




                        </div>


                    </div>


                ))

            }



        </div>

    );

}


export default ReviewSection;