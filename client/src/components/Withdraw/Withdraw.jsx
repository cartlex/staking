import { useContext, useState } from "react";
import getStakingWithSigner from "../../abi/Staking/getStakingWithSigner";
import { AppContext } from "../../context";

const Withdraw = () => {
  const [active, setActive] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState();
  const { isLoading, setIsLoading } = useContext(AppContext);

  const handleMintSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setActive(false);
      const stakingContract = await getStakingWithSigner();
      const toWithdraw = await stakingContract.withdraw(withdrawAmount);
      await toWithdraw.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = (e) => {
    setWithdrawAmount(e.target.value)
  }

  return (
    <form
      onSubmit={handleMintSubmit}
      className="flex flex-col justify-center items-center mt-[15px]"
    >
      <button
        onClick={() => setActive(true)}
        disabled={isLoading}
        className="bg-cyan-600 rounded-[10px] w-[150px] h-[30px] text-gray-200 hover:bg-cyan-500 text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white disabled:bg-cyan-800"
      >
        Withdraw
      </button>
      {active && (
        <input
          onChange={handleButtonClick}
          required
          type="number"
          min={1}
          step={1}
          placeholder="Withdraw amount"
          className="outline-none rounded-[10px] placeholder:text-center text-center placeholder:text-gray-500 text-zinc-700 w-[150px] text-[14px] h-[30px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px] pl-[10px]"
        />
      )}
    </form>
  );
};

export default Withdraw;
