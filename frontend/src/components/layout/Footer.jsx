import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4">

        <div className="row align-items-center">

          {/* Brand */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">
              🌾 FarmHub
            </h5>

            <p className="text-light mb-0">
              Fresh from farmers, directly to you.
            </p>
          </div>

          {/* Footer Links */}
          <div className="col-md-6">
            <div className="d-flex justify-content-center justify-content-md-end gap-4">

              <Link
                to="/about"
                className="text-light text-decoration-none"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-light text-decoration-none"
              >
                Contact
              </Link>

            </div>
          </div>

        </div>

        <hr className="border-secondary my-3" />

        <div className="text-center">
          <small className="text-secondary">
            © 2026 FarmHub Farmer Marketplace. All rights reserved.
          </small>
        </div>

      </div>
    </footer>
  );
}

export default Footer;