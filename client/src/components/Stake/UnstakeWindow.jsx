import { formatEther } from "ethers";
import Loader from "../UI/Loader";

const UnstakeWindow = ({
  handleUnstakeSubmit,
  isLoading,
  stakedFunds,
  tokenName,
  rewardsPaidToUser,
  amountAPR,
  timeToLock,
  handleGetRewardSubmit,
}) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-start bg-black opacity-50 w-[400px] h-[150px] rounded-[10px] ">
          <div className="flex flex-row justify-between px-[10px] w-full pt-[10px]">
            <div className="flex flex-col">
              <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                Token: {tokenName}
              </h1>
              {rewardsPaidToUser !== 0 && <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                Earned: {rewardsPaidToUser}
              </h1>}
              <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                APR: {amountAPR}%
              </h1>
              <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
                Lock Period: {timeToLock} seconds
              </h1>
            </div>
            <h1 className="text-zinc-300  hover:placeholder:text-slate-200 hover:text-white">
              Staked: {stakedFunds}
            </h1>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-[20px]"></div>
      <div className="flex items-center flex-col justify-center">
        {!isLoading && (
          <form onSubmit={handleUnstakeSubmit}>
            <button
              disabled={isLoading}
              className="flex items-center justify-center m-[10px] bg-cyan-600 rounded-[10px] w-[300px] h-[45px] text-gray-200 hover:bg-cyan-500 text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white disabled:bg-black disabled:bg-opacity-50 disabled:border-none"
            >
              Unstake
            </button>
          </form>
        )}

        <button
          disabled={isLoading}
          onClick={handleGetRewardSubmit}
          className="flex items-center justify-center m-[10px] bg-cyan-500 rounded-[10px] w-[300px] h-[45px] text-gray-200 hover:bg-cyan-500 text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white disabled:bg-black disabled:bg-opacity-50 disabled:border-none"
        >
          Get reward
        </button>
      </div>
    </div>
  );
};

export default UnstakeWindow;
