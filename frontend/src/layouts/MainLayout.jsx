import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <>
      {/* Navbar will come here */}
      <Navbar/>

      <main>
        <Outlet />
      </main>

      {/* Footer will come here */}
      <Footer/>
    </>
  );
}


export default MainLayout;