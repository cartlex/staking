import { AnkrProvider } from "ethers";
import { useState } from "react";
import walletProvider from "../abi/walletProvider";

const Network = ({ networksToChoose }) => {
  const [toggleDrawer, setTogglerDrawer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [network, setNetwork] = useState([networksToChoose]);

  const handleNetworkClick = (networkToChoose) => {
    setNetwork(networkToChoose);
    setIsActive(networkToChoose.chainName);
    changeNetwork(networkToChoose);
  };

  const getNet = async () => {
    const { chainId } = await walletProvider.getNetwork();
    console.log(chainId);
  };
  getNet();

  const changeNetwork = async (networkId) => {
    try {
      await walletProvider.send("wallet_switchEthereumChain", [
        { chainId: networkId.chainId },
      ]);
      setNetwork(networkId);
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          console.log(chainId);
          await walletProvider.send("wallet_addEthereumChain", [
            { chainId: networkId.chainId },
          ]);
        } catch (addError) {
          console.log("add chain to metamask");
        }

        //   await walletProvider.send("wallet_addEthereumChain", [
        //     { chainId: networkId.chainId },
        //   ]);
      }
    }
  };

  return (
    <div
      onClick={() => setTogglerDrawer((prev) => !prev)}
      className={`flex justify-center items-center w-[130px] my-[3px] mr-[25px] text-[14px] cursor-pointer bg-slate-600 outline-none rounded-[10px] text-cente text-zinc-300 h-[27px] `}
    >
      <img
        src={network.image}
        alt="crypto icons"
        className="fixed left-[1145px] w-[20px] h-[20px]"
      />
      <p className="fixed left-[1175px]">{network.chainName}</p>
      <div
        className={`absolute top-[55px]  left-auto z-10  shadow-secondary  y-4 ${
          !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
        } transition-all duration-700`}
      >
        <ul className="flex flex-col items-center justify-center">
          {networksToChoose.map((networkToChoose) => (
            <li
              className={`flex items-center bg-slate-800 outline-none rounded-[10px] text-cente text-zinc-300 hover:text-slate-800 w-[130px] h-[27px] hover:bg-slate-200 border-[1px] border-cyan-500 my-[3px] text-[14px] `}
              key={networkToChoose.chainId}
              value={networkToChoose.chainId}
              onClick={() => handleNetworkClick(networkToChoose)}
            >
              <img
                src={networkToChoose.image}
                alt={networkToChoose.chainName}
                className={`w-[20px] h-[20px] object-contain fixed left-[15px] ${
                  isActive === networkToChoose.chainName
                    ? "grayscale-0"
                    : "text-orange-600"
                }`}
              />
              <p className="fixed left-[45px]">{networkToChoose.chainName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Network;
