import Footer from "../components/Footer";
import GetReward from "../components/GetReward/GetReward";
import Mint from "../components/Mint";
import Navbar from "../components/Navbar";
import Stake from "../components/Stake/Stake";
import Withdraw from "../components/Withdraw/Withdraw";
const StakingPage = () => {

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-sky-500">
      <Navbar />
      <h1 className="font-medium flex justify-center text-[40px] text-slate-600 font-mono fixed top-[175px]">
        Staking platform
      </h1>
      <Stake />
      <GetReward />
      <Withdraw />
      <Mint />

      <Footer /> 
    </div>
  );
};

export default StakingPage;
