import { Routes, Route } from "react-router-dom";

import { Dashboard } from "../pages/index";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
);

export default MainRoutes;
