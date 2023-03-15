import { getSlicedAddress } from "../utils/getSlicedAddress";

const ConnectedWallet = ({ address, handleWalletConnectClick }) => {

  return address ? (
    <h1 className="outline-none rounded-[10px] text-center placeholder:text-gray-500 bg-white text-zinc-700 w-[200px] h-[40px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px] flex items-center justify-center">
      {getSlicedAddress(address)}
    </h1>
  ) : (
    <button
      onClick={handleWalletConnectClick}
      className="flex items-center justify-center bg-white outline-none rounded-[10px] text-center placeholder:text-gray-500 text-zinc-700 w-[200px] h-[40px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px]"
    >
      Connect wallet
    </button>
    

  );
};

export default ConnectedWallet;
