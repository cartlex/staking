import { formatEther } from "ethers";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import walletProvider from "../abi/walletProvider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../context";

const Account = () => {
  const { address, balance, setBalance, network, setNetwork } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const balance = await walletProvider.getBalance(address);
      setBalance(Number(formatEther(balance)).toFixed(2));
    })();
  }, [balance, address]);


  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-sky-500 font-oswald">
        <Navbar />
        <h1 className="text-white text-[40px] fixed top-[100px]">Account</h1>
        <div className="flex flex-col w-4/5 h-[500px] top-[175px] fixed bg-black bg-opacity-50 rounded-[10px] justify-start">
          <div className="flex flex-row p-[20px]  text-white text-[20px] m-[20px] h-[40px rounded-[10px] border-[1px]">
            <h1 className="flex justify-center items-center w-[200px] text-zinc-300 hover:text-white">Current network:</h1>
            <div className="flex justify-start items-center p-[10px] w-[500px] text-zinc-300 hover:text-white text-[20px] h-[40px] bg-black bg-opacity-30 rounded-[10px] ">
            {network.chainName}
            </div>
          </div>
          <div className="flex flex-row p-[20px]  text-white text-[20px] m-[20px] h-[40px rounded-[10px] border-[1px]">
            <h1 className="flex justify-center items-center w-[200px] text-zinc-300 hover:text-white">Wallet address:</h1>
            <div className="flex justify-start items-center p-[10px] w-[500px] text-zinc-300 hover:text-white text-[20px] h-[40px] bg-black bg-opacity-30 rounded-[10px] ">
              {address}
            </div>
          </div>
          <div className="flex flex-row p-[20px]  text-white text-[20px] m-[20px] h-[40px rounded-[10px] border-[1px]">
            <h1 className="flex justify-center items-center w-[200px] text-zinc-300 hover:text-white">Current balance:</h1>
            <div className="flex justify-start items-center p-[10px] w-[300px] text-zinc-300 hover:text-white text-[20px] h-[40px] bg-black bg-opacity-30 rounded-[10px]">
              {balance}
            </div>
          </div>
          <div className="flex justify-center">
          <div className="h-[1px] w-[1100px]  bg-white bg-opacity-50 flex items-center justify-center"></div>

          </div>
        </div>
        <Link to="/staking">
          <button className="fixed left-[200px] top-[600px] flex justify-center items-center text-white bg-black hover:bg-slate-300 hover:text-black w-[150px] h-[40px] rounded-[10px]">
            Start staking {">"}
          </button>
        </Link>

        <Footer />
      </div>
    </>
  );
};

export default Account;
