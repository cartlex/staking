import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "../context";
import StakingPage from "../pages/StakingPage";
import Start from "../pages/Start";
import Error from "../pages/Error";
import About from "../pages/About";
import Account from "../pages/Account";

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
