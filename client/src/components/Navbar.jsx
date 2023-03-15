import { parseEther, parseUnits } from "ethers";
import { useState } from "react";
import walletProvider from "../abi/walletProvider";
import { networksToChoose } from "../utils/Networks/networksToChoose";
import ConnectedWallet from "./ConnectedWallet";
import Network from "./Network";

const Navbar = () => {
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState([]);

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
    }
  };

  return (
    <div className="flex justify-end">
      <div className="justify-end items-center flex flex-col">
        {address ? (
          <>
            <Network
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
