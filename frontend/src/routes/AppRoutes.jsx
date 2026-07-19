import { Routes, Route } from "react-router-dom";
import Home from "../pages/customer/Home";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
 
