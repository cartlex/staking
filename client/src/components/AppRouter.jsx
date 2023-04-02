import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "../context";
import About from "../pages/About";
import Account from "../pages/Account";
import Error from "../pages/Error";
import StakingPage from "../pages/StakingPage";
import Loader from "./UI/Loader";

const AppRouter = () => {
    const { isLoading } = useContext(AppContext);

    if(isLoading) {
        return <Loader/>
    }

  return (
    <Routes>
      <Route path="/staking" element={<StakingPage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
