import { useContext, useState } from "react";
import Footer from "../components/Footer";
import GetReward from "../components/GetReward/GetReward";
import Logo from "../components/Logo";
import Mint from "../components/Mint";
import Navbar from "../components/Navbar";
import Stake from "../components/Stake/Stake";
import Withdraw from "../components/Withdraw/Withdraw";
const StakingPage = () => {

  return (
    <div className="h-screen bg-gradient-to-br from-teal-300 to-sky-500">
      <Navbar />
      <Logo />
      <h1 className="font-medium flex items-center justify-center text-[40px] text-slate-600 font-mono">
        Staking platform
      </h1>
      <Stake />
      <Mint />

      {/* <Withdraw /> */}
      {/* <GetReward />
      <Footer /> */}
    </div>
  );
};

export default StakingPage;
