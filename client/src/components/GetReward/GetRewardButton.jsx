import { useContext } from "react";
import { AppContext } from "../../context";

const GetRewardButton = ({ setIsLoading }) => {
  const {setAmount, setAddress, address, amount } = useContext(AppContext);

    const handleGetRewardClick = async (event) => {
        event.preventDefault();
        try {
          setIsLoading(true);
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
        }
      };
    return (
      <div className="flex justify-center items-center">
        <button onClick={handleGetRewardClick} className="flex items-center justify-center bg-cyan-600 rounded-[10px] w-[150px] h-[30px] text-gray-200 hover:bg-cyan-500 mt-[20px] text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white">
          Get Reward
        </button>
      </div>
    );
  };
  
  export default GetRewardButton;
  