import { useContext, useState } from "react";
import getStakingWithSigner from "../../abi/Staking/getStakingWithSigner";
import getStakingWithTokenSigner from "../../abi/StakingToken/getStakingTokenWithSigner";
import { AppContext } from "../../context";

const StakingForm = () => {
  const { isLoading, setIsLoading } = useContext(AppContext);

  const [stakingAmount, setStakingAmount] = useState(0);
  const [currentStake, setCurrentStake] = useState(0);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const stakingContract = await getStakingWithSigner();
      const stakingTokenContract = await getStakingWithTokenSigner();
      const approve = await stakingTokenContract.approve(
        "0x12598fe6391e0e13Fa2544D5757517A4cF4bf842",
        currentStake
      );
      await approve.wait();
      const tx = await stakingContract.stake(currentStake);
      await tx.wait();
      setCurrentStake(currentStake + Number(stakingAmount));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center border-[1px] rounded-[20px] border-slate-600 h-[250px]  bg-cyan-700">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-between items-center"
      >
        <div className="text-gray-200 text-[30px] p-[25px]">
          {`You are now staking: ${currentStake} tokens`}
        </div>
        <input
          onChange={(e) => setCurrentStake(e.target.value)}
          required
          type="number"
          min={1}
          step={1}
          placeholder="Amount of tokens to stake"
          className="outline-none rounded-[10px] placeholder:text-center text-left placeholder:text-gray-500 text-zinc-700 w-[250px] h-[40px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px] pl-[10px]"
        />
        <button disabled={isLoading} className="bg-cyan-600 rounded-[10px] w-[150px] h-[30px] text-gray-200 hover:bg-cyan-500 mt-[30px] text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white disabled:bg-cyan-800">
          Stake
        </button>
      </form>
    </div>
  );
};

export default StakingForm;
