import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import { AppContext } from "./context";
import StakingPage from "./pages/StakingPage";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState();
  //   const [stakeModal, setStakeModal] = useState(false);
  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        modal,
        setModal,
        address,
        amount,
        setAddress,
        setAmount,
      }}
    >
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
