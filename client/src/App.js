import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { AppContext } from "./context";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState([]);

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
        balance,
        setBalance,
        network,
        setNetwork
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
