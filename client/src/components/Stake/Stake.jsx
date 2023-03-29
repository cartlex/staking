import { useContext, useState } from "react";
import { AppContext } from "../../context";

const Stake = () => {
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [balance, setBalance] = useState(10);

  const handleFormSubmit = (e) => {
    e.preventDefault;
  };
  return (
    <div className="flex flex-col justify-between items-center bg-black bg-opacity-40 w-[500px] h-[400px] rounded-[10px] relative ">
      <div className="flex justify-between items-center mt-[20px]">
        <h1 className="flex items-center justify-center m-[10px] text-zinc-300 bg-slate-700 bg-opacity-30 w-full text-center rounded-[10px] h-[40px]">
          Your current balance: {balance}
        </h1>
        <h1 className="flex items-center justify-center m-[10px] text-zinc-300 bg-slate-700 bg-opacity-30 w-full text-center rounded-[10px] h-[40px]">
          Your current balance: {balance}
        </h1>
      </div>
      <div className="flex items-center flex-col justify-center">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="stake"></label>
          <input
            required
            type="number"
            min={1}
            step={1}
            id="stake"
            className="w-[300px] text-center rounded-[10px] h-[40px] bg-slate-700 bg-opacity-30  outline-none m-[10px] text-zinc-300 hover:border-[1px] hover:border-blue-300 hover:placeholder:text-slate-200"
            placeholder="Amount to stake"
          />
          <button className="flex items-center justify-center m-[10px] bg-cyan-600 rounded-[10px] w-[300px] h-[45px] text-gray-200 hover:bg-cyan-500 text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white">
            Stake
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stake;
