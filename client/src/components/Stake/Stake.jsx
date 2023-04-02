import { useContext, useState } from "react";
import getStakingWithSigner from "../../abi/Staking/getStakingWithSigner";
import getStakingTokenWithSigner from "../../abi/StakingToken/getStakingTokenWithSigner";
import { AppContext } from "../../context";
import StakeWindow from "./StakeWindow";
import WithdrawWindow from "./WithdrawWindow";

const Stake = () => {
  const { address } = useContext(AppContext);
  //   const [balance, setBalance] = useState(10);
  const [variant, setVariant] = useState("stake");
  const [amountToStake, setAmountToStake] = useState();
  const [amountToWithdraw, setAmountToWithdraw] = useState();
  const { isLoading, setIsLoading } = useContext(AppContext);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      console.log("hi");
      const stakingContract = await getStakingWithSigner();
      const stakingTokenContract = await getStakingTokenWithSigner();
      const approve = await stakingTokenContract.approve(
        address,
        amountToStake
      );
      await approve.wait();
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

  return (
    <div className="flex flex-col justify-between items-center bg-black bg-opacity-40 w-[500px] h-[400px] rounded-[10px] relative ">
      <div className="flex flex-row justify-start items-center w-[400px] mt-[10px] space-x-2">
        <button
          onClick={() => setVariant("stake")}
          className={`cursor-pointer text-zinc-300  hover:placeholder:text-slate-200 hover:text-white ${
            variant === "stake"
              ? "bg-black bg-opacity-50 rounded-[5px] px-[5px]"
              : ""
          }`}
        >
          Stake
        </button>
        <button
          onClick={() => setVariant("unstake")}
          className={`cursor-pointer text-zinc-300  hover:placeholder:text-slate-200 hover:text-white ${
            variant === "unstake"
              ? "bg-black bg-opacity-50 rounded-[5px] px-[5px]"
              : ""
          }`}
        >
          Unstake
        </button>
      </div>
      {variant === "stake" ? (
        <StakeWindow
          handleFormSubmit={handleFormSubmit}
          setAmountToStake={setAmountToStake}
          amountToStake={amountToStake}
        />
      ) : (
        <WithdrawWindow
          handleFormSubmit={handleFormSubmit}
          setAmountToWithdraw={setAmountToWithdraw}
          amountToWithdraw={amountToWithdraw}
        />
      )}
    </div>
  );
};

export default Stake;
