import { useContext } from "react";
import { AppContext } from "../../context";

const WithdrawButton = ({ setIsLoading }) => {
  const { setAmount, setAddress, address, amount, setModal } =
    useContext(AppContext);

  const handleModalClick = () => {
    setModal(true);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleModalClick}
        className="flex items-center justify-center bg-cyan-600 rounded-[10px] w-[150px] h-[30px] text-gray-200 hover:bg-cyan-500 mt-[20px] text-[14px] hover:border-[1px] hover:border-cyan-400 hover:text-white"
      >
        Withdraw tokens
      </button>
    </div>
  );
};

export default WithdrawButton;
