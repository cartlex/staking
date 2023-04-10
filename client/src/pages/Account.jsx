import { formatEther } from "ethers";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultProvider from "../abi/defaultProvider";
import walletProvider from "../abi/walletProvider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../context";
import { ethers } from "ethers";

const Account = () => {
  const { address, network } = useContext(AppContext);
  const [balance, setBalance] = useState();
console.log(balance);
    const getBalance = async () => {
      const walletBalance = await walletProvider.getBalance(address);
      // console.log(walletBalance);
      return Number(formatEther(walletBalance)).toFixed(4);
    };

//   useEffect(() => {
//     async () => {
//       try {
//         // console.log(await walletProvider.getBalance(address))
//         const walletBalance = await defaultProvider.getBalance(address);
//         return Number(formatEther(walletBalance)).toFixed(4);

//         // return walletBalance
//         // getBalance();
//         // setBalance(Number(formatEther(walletBalance)).toFixed(4));
//         console.log(bal);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//   }, [address, balance]);

    useEffect(() => {
      (async () => {
        try {
          // setBalance(Number(formatEther(walletBalance)).toFixed(4));
          const bal = await getBalance();
          setBalance(bal);
          address && bal
        } catch (error) {
          console.error(error);
        }
      })();
    }, [address]);
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-sky-500 font-oswald">
        <Navbar />
        <h1 className="text-white text-[40px] fixed top-[100px]">Account</h1>
        <div className="flex flex-col w-4/5 h-[500px] top-[175px] fixed bg-black bg-opacity-50 rounded-[10px] justify-start">
          <div className="flex flex-row p-[20px]  text-white text-[20px] m-[20px] h-[40px rounded-[10px] border-[1px]">
            <h1 className="flex justify-center items-center w-[200px] text-zinc-300 hover:text-white">
              Current network:
            </h1>
            <div className="flex justify-start items-center p-[10px] w-[500px] text-zinc-300 hover:text-white text-[20px] h-[40px] bg-black bg-opacity-30 rounded-[10px] ">
              {network.chainName}
            </div>
          </div>
          <div className="flex flex-row p-[20px]  text-white text-[20px] m-[20px] h-[40px rounded-[10px] border-[1px]">
            <h1 className="flex justify-center items-center w-[200px] text-zinc-300 hover:text-white">
              Wallet address:
            </h1>
            <div className="flex justify-start items-center p-[10px] w-[500px] text-zinc-300 hover:text-white text-[20px] h-[40px] bg-black bg-opacity-30 rounded-[10px] ">
              {address}
            </div>
          </div>
          <div className="flex flex-row p-[20px]  text-white text-[20px] m-[20px] h-[40px rounded-[10px] border-[1px]">
            <h1 className="flex justify-center items-center w-[200px] text-zinc-300 hover:text-white">
              Current balance:
            </h1>
            <div className="flex justify-start items-center p-[10px] w-[300px] text-zinc-300 hover:text-white text-[20px] h-[40px] bg-black bg-opacity-30 rounded-[10px]">
              {balance}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-[1px] w-[1100px]  bg-white bg-opacity-50 flex items-center justify-center"></div>
          </div>
        </div>
        <Link to="/staking">
          <button className="fixed left-[200px] top-[600px] flex justify-center items-center text-zinc-300 hover:text-white bg-cyan-600 hover:bg-cyan-500 w-[150px] h-[40px] rounded-[10px]">
            Start staking {">"}
          </button>
        </Link>

        <Footer />
      </div>
    </>
  );
};

export default Account;
