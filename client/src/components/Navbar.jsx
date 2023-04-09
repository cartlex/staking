import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import walletProvider from "../abi/walletProvider";
import { AppContext } from "../context";
import { networksToChoose } from "../utils/Networks/networksToChoose";
import Button from "./Button";
import ConnectedWallet from "./ConnectedWallet";
import Network from "./Network";

const Navbar = () => {
  const { address, setAddress, network, setNetwork } = useContext(AppContext);

  const handleWalletConnectClick = async () => {
    try {
      const account = await walletProvider.send("eth_requestAccounts", []);
      setAddress(account[0]);
      return account[0];
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleWalletConnectClick();
    localStorage.setItem("address", address)
  });

  return (
    <div className="flex justify-between h-[80px] items-center w-full fixed top-0">
      <div className="w-[360px] flex justify-between items-center ml-[50px]">
        <Link to="/staking">
          <Button name="Staking" />
        </Link>
        <Link to="/account">
          <Button name="Account" />
        </Link>
        <Link to="/about">
          <Button
            name="About"
            // onClick={() => setIsAboutActive((prev) => !prev)}
          ></Button>
        </Link>
      </div>
      <div className="justify-end items-center flex flex-row">
        {address ? (
          <>
            <Network
              setNetwork={setNetwork}
              network={network}
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
