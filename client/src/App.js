import { useState } from "react";
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
        
      <StakingPage />
    </AppContext.Provider>
  );
};

export default App;
