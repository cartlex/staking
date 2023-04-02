import { useContext } from "react";
import { AppContext } from "../../context";
import Loader from "../UI/Loader";

const WithdrawWindow = ({
  handleFormSubmit,
  setAmountToWithdraw,
  amountToWithdraw,
}) => {
  const { isLoading, setIsLoading } = useContext(AppContext);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
      <div className="flex justify-between items-center mt-[20px]"></div>
      <div className="flex items-center flex-col justify-center">
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="withdraw"></label>
            <input
              onChange={(e) => setAmountToWithdraw(e.target.value)}
              required
              value={amountToWithdraw}
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
        )}
      </div>
    </div>
  );
};

export default WithdrawWindow;
