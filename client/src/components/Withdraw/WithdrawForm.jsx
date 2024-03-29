import { useContext } from "react";
import { AppContext } from "../../context";

const WithdrawForm = ({ setIsLoading, setModal }) => {
  const { address, amount, setAmount, setAddress } = useContext(AppContext);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
    //   setIsLoading(true);
    //   const providerWithSigner = await walletProvider.getSigner();
    //   const tx = await providerWithSigner.sendTransaction({
    //     to: address,
    //     value: parseEther(amount),
    //   });
    //   await tx.wait();
      setAmount("");
      setAddress("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setModal(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col justify-center items-center"
    >
      <input
        onChange={(e) => setAddress(e.target.value)}
        required
        type="text"
        placeholder="Amount of tokens to withdraw"
        className="outline-none rounded-[10px] placeholder:text-center text-left placeholder:text-gray-500 text-zinc-700 w-[420px] h-[40px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px] pl-[10px]"
      />
     
      <button className="bg-cyan-600 rounded-[10px] w-[150px] h-[30px] text-gray-200 hover:bg-cyan-500 mt-[20px] text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white">
        Withdraw
      </button>
    </form>
  );
};

export default WithdrawForm;
