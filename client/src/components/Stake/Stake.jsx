import { useContext, useState } from "react";
import { AppContext } from "../../context";

const Stake = () => {
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [balance, setBalance] = useState(10);
  const [variant, setVariant] = useState("stake");
  const [amountToWithdraw, setAmountToWithdraw] = useState();
  const [amountToStake, setAmountToStake] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // setAmountToWithdraw("");
    // setAmountToStake("");
  };

  const handleStakeClick = () => {
    setVariant("stake");
    // setAmountToWithdraw(0);
  };

  const handleUnstakeClick = () => {
    setVariant("unstake");
    // setAmountToStake("");
  };

  return (
    <div className="flex flex-col justify-between items-center bg-black bg-opacity-40 w-[500px] h-[400px] rounded-[10px] relative ">
      <div className="flex flex-row justify-start items-center w-[400px] mt-[10px] space-x-2">
        <button
          onClick={handleStakeClick}
          className={`cursor-pointer text-zinc-300  hover:placeholder:text-slate-200 hover:text-white ${
            variant === "stake" ? "bg-black bg-opacity-50 rounded-[5px] px-[5px]" : ""
          }`}
        >
          Stake
        </button>
        <button
          onClick={handleUnstakeClick}
          className={`cursor-pointer text-zinc-300  hover:placeholder:text-slate-200 hover:text-white ${
            variant === "unstake" ? "bg-black bg-opacity-50 rounded-[5px] px-[5px]" : ""
          }`}
        >
          Unstake
        </button>
      </div>
      {variant == "stake" ? (
        <div>
          <div className="flex justify-center items-start bg-black opacity-50 w-[400px] h-[150px] rounded-[10px] ">
            <div className="flex flex-row justify-between px-[10px] w-full pt-[10px]">
              <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                Amount
              </h1>
              <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                Balance: 100000.00
              </h1>
            </div>
          </div>
          <div className="flex justify-between items-center mt-[20px]"></div>
          <div className="flex items-center flex-col justify-center">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="stake"></label>
              <input
                required
              onChange={(e) => setAmountToStake(e.target.value)}

                type="number"
                min={1}
                step={1}
                id="stake"
                className="w-[300px] text-center rounded-[10px] h-[40px] bg-slate-700 bg-opacity-30  outline-none m-[10px] text-zinc-300 hover:border-[1px] hover:border-blue-300 hover:placeholder:text-slate-200 hover:bg-opacity-50"
                placeholder="Amount to stake"
              />
              <button className="flex items-center justify-center m-[10px] bg-cyan-600 rounded-[10px] w-[300px] h-[45px] text-gray-200 hover:bg-cyan-500 text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white">
                Stake
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-start bg-black opacity-50 w-[400px] h-[150px] rounded-[10px] ">
            <div className="flex flex-row justify-between px-[10px] w-full pt-[10px]">
              <div className="flex flex-col">
                <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                  Amount
                </h1>
                <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                  Matic token
                </h1>
                <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                  Earned:
                </h1>
              </div>

              <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                Staked: 20.00
              </h1>
            </div>
          </div>
          <div className="flex justify-between items-center mt-[20px]"></div>
          <div className="flex items-center flex-col justify-center">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="withdraw"></label>
              <input
              onChange={(e) => setAmountToWithdraw(e.target.value)}
                required
                type="number"
                min={1}
                step={1}
                id="withdraw"
                className="w-[300px] text-center rounded-[10px] h-[40px] bg-slate-700 bg-opacity-30  outline-none m-[10px] text-zinc-300 hover:border-[1px] hover:border-blue-300 hover:placeholder:text-slate-200 hover:bg-opacity-50"
                placeholder="Amount to withdraw"
              />
              <button className="flex items-center justify-center m-[10px] bg-cyan-600 rounded-[10px] w-[300px] h-[45px] text-gray-200 hover:bg-cyan-500 text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white">
                Withdraw
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stake;
