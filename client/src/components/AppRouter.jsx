import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Account from "../pages/Account";
import Error from "../pages/Error";
import StakingPage from "../pages/StakingPage";

const AppRouter = () => {

  return (
    <Routes>
      <Route path="/staking" element={<StakingPage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Error />} />
      <Route path="/" element={<About />} />
    </Routes>
  );
};

export default AppRouter;
