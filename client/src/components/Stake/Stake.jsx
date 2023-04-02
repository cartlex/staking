import { useContext, useState } from "react";
import getStakingWithSigner from "../../abi/Staking/getStakingWithSigner";
import getStakingTokenWithSigner from "../../abi/StakingToken/getStakingTokenWithSigner";
import { AppContext } from "../../context";
import StakeWindow from "./StakeWindow";
import WithdrawWindow from "./WithdrawWindow";

const Stake = () => {
  const { address } = useContext(AppContext);
  const [variant, setVariant] = useState("stake");
  const [amountToStake, setAmountToStake] = useState();
  const [amountToWithdraw, setAmountToWithdraw] = useState();
  const { isLoading, setIsLoading } = useContext(AppContext);

  const handleStakeSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const stakingContract = await getStakingWithSigner();
      const stakingTokenContract = await getStakingTokenWithSigner();
      const txApprove = await stakingTokenContract.approve(
        address,
        amountToStake
      );
      await txApprove.wait();
      const stake = await stakingContract.stake(amountToStake);
      await stake.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setAmountToWithdraw("");
      setAmountToStake("");
    }
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const stakingContract = await getStakingWithSigner();
      const withdraw = await stakingContract.withdraw(amountToWithdraw);
      await withdraw.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setAmountToWithdraw("");
      setAmountToStake("");
    }
  };

  return (
    <div className="flex flex-col justify-between items-center bg-black bg-opacity-40 w-[500px] h-[400px] rounded-[10px] relative ">
      <div className="flex flex-row justify-start items-center w-[400px] mt-[10px] space-x-2">
        <button
          disabled={isLoading}
          onClick={() => setVariant("stake")}
          className={`cursor-pointer text-zinc-300 rounded-[5px] px-[5px] hover:placeholder:text-slate-200 hover:text-white disabled:bg-black disabled:bg-opacity-50 disabled:border-none ${
            variant === "stake" ? "bg-black bg-opacity-50" : ""
          }`}
        >
          Stake
        </button>
        <button
          disabled={isLoading}
          onClick={() => setVariant("unstake")}
          className={`cursor-pointer text-zinc-300 rounded-[5px] px-[5px] hover:placeholder:text-slate-200 hover:text-white disabled:bg-black disabled:bg-opacity-50 disabled:border-none ${
            variant === "unstake" ? "bg-black bg-opacity-50 " : ""
          }`}
        >
          Unstake
        </button>
      </div>
      {variant === "stake" ? (
        <StakeWindow
          isLoading={isLoading}
          handleStakeSubmit={handleStakeSubmit}
          setAmountToStake={setAmountToStake}
          amountToStake={amountToStake}
        />
      ) : (
        <WithdrawWindow
          isLoading={isLoading}
          handleWithdrawSubmit={handleWithdrawSubmit}
          setAmountToWithdraw={setAmountToWithdraw}
          amountToWithdraw={amountToWithdraw}
        />
      )}
    </div>
  );
};

export default Stake;
