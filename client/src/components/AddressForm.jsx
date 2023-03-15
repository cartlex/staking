import { parseEther } from "ethers";
import { useState } from "react";
import walletProvider from "../abi/walletProvider";

const AddressForm = ({isLoading, setIsLoading}) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const providerWithSigner = await walletProvider.getSigner();
      const tx = await providerWithSigner.sendTransaction({
        to: address,
        value: parseEther(amount),
      });
      await tx.wait();
      setAmount("");
      setAddress("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col justify-center items-center mt-[100px]"
    >
      <input
        onChange={(e) => setAddress(e.target.value)}
        required
        type="text"
        placeholder="Enter wallet address or ETH mainnet ENS domain"
        className="outline-none rounded-[10px] placeholder:text-center text-left placeholder:text-gray-500 text-zinc-700 w-[420px] h-[40px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px] pl-[10px]"
      />
      <input
        onChange={(e) => setAmount(e.target.value)}
        required
        type="number"
        step={0.0001}
        min={0}
        placeholder="Amount of ETH"
        className="outline-none rounded-[10px] placeholder:text-center text-left placeholder:text-gray-500 text-zinc-700 w-[420px] h-[40px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px] pl-[10px]"
      />
      <button className="bg-cyan-600 rounded-[10px] w-[150px] h-[30px] text-gray-300 hover:bg-cyan-500 mt-[20px] text-[14px]">
        Send Transaction
      </button>
    </form>
  );
};

export default AddressForm;
