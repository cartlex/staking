import { Route, Routes } from "react-router-dom";
import StakingPage from "../pages/StakingPage";
import Start from "../pages/Start";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/createtransaction" element={<StakingPage />} />
      <Route path="*" element={<StakingPage />} />
      <Route path="/start" element={<Start />} />
    </Routes>
  );
};

export default AppRouter;
