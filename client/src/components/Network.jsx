import { useState } from "react";

const Network = ({ changeNetwork, networksToChoose, network, setNetwork }) => {
  const [toggleDrawer, setTogglerDrawer] = useState(false);
  const [isActive, setIsActive] = useState();

  const handleNetworkClick = (networkToChoose) => {
    setNetwork(networkToChoose);
    setIsActive(networkToChoose.chainName);
    changeNetwork(networkToChoose.chainId);
  };

  return (
    <div
      onClick={() => setTogglerDrawer((prev) => !prev)}
      className={`flex justify-center items-center w-[150px] hover:bg-slate-100 border-[1px] border-cyan-500 my-[3px] mr-[25px] text-[14px] cursor-pointer bg-white outline-none rounded-[10px] text-center placeholder:text-gray-500 text-zinc-700 h-[27px] focus:bg-red-400`}
    >
      <img
        src={network.image}
        alt="crypto icons"
        className="fixed left-[1272px]  w-[20px] h-[20px]"
      />
      <p className="fixed left-[1295px] ">{network.chainName}</p>
      
      <div
        className={`absolute top-[40px]  left-auto z-10  shadow-secondary  y-4 ${
          !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
        } transition-all duration-700`}
      >
        <ul className="flex flex-col items-center justify-center">
          {networksToChoose.map((networkToChoose) => (
            <li
              className={`flex items-center bg-white outline-none rounded-[10px] text-center placeholder:text-gray-500 text-zinc-700 w-[150px] h-[27px] hover:bg-slate-100 border-[1px] border-cyan-500 my-[3px] text-[14px]`}
              key={networkToChoose.chainId}
              value={networkToChoose.chainId}
              onClick={() => handleNetworkClick(networkToChoose)}
            >
              <img
                src={networkToChoose.image}
                alt={networkToChoose.chainName}
                className={`w-[20px] h-[20px] object-contain fixed left-[7px] ${
                  isActive === networkToChoose.chainName
                    ? "grayscale-0"
                    : "text-orange-600"
                }`}
              />
              <p className="fixed left-[30px] ">{networkToChoose.chainName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Network;
