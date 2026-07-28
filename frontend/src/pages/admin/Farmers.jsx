import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getFarmers,
  approveFarmer,
  rejectFarmer,
} from "../../services/adminFarmerService";


function Farmers() {

  const [farmers, setFarmers] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [processingId, setProcessingId] = useState(null);



  // ================= LOAD FARMERS =================

  const loadFarmers = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getFarmers(
        search,
        status
      );

      setFarmers(data || []);

    }
    catch(err){

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load farmers."
      );

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    loadFarmers();

  },[]);




  // ================= SEARCH =================

  const handleSearch = (e)=>{

    e.preventDefault();

    loadFarmers();

  };




  // ================= FILTER =================

  const handleStatusChange = (e)=>{

    const value = e.target.value;

    setStatus(value);

    setTimeout(()=>{
      loadFarmers();
    },100);

  };




  // ================= APPROVE =================

  const handleApprove = async(id)=>{


    if(
      !window.confirm(
        "Approve this farmer?"
      )
    )
    return;



    try{

      setProcessingId(id);

      await approveFarmer(id);


      setMessage(
        "Farmer approved successfully."
      );


      loadFarmers();


    }
    catch(err){

      setError(
        err.response?.data?.message ||
        "Unable to approve farmer."
      );

    }
    finally{

      setProcessingId(null);

    }


  };





  // ================= REJECT =================


  const handleReject = async(id)=>{


    if(
      !window.confirm(
        "Reject this farmer?"
      )
    )
    return;



    try{

      setProcessingId(id);


      await rejectFarmer(id);



      setMessage(
        "Farmer rejected successfully."
      );


      loadFarmers();


    }
    catch(err){

      setError(
        err.response?.data?.message ||
        "Unable to reject farmer."
      );

    }
    finally{

      setProcessingId(null);

    }


  };





  const getStatusBadge = (value)=>{

    switch(value){

      case "APPROVED":
        return "bg-success";

      case "REJECTED":
        return "bg-danger";

      case "PENDING":
        return "bg-warning text-dark";

      default:
        return "bg-secondary";

    }

  };





  return (

    <div className="container py-4">


      <div className="mb-4">

        <h2 className="fw-bold">
          Farmer Approval
        </h2>

        <p className="text-muted">
          Review and manage farmer registrations.
        </p>

      </div>





      {
        message &&

        <div className="alert alert-success">

          {message}

        </div>

      }




      {
        error &&

        <div className="alert alert-danger">

          {error}

        </div>

      }






      {/* SEARCH FILTER */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">


          <form
            onSubmit={handleSearch}
            className="row g-3"
          >


            <div className="col-md-6">

              <label className="form-label">
                Search Farmer
              </label>


              <input

                className="form-control"

                placeholder="Name or email"

                value={search}

                onChange={(e)=>
                  setSearch(e.target.value)
                }

              />

            </div>




            <div className="col-md-3">


              <label className="form-label">
                Status
              </label>


              <select

                className="form-select"

                value={status}

                onChange={handleStatusChange}

              >

                <option value="">
                  All
                </option>

                <option value="PENDING">
                  Pending
                </option>

                <option value="APPROVED">
                  Approved
                </option>

                <option value="REJECTED">
                  Rejected
                </option>


              </select>


            </div>




            <div className="col-md-3 d-flex align-items-end">


              <button
                className="btn btn-success w-100"
              >

                Search

              </button>


            </div>



          </form>


        </div>

      </div>






      {/* TABLE */}


      <div className="card shadow-sm">


        <div className="card-body">


        {
          loading ?


          (

            <div className="text-center py-5">

              <div className="spinner-border text-success"/>

              <p className="mt-3">
                Loading farmers...
              </p>

            </div>

          )


          :


          (

          <div className="table-responsive">


            <table className="table table-hover align-middle">


              <thead className="table-light">


                <tr>

                  <th>ID</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Mobile</th>

                  <th>Status</th>

                  <th>Actions</th>


                </tr>


              </thead>



              <tbody>


              {
                farmers.length===0 ?


                (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center"
                    >
                      No farmers found
                    </td>

                  </tr>

                )


                :


                farmers.map((farmer)=>(


                  <tr key={farmer.id}>


                    <td>
                      {farmer.id}
                    </td>


                    <td className="fw-semibold">
                      {farmer.name}
                    </td>


                    <td>
                      {farmer.email}
                    </td>


                    <td>
                      {farmer.mobile}
                    </td>


                    <td>

                      <span
                        className={`badge ${getStatusBadge(
                          farmer.approvalStatus
                        )}`}
                      >

                        {farmer.approvalStatus}

                      </span>


                    </td>



                    <td>


                      <Link
                        to={`/admin/farmers/${farmer.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >

                        View

                      </Link>



                      {
                        farmer.approvalStatus==="PENDING" &&

                        <>


                        <button

                          className="btn btn-sm btn-success me-2"

                          disabled={
                            processingId===farmer.id
                          }

                          onClick={()=>
                            handleApprove(farmer.id)
                          }

                        >

                          Approve

                        </button>



                        <button

                          className="btn btn-sm btn-danger"

                          disabled={
                            processingId===farmer.id
                          }

                          onClick={()=>
                            handleReject(farmer.id)
                          }

                        >

                          Reject

                        </button>


                        </>

                      }


                    </td>


                  </tr>


                ))

              }



              </tbody>


            </table>


          </div>

          )

        }


        </div>


      </div>


    </div>

  );

}


export default Farmers;