import { formatEther, formatUnits, parseEther } from "ethers";
import Loader from "../UI/Loader";

const StakeWindow = ({
  handleStakeSubmit,
  setAmountToStake,
  amountToStake,
  isLoading,
  userBalance,
  tokenName
}) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-start bg-black opacity-50 w-[400px] h-[150px] rounded-[10px]">
          <div className="flex flex-col justify-between px-[10px] w-full pt-[10px]">
            <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                Token: {tokenName}
              </h1>
            <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
              Your Balance: {userBalance}
            </h1>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-[20px]"></div>
      <div className="flex items-center flex-col justify-center">
       {!isLoading && <form onSubmit={handleStakeSubmit}>
          <label htmlFor="stake"></label>
          <input
            disabled={isLoading}
            required
            onChange={(e) => setAmountToStake(e.target.value)}
            value={amountToStake}
            type="number"
            min={1}
            step={1}
            id="stake"
            className="w-[300px] text-center rounded-[10px] h-[40px] bg-slate-700 bg-opacity-30  outline-none m-[10px] text-zinc-300 hover:border-[1px] hover:border-blue-300 hover:placeholder:text-slate-200 hover:bg-opacity-50 disabled:bg-black disabled:bg-opacity-50 disabled:border-none"
            placeholder="Amount to stake"
          />
          <button
            disabled={isLoading}
            className="flex items-center justify-center m-[10px] bg-cyan-500 rounded-[10px] w-[300px] h-[45px] text-gray-200 hover:bg-cyan-500 text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white disabled:bg-black disabled:bg-opacity-50 disabled:border-none"
          >
            Stake
          </button>
        </form>}
      </div>
    </div>
  );
};

export default StakeWindow;
