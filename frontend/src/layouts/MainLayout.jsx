import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Chatbot from "../components/Chatbot/Chatbot";

function MainLayout() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Chatbot />

      <Footer />
    </div>
  );
}

export default MainLayout;