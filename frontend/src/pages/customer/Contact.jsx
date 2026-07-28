import { useState } from "react";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been received.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div>

      {/* ================= HEADER ================= */}
      <section className="bg-light py-5">
        <div className="container text-center py-4">

          <span className="badge bg-success mb-3">
            🌾 Contact FarmHub
          </span>

          <h1 className="fw-bold display-5">
            Get In Touch
          </h1>

          <p
            className="text-muted mx-auto mt-3"
            style={{ maxWidth: "650px" }}
          >
            Have a question about FarmHub? Send us a message and
            our team will be happy to help.
          </p>

        </div>
      </section>


      {/* ================= CONTACT ================= */}
      <section className="container py-5">

        <div className="row g-5">

          {/* LEFT SIDE */}
          <div className="col-lg-5">

            <h2 className="fw-bold mb-3">
              Contact Us
            </h2>

            <p className="text-muted mb-4">
              Whether you are a farmer interested in selling products
              or a customer looking for help, feel free to contact us.
            </p>


            {/* EMAIL */}
            <div className="d-flex mb-4">

              <div
                className="bg-success bg-opacity-10 rounded p-3 me-3"
                style={{ fontSize: "25px" }}
              >
                ✉️
              </div>

              <div>
                <h5 className="fw-bold mb-1">
                  Email
                </h5>

                <p className="text-muted mb-0">
                  support@farmhub.com
                </p>
              </div>

            </div>


            {/* PHONE */}
            <div className="d-flex mb-4">

              <div
                className="bg-success bg-opacity-10 rounded p-3 me-3"
                style={{ fontSize: "25px" }}
              >
                📞
              </div>

              <div>
                <h5 className="fw-bold mb-1">
                  Phone
                </h5>

                <p className="text-muted mb-0">
                  +91 XXXXX XXXXX
                </p>
              </div>

            </div>


            {/* LOCATION */}
            <div className="d-flex mb-4">

              <div
                className="bg-success bg-opacity-10 rounded p-3 me-3"
                style={{ fontSize: "25px" }}
              >
                📍
              </div>

              <div>
                <h5 className="fw-bold mb-1">
                  Location
                </h5>

                <p className="text-muted mb-0">
                  Pune, Maharashtra, India
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE - FORM */}
          <div className="col-lg-7">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4 p-md-5">

                <h3 className="fw-bold mb-4">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit}>

                  {/* NAME + EMAIL */}
                  <div className="row g-3">

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  {/* SUBJECT */}
                  <div className="mt-3">

                    <label className="form-label fw-semibold">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="Enter subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* MESSAGE */}
                  <div className="mt-3">

                    <label className="form-label fw-semibold">
                      Message
                    </label>

                    <textarea
                      name="message"
                      rows="5"
                      className="form-control"
                      placeholder="Write your message..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <button
                    type="submit"
                    className="btn btn-success px-4 mt-4"
                  >
                    Send Message
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HELP SECTION ================= */}
      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="fw-bold">
            We're Here to Help
          </h2>

          <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
            FarmHub aims to make buying and selling agricultural
            products simple for both farmers and customers.
          </p>

          <div className="row g-4 mt-3">

            <div className="col-md-4">
              <div className="bg-white shadow-sm rounded p-4 h-100">
                <div style={{ fontSize: "40px" }}>👨‍🌾</div>
                <h5 className="fw-bold mt-3">Farmer Support</h5>
                <p className="text-muted mb-0">
                  Get help with products, stock and orders.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white shadow-sm rounded p-4 h-100">
                <div style={{ fontSize: "40px" }}>🛒</div>
                <h5 className="fw-bold mt-3">Customer Support</h5>
                <p className="text-muted mb-0">
                  Get assistance while browsing and ordering products.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white shadow-sm rounded p-4 h-100">
                <div style={{ fontSize: "40px" }}>💬</div>
                <h5 className="fw-bold mt-3">General Enquiries</h5>
                <p className="text-muted mb-0">
                  Contact us for questions about the FarmHub platform.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;