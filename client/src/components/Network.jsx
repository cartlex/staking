import { useContext, useEffect, useState } from "react";
import walletProvider from "../abi/walletProvider";
import { AppContext } from "../context";
import { changeNetwork } from "../utils/Networks/changeNetwork";

const Network = ({ networksToChoose }) => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // const [address, setAddress] = useState();
  const { network, setNetwork } = useContext(AppContext);

  const handleNetworkClick = (networkToChoose) => {
    changeNetwork(networkToChoose);
    setIsActive(networkToChoose.chainName);
    setNetwork(networkToChoose);

  };
  //   const changeNetwork = async (networkToChoose) => {
  //     try {
  //       await walletProvider.send("wallet_switchEthereumChain", [
  //         { chainId: networkToChoose.chainId },
  //       ]);

  //     } catch (switchError) {
  //       if (switchError.code === -32602) {
  //         try {
  //           await walletProvider.send("wallet_addEthereumChain", [
  //             { chainId: networkToChoose.chainId },
  //           ]);
  //         } catch (addError) {
  //           console.log("add chain to metamask");
  //         }
  //       }
  //     }
  //   };

  return (
    <div
      onClick={() => setToggleDrawer((prev) => !prev)}
      className={`flex  items-center w-[130px] my-[3px] mr-[25px] text-[14px] cursor-pointer bg-zinc-200 outline-none rounded-[10px] text-center text-zinc-700 hover:bg-zinc-100 h-[27px] `}
    >
      <img
        src={network.image}
        alt="crypto icons"
        className="relative left-[20px] w-[20px] h-[20px]"
      />
      <p className="relative left-[30px]">{network.chainName}</p>
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
              value={networkToChoose.chainName}
              onClick={() => handleNetworkClick(networkToChoose)}
            >
              <img
                src={networkToChoose.image}
                alt={networkToChoose.chainName}
                className={` w-[20px] h-[20px] object-contain relative left-[20px] ${
                  isActive === networkToChoose.chainName
                    ? "grayscale-0"
                    : "text-orange-600"
                }`}
              />
              <p className="relative left-[30px]">
                {networkToChoose.chainName}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Network;
