import { useContext } from "react";
import Footer from "../components/Footer";
import GetReward from "../components/GetReward/GetReward";
import Mint from "../components/Mint";
import Navbar from "../components/Navbar";
import Stake from "../components/Stake/Stake";
import Withdraw from "../components/Withdraw/Withdraw";
import { AppContext } from "../context";
const StakingPage = () => {
  const { address, setAddress } = useContext(AppContext);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-sky-500">
      <Navbar />
      <h1 className="font-medium flex justify-center fixed top-[100px] text-[40px] text-slate-600 font-mono">
        Staking platform
      </h1>
          {/* <GetReward />
          <Withdraw />
          <Mint /> */}
          

       
        <Stake/>
        {/* {!address && <button className="flex justify-center items-center text-white bg-black hover:bg-slate-300 hover:text-black w-[150px] h-[40px] rounded-[10px]">
            Connect {'>'}
          </button>} */}

      <Footer />
    </div>
  );
};

export default StakingPage;
