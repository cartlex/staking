import { useContext, useState } from "react";
import getStakingTokenWithSigner from "../abi/StakingToken/getStakingTokenWithSigner";
import { AppContext } from "../context";

const Mint = () => {
  const { address, isLoading, setIsLoading } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [mintAmount, setMintAmount] = useState();

  const handleWithdrawSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setActive(false);
      const stakingToken = await getStakingTokenWithSigner();
      const txMint = await stakingToken._mint(address, mintAmount);
      await txMint.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setMintAmount("");
    }
  };

  return (
    <form
      onSubmit={handleWithdrawSubmit}
      className="flex flex-col justify-center items-center mt-[15px]"
    >
      <button disabled={isLoading}
        onClick={() => setActive(true)}
        className="bg-cyan-600 rounded-[10px] w-[150px] h-[30px] text-gray-200 hover:bg-cyan-500 text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white disabled:bg-cyan-800"
      >
        Mint
      </button>
      {active && (
        <input
          onChange={(e) => setMintAmount(e.target.value)}
          required
          type="number"
          min={1}
          step={1}
          placeholder="Amount to mint"
          className="outline-none rounded-[10px] placeholder:text-center text-left placeholder:text-gray-500 text-zinc-700 w-[150px] text-[14px] h-[30px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px] pl-[10px]"
        />
      )}
    </form>
  );
};

export default Mint;
