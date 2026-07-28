function About() {
  return (
    <div>

      {/* ================= ABOUT HERO ================= */}
      <section className="bg-light py-5">
        <div className="container text-center py-4">

          <span className="badge bg-success mb-3">
            🌾 About FarmHub
          </span>

          <h1 className="fw-bold display-5 mb-3">
            Connecting Farmers
            <span className="text-success"> Directly With Customers</span>
          </h1>

          <p
            className="text-muted mx-auto"
            style={{ maxWidth: "750px", fontSize: "18px" }}
          >
            FarmHub is a farmer marketplace platform designed to connect
            local farmers directly with customers. Our goal is to make
            fresh agricultural products easily accessible while helping
            farmers reach more customers.
          </p>

        </div>
      </section>


      {/* ================= OUR MISSION ================= */}
      <section className="container py-5">

        <div className="row align-items-center g-5">

          <div className="col-md-6">

            <h2 className="fw-bold mb-3">
              Our Mission
            </h2>

            <p className="text-muted">
              Our mission is to create a simple and reliable digital
              marketplace where farmers can sell their products and
              customers can discover fresh products directly from them.
            </p>

            <p className="text-muted">
              FarmHub helps reduce the gap between farmers and consumers
              by providing a common platform for product discovery,
              buying and selling.
            </p>

          </div>


          <div className="col-md-6">

            <div className="bg-success bg-opacity-10 rounded-4 p-5 text-center">

              <div style={{ fontSize: "70px" }}>
                🌱
              </div>

              <h4 className="fw-bold mt-3">
                Farm to Customer
              </h4>

              <p className="text-muted mb-0">
                Fresh products. Local farmers. Simple marketplace.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-light py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              How FarmHub Works
            </h2>

            <p className="text-muted">
              A simple marketplace connecting farmers and customers.
            </p>

          </div>


          <div className="row text-center g-4">

            <div className="col-md-4">

              <div className="bg-white rounded shadow-sm p-4 h-100">

                <div style={{ fontSize: "45px" }}>
                  👨‍🌾
                </div>

                <h4 className="fw-bold mt-3">
                  1. Farmers List Products
                </h4>

                <p className="text-muted">
                  Farmers add their fresh agricultural products,
                  prices and available stock to FarmHub.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="bg-white rounded shadow-sm p-4 h-100">

                <div style={{ fontSize: "45px" }}>
                  🛒
                </div>

                <h4 className="fw-bold mt-3">
                  2. Customers Explore
                </h4>

                <p className="text-muted">
                  Customers browse products and categories to find
                  fresh products available from farmers.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="bg-white rounded shadow-sm p-4 h-100">

                <div style={{ fontSize: "45px" }}>
                  🤝
                </div>

                <h4 className="fw-bold mt-3">
                  3. Direct Connection
                </h4>

                <p className="text-muted">
                  FarmHub creates a direct connection between farmers
                  and customers through one convenient marketplace.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FARMERS + CUSTOMERS ================= */}
      <section className="container py-5">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Built for Farmers & Customers
          </h2>

          <p className="text-muted">
            FarmHub provides benefits to both sides of the marketplace.
          </p>

        </div>


        <div className="row g-4">

          {/* Farmers */}
          <div className="col-md-6">

            <div className="border rounded-4 p-4 h-100">

              <div style={{ fontSize: "45px" }}>
                👨‍🌾
              </div>

              <h3 className="fw-bold mt-3">
                For Farmers
              </h3>

              <p className="text-muted">
                FarmHub gives farmers a digital platform to showcase
                their products and connect with customers.
              </p>

              <ul className="list-unstyled">

                <li className="mb-2">
                  ✅ List agricultural products
                </li>

                <li className="mb-2">
                  ✅ Manage product stock
                </li>

                <li className="mb-2">
                  ✅ Reach more customers
                </li>

                <li>
                  ✅ Manage customer orders
                </li>

              </ul>

            </div>

          </div>


          {/* Customers */}
          <div className="col-md-6">

            <div className="border rounded-4 p-4 h-100">

              <div style={{ fontSize: "45px" }}>
                🛍️
              </div>

              <h3 className="fw-bold mt-3">
                For Customers
              </h3>

              <p className="text-muted">
                Customers can easily discover and purchase products
                offered by local farmers.
              </p>

              <ul className="list-unstyled">

                <li className="mb-2">
                  ✅ Browse fresh products
                </li>

                <li className="mb-2">
                  ✅ Search by category
                </li>

                <li className="mb-2">
                  ✅ View farmer products
                </li>

                <li>
                  ✅ Convenient online shopping
                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FINAL MESSAGE ================= */}
      <section className="bg-success text-white py-5">

        <div className="container text-center">

          <h2 className="fw-bold">
            Fresh From Farmers, Directly To You
          </h2>

          <p className="mb-0 mt-3">
            FarmHub brings farmers and customers together through
            one simple and reliable marketplace.
          </p>

        </div>

      </section>

    </div>
  );
}

export default About;