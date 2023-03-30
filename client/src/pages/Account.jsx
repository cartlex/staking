import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../context";

const Account = () => {
  const { address } = useContext(AppContext);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-sky-500">
        <Navbar />
        <h1 className="text-white text-[40px] fixed top-[100px]">Account</h1>
        <div className="flex flex-col w-4/5 h-[500px] top-[200px] fixed bg-black bg-opacity-50 rounded-[10px] justify-start">
          <div className="flex flex-row justify-start">
            <h1 className="flex justify-start items-center px-[20px] text-white text-[20px] m-[20px] h-[40px] bg-black bg-opacity-30 rounded-[10px] hover:border-[1px] hover:border-cyan-400">
              Wallet address: {address}
            </h1>
            <h1 className="flex justify-start items-center px-[20px] text-white text-[20px] m-[20px] h-[40px] bg-black bg-opacity-30 rounded-[10px] hover:border-[1px] hover:border-cyan-400">
              Current network: Polygon
            </h1>
          </div>

          <h1 className="flex justify-start items-center p-[20px] w-[700px] text-white text-[20px] m-[20px] h-[40px] bg-black bg-opacity-30 rounded-[10px] hover:border-[1px] hover:border-cyan-400">
            Current balance: {address}
          </h1>
          <div className="h-[1px] w-full m-[10px] bg-white bg-opacity-50 flex items-center justify-center"></div>
        </div>
        <Link to="/staking">
          <button className="fixed left-[200px] top-[630px] flex justify-center items-center text-white bg-black hover:bg-slate-300 hover:text-black w-[150px] h-[40px] rounded-[10px]">
            Start staking {">"}
          </button>
        </Link>

        <Footer />
      </div>
    </>
  );
};

export default Account;
