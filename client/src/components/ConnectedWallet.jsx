import { getSlicedAddress } from "../utils/getSlicedAddress";

const ConnectedWallet = ({ address, handleWalletConnectClick }) => {

  return address ? (
    <div className="flex justify-center flex-col items-center">
      <h1 className="outline-none rounded-[10px] text-center placeholder:text-gray-500 bg-zinc-200 text-zinc-700 w-[130px] h-[27px] hover:bg-zinc-100 border-[1px] border-cyan-500 my-[3px] mr-[25px] flex items-center justify-center text-[14px]">
        {getSlicedAddress(address)}
      </h1>
    </div>
  ) : (
    <button
      onClick={handleWalletConnectClick}
      className="flex items-center justify-center bg-zinc-200 outline-none rounded-[10px] text-center placeholder:text-gray-500 text-zinc-700 w-[150px] h-[27px] hover:bg-zinc-100 border-[1px] border-cyan-500 my-[3px] mr-[25px] text-[14px]"
    >
      Connect wallet
    </button>
  );
};

export default ConnectedWallet;
