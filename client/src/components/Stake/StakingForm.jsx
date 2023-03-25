import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";

const StakingForm = ({ setIsLoading, setVisible }) => {
  const { amount, setAmount } = useContext(AppContext);

  const [stakingAmount, setStakingAmount] = useState(0);
  const [currentStake, setCurrentStake] = useState(0);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setCurrentStake(currentStake + Number(stakingAmount));
      //   setStakingAmount()
      //   const providerWithSigner = await walletProvider.getSigner();
      //   const tx = await providerWithSigner.sendTransaction({
      //     to: address,
      //     value: parseEther(amount),
      //   });
      //   await tx.wait();
    //   setStakingAmount("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    //   setVisible(false);
    }
  };

  console.log(currentStake);

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
          onChange={(e) => setStakingAmount(e.target.value)}
          required
          type="number"
          min={0}
          step={1}
          placeholder="Amount of tokens to stake"
          className="outline-none rounded-[10px] placeholder:text-center text-left placeholder:text-gray-500 text-zinc-700 w-[250px] h-[40px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px] pl-[10px]"
        />
        <button className="bg-cyan-600 rounded-[10px] w-[150px] h-[30px] text-gray-200 hover:bg-cyan-500 mt-[30px] text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white">
          Stake
        </button>
      </form>
    </div>
  );
};

export default StakingForm;
