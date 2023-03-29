import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "../context";
import StakingPage from "../pages/StakingPage";
import Start from "../pages/Start";
import Error from "../pages/Error";
import About from "../pages/About";

const AppRouter = () => {
    const { isLoading } = useContext(AppContext);

    if(isLoading) {
        return <Loader/>
    }

  return (
    <Routes>
      <Route path="/staking" element={<StakingPage />} />
      <Route path="/start" element={<Start />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
