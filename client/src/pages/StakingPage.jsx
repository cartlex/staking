import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Stake from "../components/Stake/Stake";
const StakingPage = () => {

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-sky-500 font-oswald"
    >
      <Navbar />
      <h1 className="flex justify-center fixed top-[100px] text-[40px] text-slate-600">
        Staking platform
      </h1>
      <Stake />
      <Footer />
    </div>
  );
};

export default StakingPage;
