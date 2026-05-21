import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import CompanyDetails from "../pages/CompanyDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/company/:id"
        element={<CompanyDetails />}
      />
    </Routes>
  );
};

export default AppRoutes;