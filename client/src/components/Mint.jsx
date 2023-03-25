import { useRef } from "react";
import getStakingTokenWithSigner from "../abi/StakingToken/getStakingTokenWithSigner";

const Mint = ({ address }) => {
  const mintRef = useRef();

  const handleMintSubmit = async (event) => {
    event.preventDefault();
    try {
      const stakingContract = await getStakingTokenWithSigner();
      const mint = await stakingContract._mint(address, mintRef.current.value);
      await mint.wait();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleMintSubmit}
      className="flex flex-col justify-center items-center ml-[25px]"
    >
      <button className="bg-cyan-600 rounded-[10px] w-[150px] h-[30px] text-gray-200 hover:bg-cyan-500 text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white">
        Mint
      </button>
      <input
        ref={mintRef}
        required
        type="number"
        min={1}
        step={1}
        placeholder="Amount to mint"
        className="outline-none rounded-[10px] placeholder:text-center text-left placeholder:text-gray-500 text-zinc-700 w-[150px] text-[14px] h-[30px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px] pl-[10px]"
      />
    </form>
  );
};

export default Mint;
