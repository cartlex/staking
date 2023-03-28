import { useContext, useState } from "react";
import walletProvider from "../abi/walletProvider";
import { AppContext } from "../context";
import { networksToChoose } from "../utils/Networks/networksToChoose";
import ConnectedWallet from "./ConnectedWallet";
import Network from "./Network";
import About from "./About";
import Button from "./Button";

const Navbar = () => {
  const [network, setNetwork] = useState([]);
  const { address, setAddress } = useContext(AppContext);
  const [isAboutActive, setIsAboutActive] = useState(false);


  const handleWalletConnectClick = async () => {
    try {
      const account = await walletProvider.send("eth_requestAccounts", []);
      setAddress(account[0]);
      return account[0];
    } catch (error) {
      console.error(error);
    }
  };

  const changeNetwork = async (e) => {
    const networkId = e.target.value;
    try {
      await walletProvider.send("wallet_switchEthereumChain", [
        { chainId: networkId },
      ]);
      setNetwork(networkId);
    } catch (error) {
      console.error(error);

      //   try {
      //     if (error.code === 4902) {
      //       await walletProvider.send("wallet_addEthereumChain", [
      //         { chainId: networkId },
      //         { rpcUrl: ["https://optimistic.etherscan.io"] },
      //       ]);
      //       setNetwork(networkId);
      //     }
      //   } catch (error) {
      //     console.error(error);
      //   }
    }
  };

  return (
    <div className="flex justify-between h-[80px] items-center w-full fixed top-0">
      <div className="w-[360px] flex justify-between items-center ml-[25px]">
        <Button name="Main" />
        <Button
          name="Account"
        />
        <Button name="About"
          onClick={() => setIsAboutActive(prev => !prev)}>
        </Button>
        {isAboutActive && <About/>}

      </div>
      <div className="justify-end items-center flex flex-col">
        {address ? (
          <>
            <Network
              setNetwork={setNetwork}
              network={network}
              changeNetwork={changeNetwork}
              networksToChoose={networksToChoose}
            />
            <ConnectedWallet
              address={address}
              handleWalletConnectClick={handleWalletConnectClick}
            />
          </>
        ) : (
          <ConnectedWallet
            address={address}
            handleWalletConnectClick={handleWalletConnectClick}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
