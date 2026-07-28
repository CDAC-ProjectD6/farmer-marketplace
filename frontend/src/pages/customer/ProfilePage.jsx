import { useEffect, useState } from "react";
import profileService from "../../services/profileService";

const ProfilePage = () => {

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });


  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });


  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("info");



  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response =
          await profileService.getProfile();


        setProfile(response);


        setFormData({
          name: response.name,
          mobile: response.mobile,
        });


      } catch(error) {

        console.error(
          "Profile fetch error:",
          error
        );


        setMessage(
          "Unable to load profile"
        );

        setMessageType("danger");


      } finally {

        setLoading(false);

      }

    };


    fetchProfile();

  }, []);





  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handlePasswordChange = (e) => {

    setPasswordData({

      ...passwordData,

      [e.target.name]: e.target.value,

    });

  };





  const handleUpdate = async (e) => {

    e.preventDefault();


    try {

      const updatedProfile =
        await profileService.updateProfile(formData);


      setProfile(updatedProfile);


      setEditMode(false);


      setMessage(
        "Profile updated successfully"
      );


      setMessageType("success");


    } catch(error) {


      console.error(error);


      setMessage(
        "Failed to update profile"
      );


      setMessageType("danger");

    }

  };





  const handleChangePassword = async (e) => {

    e.preventDefault();


    try {


      await profileService.changePassword(
        passwordData
      );


      setPasswordData({

        currentPassword: "",

        newPassword: "",

      });


      setMessage(
        "Password changed successfully"
      );


      setMessageType("success");


    } catch(error) {


      console.error(error);


      setMessage(
        error.response?.data?.message ||
        "Failed to change password"
      );


      setMessageType("danger");

    }

  };





  const handleCancel = () => {

    setFormData({

      name: profile?.name || "",

      mobile: profile?.mobile || "",

    });


    setEditMode(false);

  };





  if(loading){

    return (

      <div className="container mt-5">

        <h3>
          Loading profile...
        </h3>

      </div>

    );

  }





  if(!profile){

    return (

      <div className="container mt-5">

        <div className="alert alert-danger">

          Profile not found

        </div>

      </div>

    );

  }





  return (

    <div className="container mt-5 mb-5">


      <h2>
        My Profile
      </h2>




      {
        message &&

        <div className={`alert alert-${messageType} mt-3`}>

          {message}

        </div>

      }




      {/* Profile Information */}

      <div className="card mt-4 shadow-sm">


        <div className="card-header">

          <h5>
            Profile Information
          </h5>

        </div>


        <div className="card-body">


          {
            editMode ?


            (

              <form onSubmit={handleUpdate}>


                <div className="mb-3">

                  <label className="form-label">
                    Name
                  </label>


                  <input

                    className="form-control"

                    name="name"

                    value={formData.name}

                    onChange={handleChange}

                  />

                </div>



                <div className="mb-3">

                  <label className="form-label">
                    Mobile
                  </label>


                  <input

                    className="form-control"

                    name="mobile"

                    value={formData.mobile}

                    onChange={handleChange}

                  />

                </div>



                <button className="btn btn-success me-2">

                  Save

                </button>


                <button

                  type="button"

                  className="btn btn-secondary"

                  onClick={handleCancel}

                >

                  Cancel

                </button>


              </form>


            )



            :


            (

              <>

                <p>
                  <strong>Name:</strong> {profile.name}
                </p>


                <p>
                  <strong>Email:</strong> {profile.email}
                </p>


                <p>
                  <strong>Mobile:</strong> {profile.mobile}
                </p>


                <p>
                  <strong>Role:</strong> {profile.role}
                </p>


                <button

                  className="btn btn-primary"

                  onClick={() => setEditMode(true)}

                >

                  Edit Profile

                </button>


              </>


            )

          }


        </div>


      </div>





      {/* Change Password */}


      <div className="card mt-4 shadow-sm">


        <div className="card-header">

          <h5>
            Change Password
          </h5>

        </div>



        <div className="card-body">


          <form onSubmit={handleChangePassword}>


            <div className="mb-3">

              <label className="form-label">
                Current Password
              </label>


              <input

                type="password"

                className="form-control"

                name="currentPassword"

                value={passwordData.currentPassword}

                onChange={handlePasswordChange}

                required

              />

            </div>





            <div className="mb-3">

              <label className="form-label">
                New Password
              </label>


              <input

                type="password"

                className="form-control"

                name="newPassword"

                value={passwordData.newPassword}

                onChange={handlePasswordChange}

                required

              />

            </div>




            <button

              className="btn btn-warning"

            >

              Change Password

            </button>


          </form>


        </div>


      </div>


    </div>

  );

};


export default ProfilePage;